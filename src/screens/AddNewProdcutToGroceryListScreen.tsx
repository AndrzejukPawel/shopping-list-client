import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Component } from "react";
import { View, TouchableOpacity, TextInput, Text } from "react-native";
import { backgroundColor, buttonStyle, groceryItemSelectionStyle, primaryColor, secondaryColor, textStyle } from "../Styles";
import i18n from "../i18n.config";
import { ScreenParams } from "./ScreenParams";
import { apiClient } from "../api/ApiClient";
import { alertWrapper } from "../alerts";
import { GroceryItemModel } from "../api/models/groceryItem";
import { AmountUnitModel } from "../api/models/amountUnitTranslation";
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
  units: AmountUnitModel[] | undefined;
  pleaseWait?: boolean;
}

export class AddNewProdcutToGroceryListScreen extends Component<NativeStackScreenProps<ScreenParams, "AddNewProdcutToGroceryListScreen">, AddNewProdcutToGroceryListScreenState>{

  constructor(props: NativeStackScreenProps<ScreenParams, "AddNewProdcutToGroceryListScreen">) {
    super(props);
    this.state
    Promise.all([this.fetchGroceryItems(), this.fetchUnits()]);
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
    const units = ((await response?.json()) as AmountUnitModel[])?.sort((a, b) => {
      if (a.name.toLowerCase() < b.name.toLowerCase()) return -1;
      if (a.name.toLowerCase() > b.name.toLowerCase()) return 1;
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
            labelField={"name"}
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
              const num = Number.parseFloat(text.replaceAll(',', '.'));
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
              if (!this.state.selectedGroceryItem || this.state.selectedGroceryItem < 0) return alertWrapper({ message: t('invalidGroceryItemSelected'), options: { cancelable: true } });
              if (!this.state.selectedUnit || this.state.selectedUnit < 0) return alertWrapper({ message: t('invalidUnitSelected'), options: { cancelable: true } });
              if (!this.state.selectedAmount || this.state.selectedAmount < 0) return alertWrapper({ message: t('invalidAmount'), options: { cancelable: true } });
              this.setState({ pleaseWait: true })
              apiClient.addItemToGroceryList(this.props.route.params.listId, this.state.selectedGroceryItem, this.state.selectedUnit, this.state.selectedAmount)
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
  }
}
