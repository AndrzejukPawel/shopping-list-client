import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Component } from "react";
import { View, TouchableOpacity, TextInput, Text } from "react-native";
import { backgroundColor, buttonStyle, groceryItemSelectionStyle, primaryColor, secondaryColor, textStyle } from "../Styles";
import i18n from "../i18n.config";
import { ScreenParams } from "./ScreenParams";
import { apiClient } from "../api/ApiClient";
import { alertWrapper } from "../alerts";
import { GroceryItemModel } from "../api/models/groceryItem";
import { AmountUnitTranslationModel } from "../api/models/amountUnitTranslation";
import { Dropdown } from "react-native-element-dropdown";
import { GroceryListItemModel } from "../api/models/groceryListItem";
import { PleaseWaitOverlay } from "../components/PleaseWaitOverlay";

const { t } = i18n;

export interface AddNewProdcutToGroceryListScreenProps {
  listId: number;
  onSuccess: (newItem: GroceryListItemModel) => void;
}

interface AddNewProdcutToGroceryListScreenState {
  allGroceryItems: GroceryItemModel[];
  selectedGroceryItem: number;
  selectedUnit: number;
  selectedAmount: number;
  units: AmountUnitTranslationModel[] | undefined;
  pleaseWait?: boolean;
}

export class AddNewProdcutToGroceryListScreen extends Component<NativeStackScreenProps<ScreenParams, "AddNewProdcutToGroceryListScreen">, AddNewProdcutToGroceryListScreenState>{

  constructor(props: NativeStackScreenProps<ScreenParams, "AddNewProdcutToGroceryListScreen">) {
    super(props);
    this.fetchGroceryItems();
    this.fetchUnits();
  }

  private isNewItemValid() {
    const { state } = this;
    const { selectedGroceryItem, selectedUnit, selectedAmount } = state;
    return !!selectedGroceryItem && !!selectedUnit && !!selectedAmount;
  }

  private async fetchGroceryItems() {
    const response = await apiClient.getGroceryItems();
    const allGroceryItems = ((await response?.json()) as GroceryItemModel[])?.sort((a, b) => {
      if (a.name.toLowerCase() < b.name.toLowerCase()) return -1;
      if (a.name.toLowerCase() > b.name.toLowerCase()) return 1;
      return 0;
    });
    this.setState({ allGroceryItems });
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

  render() {
    return <View style={{
      backgroundColor,
      flex: 1,
      alignContent: 'center',
      justifyContent: 'center',
    }}>
      <View style={{
        paddingHorizontal: '5%'
      }}>
        <View>
          <Text style={[textStyle.main, { color: 'black' }]}>{`${t('groceryItem')}:`}</Text>
          <Dropdown
            itemTextStyle={[textStyle.small, { color: 'white' }]}
            style={{ backgroundColor: secondaryColor, paddingHorizontal: 8, borderRadius: 8 }}
            containerStyle={{ backgroundColor: secondaryColor, borderRadius: 8, borderWidth: 0 }}
            selectedTextStyle={[textStyle.small, { color: 'white' }]}
            iconColor="white"
            activeColor={primaryColor}
            search={true}
            data={this.state?.allGroceryItems || []}
            labelField={"name"}
            valueField={"id"}
            onChange={(item) => {
              this.setState({ selectedGroceryItem: item.id, selectedUnit: item.preferred_amount_unit_id });
            }}
          />
        </View>
        <View style={{ paddingTop: 20 }}>
          <Text style={[textStyle.main, { color: 'black' }]}>{`${t('unit')}:`}</Text>
          <Dropdown
            itemTextStyle={[textStyle.small, { color: 'white' }]}
            style={{ backgroundColor: secondaryColor, paddingHorizontal: 8, borderRadius: 8 }}
            containerStyle={{ backgroundColor: secondaryColor, borderRadius: 8, borderWidth: 0 }}
            selectedTextStyle={[textStyle.small, { color: 'white' }]}
            iconColor="white"
            activeColor={primaryColor}
            data={this.state?.units || []}
            labelField={"translation"}
            valueField={"id"}
            onChange={(item) => {
              this.setState({ selectedUnit: item.id });
            }}
            value={this.state?.units?.find((item) => item.id == this.state?.selectedUnit) ?? undefined}
          />
        </View>
        <View style={{ paddingTop: 20 }}>
          <Text style={[textStyle.main, { color: 'black' }]}>{`${t('amount')}:`}</Text>
          <TextInput
            style={{
              backgroundColor: '#ffffff99',
              borderRadius: 8,
              borderWidth: 1,
              borderColor: '#999',
              textAlign: 'left',
              color: 'black',
            }}
            inputMode="numeric"
            onChangeText={(text) => {
              const num = Number.parseFloat(text);
              if (!Number.isNaN(num)) {
                this.setState({ selectedAmount: num });
              }
            }}
          />
        </View>
        <View style={[buttonStyle.generic, {
          marginTop: 20,
          margin: 40,
          flexDirection: 'row',
          flexShrink: 1,
        }]}>
          <TouchableOpacity
            style={{ flex: 1 }}
            onPress={() => {
              this.setState({ pleaseWait: true })
              apiClient.addItemToGroceryList(this.props.route.params.listId, this.state.selectedGroceryItem!, this.state.selectedUnit!, this.state.selectedAmount!)
                .then(async (response) => {
                  if (!response?.ok) {
                    alertWrapper({ message: 'Something went wrong when adding the item. Please try again.', options: { cancelable: true } });
                    return;
                  }
                  this.props.route.params.onSuccess(await response.json());
                  this.setState({ pleaseWait: false })
                  this.props.navigation.goBack();
                })
            }} >
            <Text style={[textStyle.button, { textAlign: 'center' }]}>{t('add')}</Text>
          </TouchableOpacity>
        </View>
      </View>

      <PleaseWaitOverlay toggle={!!this.state?.pleaseWait} />
    </View>
    // return <View style={{
    //   backgroundColor,
    //   flex: 1,
    //   alignContent: 'center',
    //   justifyContent: 'center'
    // }}>
    //   <Dropdown
    //     itemTextStyle={{ color: "black" }}
    //     data={state.allGroceryItems || []}
    //     labelField={"name"}
    //     valueField={"id"}
    //     onChange={() => { }}
    //   >

    //   </Dropdown>
    //   <SelectDropdown
    //     buttonStyle={groceryItemSelectionStyle.productsButton}
    //     buttonTextStyle={groceryItemSelectionStyle.productsButtonText}
    //     rowTextStyle={groceryItemSelectionStyle.productsRowText}
    //     renderDropdownIcon={isOpened => {
    //       return isOpened ?
    //         <Text style={groceryItemSelectionStyle.icon}>▲</Text>
    //         : <Text style={groceryItemSelectionStyle.icon}>▼</Text>
    //     }}
    //     data={state.allGroceryItems || []}
    //     onSelect={(item: GroceryItemModel) => {
    //       if (item) {
    //         this.setState({ selectedGroceryItem: item.id });
    //       }
    //     }}
    //     search
    //     defaultButtonText={t('selectProduct')}
    //     rowTextForSelection={(item, index) => item.name}
    //     buttonTextAfterSelection={(item, index) => item.name}
    //   />
    //   <View style={{ flexDirection: 'row', paddingTop: 4 }}>
    //     <SelectDropdown
    //       buttonStyle={groceryItemSelectionStyle.unitsButton}
    //       buttonTextStyle={groceryItemSelectionStyle.unitsButtonText}
    //       rowTextStyle={groceryItemSelectionStyle.unitsRowText}
    //       renderDropdownIcon={isOpened => {
    //         return isOpened ?
    //           <Text style={groceryItemSelectionStyle.icon}>▲</Text>
    //           : <Text style={groceryItemSelectionStyle.icon}>▼</Text>
    //       }}
    //       data={state.units || []}
    //       onSelect={(item: AmountUnitTranslationModel) => {
    //         console.log(`Selected unit: ${JSON.stringify(item)}`)
    //         if (item) {
    //           this.setState({ selectedUnit: item.id });
    //         }
    //       }}
    //       defaultButtonText={t('selectUnit')}
    //       rowTextForSelection={(item, index) => item.translation}
    //       buttonTextAfterSelection={(item, index) => item.translation}
    //     />
    //     <TextInput
    //       style={groceryItemSelectionStyle.unitsTextInput}
    //       inputMode="numeric"
    //       onChangeText={(text) => {
    //         const num = Number.parseFloat(text);
    //         if (!Number.isNaN(num)) {
    //           this.setState({ selectedAmount: num });
    //         }
    //       }}
    //     />

    //     <TouchableOpacity
    //       style={groceryItemSelectionStyle.addButton}
    //       onPress={() => {
    //         if (state.selectedAmount !== undefined && state.selectedAmount <= 0) {
    //           alertWrapper({ message: 'The amount must be higher than 0.', options: { cancelable: true } });
    //         }
    //         else if (!this.isNewItemValid()) {
    //           alertWrapper({ message: 'Please fill all the details for the new item first.', options: { cancelable: true } })
    //         }
    //         else if (this.isNewItemValid() && state.selectedAmount !== undefined && state.selectedAmount > 0) {
    //           apiClient.addItemToGroceryList(this.props.route.params.listId, state.selectedGroceryItem!, state.selectedUnit!, state.selectedAmount!)
    //             .then(async (response) => {
    //               if (!response?.ok) {
    //                 alertWrapper({ message: 'Something went wrong when adding the item. Please try again.', options: { cancelable: true } });
    //                 return;
    //               }
    //               this.setState({ groceryListItems: [...state.groceryListItems!, await response.json()] });
    //             })
    //         }
    //       }}>
    //       <Image
    //         resizeMethod="scale"
    //         resizeMode="contain"
    //         style={[
    //           groceryItemSelectionStyle.addButtonImage,
    //           this.isNewItemValid() ?
    //             groceryItemSelectionStyle.addButtonImageActive :
    //             groceryItemSelectionStyle.addButtonImageInactive
    //         ]}
    //         source={{ uri: 'https://cdn.icon-icons.com/icons2/933/PNG/512/rounded-add-button_icon-icons.com_72592.png' }}
    //       />
    //     </TouchableOpacity >
    //   </View>;
  }
}
