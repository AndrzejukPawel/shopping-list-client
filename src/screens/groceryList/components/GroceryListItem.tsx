import React, { useState } from "react";
import { GestureResponderEvent, Text, TouchableOpacity, View } from "react-native";
import { groceryListItemStyle } from "../../../Styles";
import { useTranslation } from "react-i18next";
import { GroceryListItemModel } from "../../../api/models/groceryListItem";
import { apiClient } from "../../../api/ApiClient";

export function GroceryListItem({ listId, initialGroceryItem, onPressDelete }: { listId: number, initialGroceryItem: GroceryListItemModel, onPressDelete: ((event: GestureResponderEvent) => void) }) {

  const [groceryItem, setGroceryItem] = useState<GroceryListItemModel>(initialGroceryItem);

  const { t } = useTranslation();
  return <View style={!groceryItem?.bought ? groceryListItemStyle.background : groceryListItemStyle.boughtBackground}>
    <View >
      <Text style={groceryListItemStyle.itemName}>{groceryItem?.name}</Text>
      <View style={{ flexDirection: 'row' }}>
        <Text style={groceryListItemStyle.itemDateLabel}>{`${t('amount')}:`}</Text>
        <Text style={groceryListItemStyle.itemDateLabel}>{`${groceryItem?.amount} ${groceryItem?.short_translation}`}</Text>
        <View style={[{ flexDirection: 'row' }]}>
          <TouchableOpacity style={groceryListItemStyle.itemButton} onPress={onPressDelete}>
            <Text style={groceryListItemStyle.itemButtonText}>{t('deleteButton')}</Text>
          </TouchableOpacity >
          {
            !groceryItem ? <></> : groceryItem.bought ?
              <TouchableOpacity style={groceryListItemStyle.itemButton} onPress={async () => {
                const response = await apiClient.updateGroceryListItemBoughtStatus(listId, groceryItem.id, false);
                if (response?.ok) {
                  groceryItem.bought = !groceryItem.bought;
                  setGroceryItem({ ...groceryItem });
                  console.log(JSON.stringify(groceryItem));
                }
              }}>
                <Text style={groceryListItemStyle.itemButtonText}>{t('markItemNotBought')}</Text>
              </TouchableOpacity >
              :
              <TouchableOpacity style={groceryListItemStyle.itemButton} onPress={async () => {
                const response = await apiClient.updateGroceryListItemBoughtStatus(listId, groceryItem.id, true);
                if (response?.ok) {
                  groceryItem.bought = !groceryItem.bought;
                  setGroceryItem({ ...groceryItem });
                  console.log(JSON.stringify(groceryItem));
                }
              }}>
                <Text style={groceryListItemStyle.itemButtonText}>{t('markItemBought')}</Text>
              </TouchableOpacity >
          }
          <View />
        </View >
      </View>
    </View>
  </View>

  /*
      <TouchableOpacity style={groceryLists.touchable} onPress={onPress}>
          <View style={general.rowContainer}>
              <View style={{ flex: 1 }} >
                  <Text style={groceryLists.itemName}>{groceryList.name}</Text>
                  <View style={general.rowContainer}>
                      <Text style={groceryLists.itemDateLabel}>{t('createdAt')}</Text>
                      <Text style={groceryLists.itemDate}>{createdAtTime}</Text>
                  </View>
                  <View style={general.rowContainer}>
                      <Text style={groceryLists.itemDateLabel}>{t('modifiedAt')}</Text>
                      <Text style={groceryLists.itemDate}>{modifiedAtTime}</Text>
                  </View>
              </View>
          </View >
      </TouchableOpacity >
      */
}
