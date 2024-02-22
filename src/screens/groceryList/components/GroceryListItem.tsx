import React, { Component } from "react";
import { GestureResponderEvent, Text, TouchableOpacity, View } from "react-native";
import { groceryListItemStyle } from "../../../Styles";
import { GroceryListItemModel } from "../../../api/models/groceryListItem";
import { apiClient } from "../../../api/ApiClient";
import { alertWrapper } from "../../../alerts";
import i18n from "../../../i18n.config";

const { t } = i18n;

interface GroceryListItemProps {
  listId: number,
  initialGroceryItem: GroceryListItemModel,
  onDeleteSuccess: (() => void)
}

type GroceryListItemState = GroceryListItemModel;

export class GroceryListItem extends Component<GroceryListItemProps, GroceryListItemState> {

  constructor(props: GroceryListItemProps) {
    super(props);
    this.state = this.props.initialGroceryItem
  }

  private onDeleteItem(listId: number, item: GroceryListItemModel, onSuccessCallback: () => void) {
    alertWrapper({
      message: t('areYouSureYouWantToDelete', { item: `${item.amount} ${item.unit_short_translation} ${item.name}` }),
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

  private deleteButton() {
    const listId = this.props.listId;
    const groceryItem = this.state;

    return <TouchableOpacity style={groceryListItemStyle.itemButton} onPress={async () => this.switchItemBought(listId, groceryItem)}>
      <Text style={groceryListItemStyle.itemButtonText}>{groceryItem.bought ? t('markItemNotBought') : t('markItemBought')}</Text>
    </TouchableOpacity >
  }

  render(): React.ReactNode {
    const { listId, onDeleteSuccess } = this.props;
    const groceryItem = this.state;

    return <View style={!groceryItem?.bought ? groceryListItemStyle.background : groceryListItemStyle.boughtBackground}>
      <View >
        <Text style={groceryListItemStyle.itemName}>{groceryItem?.name}</Text>
        <View style={{ flexDirection: 'row' }}>
          {<Text style={groceryListItemStyle.itemDateLabel}>{`${t('amount')}:`}</Text>}
          <Text style={groceryListItemStyle.itemDateLabel}>{`${groceryItem?.amount} ${groceryItem?.unit_short_translation}`}</Text>
          <View style={[{ flexDirection: 'row' }]}>
            <TouchableOpacity style={groceryListItemStyle.itemButton} onPress={() => this.onDeleteItem(listId, groceryItem, onDeleteSuccess)}>
              <Text style={groceryListItemStyle.itemButtonText}>{t('deleteButton')}</Text>
            </TouchableOpacity >
            {this.deleteButton()}
            <View />
          </View >
        </View>
      </View>
    </View>
  }

}
