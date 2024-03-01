
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Component } from "react";
import { View, FlatList, TouchableOpacity, Text } from "react-native";
import { apiClient } from "../api/ApiClient";
import { GroceryListItem } from "../components/GroceryListItem";
import { backgroundColor, textStyle } from "../Styles";
import { ScreenParams } from "./ScreenParams";
import { GroceryListItemModel } from "../api/models/groceryListItem";
import { Icon } from "../components/Icon";
import i18n from '../i18n.config';

const { t } = i18n;

export type GroceryListProps = {
  listId: number
}

interface GroceryListState {
  groceryListItems: GroceryListItemModel[];
}

export class GroceryList extends Component<NativeStackScreenProps<ScreenParams, "GroceryList">, GroceryListState>{

  constructor(props: NativeStackScreenProps<ScreenParams, 'GroceryList'>) {
    super(props);
    this.fetchGroceryListItems();

    this.props.navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity style={{ paddingHorizontal: 8 }} onPress={() => {
          this.props.navigation.navigate('AddNewProdcutToGroceryListScreen', {
            listId: this.props.route.params.listId,
            onSuccess: (newItem) => {
              this.setState({ groceryListItems: [...this.state.groceryListItems!, newItem] });
            }
          });
        }}>
          <Icon
            text={`\u002b`}
            color={'white'}
            fontSize={textStyle.header.fontSize * 1.5} />
        </TouchableOpacity>
      ),
    })
  }

  private async fetchGroceryListItems() {
    const response = await apiClient.getGroceryListItems(this.props.route.params.listId);
    const a = await response?.json();
    console.log(`${Date.now()} ${JSON.stringify(a)}`);
    this.setState({ groceryListItems: a });
  }

  render() {
    return <View style={{
      backgroundColor,
      flex: 1,
      flexDirection: 'column',
    }}>
      {
        !this.state ?
          <></>
          :
          !this.state.groceryListItems.length ?
            <Text style={[textStyle.main, { flex: 1, color: 'white', textAlign: 'center', textAlignVertical: 'center' }]}>{t('groceryListIsEmpty')}</Text>
            : <FlatList contentContainerStyle={{ justifyContent: 'center' }} data={this.state.groceryListItems} numColumns={1} renderItem={(info) => {
              return <GroceryListItem
                key={info.item.id}
                listId={this.props.route.params.listId}
                initialGroceryItem={info.item}
                onDeleteSuccess={() => this.setState({ groceryListItems: this.state.groceryListItems?.filter((val) => val.id !== info.item.id) })
                } />
            }}>
            </FlatList>
      }
    </View>

  }

}
