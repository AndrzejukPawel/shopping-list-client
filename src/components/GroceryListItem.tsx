import React, { Component } from "react";
import { GestureResponderEvent, Text, TouchableOpacity, View } from "react-native";
import { listItemStyle, textStyle } from "../Styles";
import { GroceryListItemModel } from "../api/models/groceryListItem";
import { apiClient } from "../api/ApiClient";
import { alertWrapper } from "../alerts";
import i18n from "../i18n.config";
import { Icon } from "./Icon";
import { Checkbox } from "./Checkbox";

const { t } = i18n;

interface GroceryListItemProps {
  listId: number,
  initialGroceryItem: GroceryListItemModel,
  onDeleteSuccess: (() => void),
}

type GroceryListItemState = GroceryListItemModel;

export class GroceryListItem extends Component<GroceryListItemProps, GroceryListItemState> {

  constructor(props: GroceryListItemProps) {
    super(props);
    this.state = this.props.initialGroceryItem
  }

  private onDeleteItem(listId: number, item: GroceryListItemModel, onSuccessCallback: () => void) {
    alertWrapper({
      message: t('areYouSureYouWantToDelete', { item: `${item.amount} ${item.unit_short_name} ${item.name}` }),
      buttons: [
        {
          text: t('yes'),
          onPress: () => {
            apiClient.deleteGroceryListItem(listId, item.id)
              .then((response) => {
                if (response?.ok) {
                  onSuccessCallback();
                }
              });
          }
        },
        {
          text: t('no')
        }
      ]
    })
  }


  private switchItemBought(listId: number, item: GroceryListItemModel) {
    const result = apiClient.updateGroceryListItemBoughtStatus(listId, item.id, !item.bought);
    // TODO: set button to "processing..." or sth

    result
      .then((response) => {
        if (response?.ok) {
          this.setState({ ...item, bought: !item.bought })
          return;
        }
      }).catch((error) => {
        alertWrapper({ message: t('errorProcessingTryAgain'), options: { cancelable: true } });
      })
  }

  render(): React.ReactNode {
    const { listId, onDeleteSuccess } = this.props;
    const groceryItem = this.state;

    return <TouchableOpacity onPress={() => { this.switchItemBought(listId, groceryItem) }} onLongPress={() => this.onDeleteItem(listId, groceryItem, onDeleteSuccess)}>
      <View style={listItemStyle.simple}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }} >
          <Text style={[textStyle.main, { color: 'black', maxWidth: '70%' }]}>{groceryItem?.name}</Text>
          <View style={{ flex: 1 }}></View>
          <Text style={[textStyle.small, { color: 'black', marginLeft: '3%', width: '17%' }]}>{`${groceryItem?.amount} ${groceryItem?.unit_short_name}`}</Text>
          <Checkbox fontSize={28} height={'10%'} width={'10%'} value={groceryItem.bought}></Checkbox>
        </View>
      </View>
    </TouchableOpacity >
  }
}
