import React, { Component } from "react";
import { Button, GestureResponderEvent, Text, TouchableOpacity, View } from "react-native";
import { GroceryListModel } from "../api/models/groceryList";
import { groceryListsStyle, homeStyle, listItemStyle, textStyle } from "../Styles";
import i18n from "../i18n.config";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { ScreenParams } from "../screens/ScreenParams";
import { apiClient } from "../api/ApiClient";
import { alertError, alertWrapper } from "../alerts";

const { t } = i18n;

interface GroceryListsItemProps {
  navigation: NavigationProp<ScreenParams, "GroceryLists", undefined>,
  groceryList: GroceryListModel,
  onDeletedCallback: () => void,
}

export class GroceryListsItem extends Component<GroceryListsItemProps, {}> {

  private formatTimestamp(dateTime: string) {
    return `${dateTime.substring(8, 10)} ${t(`shortMonth${Number.parseInt(dateTime.substring(5, 7))}`)} ${dateTime.substring(11, 13)}:${dateTime.substring(14, 16)}`
  }

  private onDelete(groceryList: GroceryListModel) {
    return alertWrapper({
      message: t('areYouSureYouWantToDelete', { item: groceryList.name }),
      buttons: [
        {
          text: t('yes'), onPress: () => {
            apiClient.deleteGroceryList(groceryList.id)
              .then((response) => {
                if (!response?.ok) {
                  alertError(response?.statusText)
                  return;
                }
                this.props.onDeletedCallback();
                alertWrapper({
                  message: t('itemSuccessfullyDeleted', { item: groceryList.name }),
                  buttons: [{ text: t('ok') }],
                  options: { cancelable: true },
                });
              });
          }
        },
        {
          text: t('no'),
          style: 'cancel',
        },
      ]
    });
  }

  render() {
    const groceryList = this.props.groceryList;
    const createdAtTime = this.formatTimestamp(groceryList.created_at);
    const modifiedAtTime = this.formatTimestamp(groceryList.updated_at);

    return <TouchableOpacity
      onPress={() => { this.props.navigation.navigate('GroceryList', { listId: groceryList.id }); }}
      onLongPress={() => { this.onDelete(groceryList) }}
    >
      <View style={listItemStyle.simple}>
        <View style={{ flexDirection: 'column' }} >
          <Text style={[textStyle.main, { color: 'black' }]}>{groceryList.name}</Text>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text style={[textStyle.small, { color: 'black' }]}>{`${t('createdAt')}: ${createdAtTime}`}</Text>
            <Text style={[textStyle.small, { color: 'black' }]}>{`${t('updatedAt')}: ${modifiedAtTime}`}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity >;
  }
}
