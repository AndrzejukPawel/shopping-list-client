import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { View, FlatList, Text, TouchableOpacity, TextInput, Image } from "react-native";
import { apiClient } from "../../api/ApiClient";
import { GroceryListModel } from "../../api/models/groceryList";
import { GroceryListItem } from "./components/GroceryListItem";
import { groceryItemSelectionStyle, groceryListItemStyle, groceryListsStyle } from "../../Styles";

import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from "../rootStackParamList";
import { GroceryListItemModel } from "../../api/models/groceryListItem";
import i18next from "i18next";

import SelectDropdown from 'react-native-select-dropdown';
import { AmountUnitTranslationModel } from "../../api/models/amountUnitTranslation";
import { GroceryItemModel } from "../../api/models/groceryItem";

export function GroceryList({ route, navigation }: NativeStackScreenProps<RootStackParamList, 'GroceryList'>) {
  const params = route.params;
  const language = i18next.language;
  console.log(language);
  console.log(JSON.stringify(params));

  const [groceryListItems, setGroceryListItems] = useState<GroceryListItemModel[]>();
  const [groceryItems, setGroceryItems] = useState<GroceryItemModel[]>();
  const [selectedGroceryItem, setSelectedGroceryItem] = useState<number>();
  const [units, setUnits] = useState<AmountUnitTranslationModel[]>();

  const fetchGroceryListItems = async () => {
    const response = await apiClient.getGroceryListItems(params.id, language.split('-')[0]);
    setGroceryListItems(await response?.json());
  }

  const fetchUnits = async () => {
    const response = await apiClient.getUnits(language);
    const units = ((await response?.json()) as AmountUnitTranslationModel[])?.sort((a, b) => {
      if (a.translation.toLowerCase() < b.translation.toLowerCase()) return -1;
      if (a.translation.toLowerCase() > b.translation.toLowerCase()) return 1;
      return 0;
    });
    setUnits(units);
  }

  const fetchGroceryItems = async () => {
    const response = await apiClient.getGroceryItems(language);
    const items = ((await response?.json()) as GroceryItemModel[])?.sort((a, b) => {
      if (a.name.toLowerCase() < b.name.toLowerCase()) return -1;
      if (a.name.toLowerCase() > b.name.toLowerCase()) return 1;
      return 0;
    });
    setGroceryItems(items);
  }

  useEffect(() => {
    fetchGroceryListItems();
    fetchUnits();
    fetchGroceryItems();
  }, []);

  const { t } = useTranslation();

  return <View style={groceryListItemStyle.container}>
    <FlatList data={groceryListItems} renderItem={(info) => {
      return <GroceryListItem
        key={info.item.id}
        listId={params.id}
        initialGroceryItem={info.item}
        onPressDelete={() => {
          apiClient.deleteGroceryListItem(params.id, info.item.id);
        }} />
    }}>

    </FlatList>
    <View style={{ flexDirection: 'row', padding: 8 }}>
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
          data={groceryItems || []}
          onSelect={(item) => console.log(item)}
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
            data={units || []}
            onSelect={(item) => console.log(item.translation)}
            defaultButtonText={t('selectUnit')}
            rowTextForSelection={(item, index) => item.translation}
            buttonTextAfterSelection={(item, index) => item.translation}
          />
          <TextInput
            style={groceryItemSelectionStyle.unitsTextInput}
            inputMode="numeric"
          />
        </View>
      </View>

      <TouchableOpacity
        style={groceryItemSelectionStyle.addButton}
        onPress={() => { console.log(`Add something`) }}>
        <Image
          resizeMethod="scale"
          resizeMode="contain"
          style={groceryItemSelectionStyle.addButtonImage}
          source={{ uri: 'https://cdn.icon-icons.com/icons2/933/PNG/512/rounded-add-button_icon-icons.com_72592.png' }}
        />
      </TouchableOpacity >
    </View>
  </View>
}
