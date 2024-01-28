import React from "react";
import { Button, GestureResponderEvent, Text, TouchableOpacity, View } from "react-native";
import { GroceryListModel } from "../../../api/models/groceryList";
import { groceryListsStyle, homeStyle } from "../../../Styles";
import { useTranslation } from "react-i18next";

export function GroceryListsItem({ groceryList, onPressView, onPressDelete }: { groceryList: GroceryListModel, onPressView: ((event: GestureResponderEvent) => void), onPressDelete: ((event: GestureResponderEvent) => void) }) {

  const { t } = useTranslation();
  const createdAtTime = groceryList.created_at.split('.')[0].replaceAll('T', ' ');
  const modifiedAtTime = groceryList.updated_at.split('.')[0].replaceAll('T', ' ');
  return <View style={groceryListsStyle.background}>
    <View style={{ flexDirection: 'row' }}>
      <View style={{ flex: 0.8 }} >
        <Text style={groceryListsStyle.itemName}>{groceryList.name}</Text>
        <View style={{ flexDirection: 'row' }}>
          <Text style={groceryListsStyle.itemDateLabel}>{t('createdAt')}</Text>
          <Text style={groceryListsStyle.itemDate}>{createdAtTime}</Text>
        </View>
        <View style={{ flexDirection: 'row' }}>
          <Text style={groceryListsStyle.itemDateLabel}>{t('modifiedAt')}</Text>
          <Text style={groceryListsStyle.itemDate}>{modifiedAtTime}</Text>
        </View>
      </View>
      <View style={{ flexDirection: 'column', flex: 0.2 }}>
        <TouchableOpacity style={groceryListsStyle.itemButton} onPress={onPressView}>
          <Text style={groceryListsStyle.itemButtonText}>{t('viewButton')}</Text>
        </TouchableOpacity >
        <TouchableOpacity style={groceryListsStyle.itemButton} onPress={onPressDelete}>
          <Text style={groceryListsStyle.itemButtonText}>{t('deleteButton')}</Text>
        </TouchableOpacity >
        <View />
      </View >
    </View >
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
