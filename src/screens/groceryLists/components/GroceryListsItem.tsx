import React, { Component } from "react";
import { Button, GestureResponderEvent, Text, TouchableOpacity, View } from "react-native";
import { GroceryListModel } from "../../../api/models/groceryList";
import { groceryListsStyle, homeStyle } from "../../../Styles";
import { t } from "i18next";

interface GroceryListsItemProps {
  groceryList: GroceryListModel,
  onPressView: ((event: GestureResponderEvent) => void),
  onPressDelete: ((event: GestureResponderEvent) => void),
}

export class GroceryListsItem extends Component<GroceryListsItemProps, {}> {
  render() {
    const createdAtTime = this.props.groceryList.created_at.split('.')[0].replaceAll('T', ' ');
    const modifiedAtTime = this.props.groceryList.updated_at.split('.')[0].replaceAll('T', ' ');
    return <View style={groceryListsStyle.background}>
      <View style={{ flexDirection: 'row' }}>
        <View style={{ flex: 0.8 }} >
          <Text style={groceryListsStyle.itemName}>{this.props.groceryList.name}</Text>
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
          <TouchableOpacity style={groceryListsStyle.itemButton} onPress={this.props.onPressView}>
            <Text style={groceryListsStyle.itemButtonText}>{t('viewButton')}</Text>
          </TouchableOpacity >
          <TouchableOpacity style={groceryListsStyle.itemButton} onPress={this.props.onPressDelete}>
            <Text style={groceryListsStyle.itemButtonText}>{t('deleteButton')}</Text>
          </TouchableOpacity >
          <View />
        </View >
      </View >
    </View>
  }
}
