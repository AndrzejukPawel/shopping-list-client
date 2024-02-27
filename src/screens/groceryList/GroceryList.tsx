import { Component } from "react";
import { View, FlatList, Text, TouchableOpacity, TextInput, Image } from "react-native";
import { apiClient } from "../../api/ApiClient";
import { GroceryListItem } from "./components/GroceryListItem";
import { groceryItemSelectionStyle, groceryListItemStyle } from "../../Styles";

import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ScreenParams } from "../ScreenParams";
import { GroceryListItemModel } from "../../api/models/groceryListItem";

import SelectDropdown from 'react-native-select-dropdown';
import { AmountUnitTranslationModel } from "../../api/models/amountUnitTranslation";
import { GroceryItemModel } from "../../api/models/groceryItem";
import { alertWrapper } from "../../alerts";
import { t } from "i18next";

export type GroceryListProps = {
  listId: number
}

interface GroceryListState {
  groceryListItems: GroceryListItemModel[];
  allGroceryItems: GroceryItemModel[];
  selectedGroceryItem: number;
  selectedUnit: number;
  selectedAmount: number;
  units: AmountUnitTranslationModel[];
}

export class GroceryList extends Component<NativeStackScreenProps<ScreenParams, "GroceryList">, GroceryListState>{

  constructor(props: NativeStackScreenProps<ScreenParams, 'GroceryList'>) {
    super(props);
    this.fetchGroceryListItems();
    this.fetchUnits();
    this.fetchGroceryItems();
  }

  private isNewItemValid() {
    const { state } = this;
    const { selectedGroceryItem, selectedUnit, selectedAmount } = state;
    return !!selectedGroceryItem && !!selectedUnit && !!selectedAmount;
  }

  private async fetchGroceryListItems() {
    const response = await apiClient.getGroceryListItems(this.props.route.params.listId);
    const a = await response?.json();
    console.log(`${Date.now()} ${JSON.stringify(a)}`);
    this.setState({ groceryListItems: a });
  }

  private async fetchUnits() {
    const response = await apiClient.getUnits();
    const units = ((await response?.json()) as AmountUnitTranslationModel[])?.sort((a, b) => {
      if (a.translation.toLowerCase() < b.translation.toLowerCase()) return -1;
      if (a.translation.toLowerCase() > b.translation.toLowerCase()) return 1;
      return 0;
    });
    this.setState({ units });
  }

  async fetchGroceryItems() {
    const response = await apiClient.getGroceryItems();
    const allGroceryItems = ((await response?.json()) as GroceryItemModel[])?.sort((a, b) => {
      if (a.name.toLowerCase() < b.name.toLowerCase()) return -1;
      if (a.name.toLowerCase() > b.name.toLowerCase()) return 1;
      return 0;
    });
    this.setState({ allGroceryItems });
  }

  render() {
    //const params = this.props.route.params;

    const { state } = this;

    if (!state) {
      return <View style={groceryListItemStyle.container} />
    }

    return <View style={groceryListItemStyle.container}>

      <FlatList data={state.groceryListItems} renderItem={(info) => {
        return <GroceryListItem
          key={info.item.id}
          listId={this.props.route.params.listId}
          initialGroceryItem={info.item}
          onDeleteSuccess={() => this.setState({ groceryListItems: state.groceryListItems?.filter((val) => val.id !== info.item.id) })
          } />
      }}>
      </FlatList>

      <View style={{ flexDirection: 'row', padding: 8, backgroundColor: '#bf826f' }}>
        <View style={{ flexDirection: 'column', flex: 1 }}>

          <SelectDropdown
            buttonStyle={groceryItemSelectionStyle.productsButton}
            buttonTextStyle={groceryItemSelectionStyle.productsButtonText}
            rowTextStyle={groceryItemSelectionStyle.productsRowText}
            renderDropdownIcon={isOpened => {
              return isOpened ?
                <Text style={groceryItemSelectionStyle.icon}>▲</Text>
                : <Text style={groceryItemSelectionStyle.icon}>▼</Text>
            }}
            data={state.allGroceryItems || []}
            onSelect={(item: GroceryItemModel) => {
              if (item) {
                this.setState({ selectedGroceryItem: item.id });
              }
            }}
            search
            defaultButtonText={t('selectProduct')}
            rowTextForSelection={(item, index) => item.name}
            buttonTextAfterSelection={(item, index) => item.name}
          />
          <View style={{ flexDirection: 'row', paddingTop: 4 }}>
            <SelectDropdown
              buttonStyle={groceryItemSelectionStyle.unitsButton}
              buttonTextStyle={groceryItemSelectionStyle.unitsButtonText}
              rowTextStyle={groceryItemSelectionStyle.unitsRowText}
              renderDropdownIcon={isOpened => {
                return isOpened ?
                  <Text style={groceryItemSelectionStyle.icon}>▲</Text>
                  : <Text style={groceryItemSelectionStyle.icon}>▼</Text>
              }}
              data={state.units || []}
              onSelect={(item: AmountUnitTranslationModel) => {
                console.log(`Selected unit: ${JSON.stringify(item)}`)
                if (item) {
                  this.setState({ selectedUnit: item.id });
                }
              }}
              defaultButtonText={t('selectUnit')}
              rowTextForSelection={(item, index) => item.translation}
              buttonTextAfterSelection={(item, index) => item.translation}
            />
            <TextInput
              style={groceryItemSelectionStyle.unitsTextInput}
              inputMode="numeric"
              onChangeText={(text) => {
                const num = Number.parseFloat(text);
                if (!Number.isNaN(num)) {
                  this.setState({ selectedAmount: num });
                }
              }}
            />
          </View>
        </View>

        <TouchableOpacity
          style={groceryItemSelectionStyle.addButton}
          onPress={() => {
            if (state.selectedAmount !== undefined && state.selectedAmount <= 0) {
              alertWrapper({ message: 'The amount must be higher than 0.', options: { cancelable: true } });
            }
            else if (!this.isNewItemValid()) {
              alertWrapper({ message: 'Please fill all the details for the new item first.', options: { cancelable: true } })
            }
            else if (this.isNewItemValid() && state.selectedAmount !== undefined && state.selectedAmount > 0) {
              apiClient.addItemToGroceryList(this.props.route.params.listId, state.selectedGroceryItem!, state.selectedUnit!, state.selectedAmount!)
                .then(async (response) => {
                  if (!response?.ok) {
                    alertWrapper({ message: 'Something went wrong when adding the item. Please try again.', options: { cancelable: true } });
                    return;
                  }
                  this.setState({ groceryListItems: [...state.groceryListItems!, await response.json()] });
                })
            }
          }}>
          <Image
            resizeMethod="scale"
            resizeMode="contain"
            style={[
              groceryItemSelectionStyle.addButtonImage,
              this.isNewItemValid() ?
                groceryItemSelectionStyle.addButtonImageActive :
                groceryItemSelectionStyle.addButtonImageInactive
            ]}
            source={{ uri: 'https://cdn.icon-icons.com/icons2/933/PNG/512/rounded-add-button_icon-icons.com_72592.png' }}
          />
        </TouchableOpacity >
      </View>


    </View >
  }

}
