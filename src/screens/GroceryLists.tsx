import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Component, ReactNode, useEffect, useLayoutEffect, useState } from "react";
import { View, Button, FlatList, Alert, TouchableOpacity, TextInput, AnimatableStringValue, Text } from "react-native";
import { apiClient } from "../api/ApiClient";
import { GroceryListModel } from "../api/models/groceryList";
import { GroceryListsItem } from "../components/GroceryListsItem";
import { backgroundColor, buttonStyle, groceryListsStyle, textStyle } from "../Styles";
import { alertWrapper } from "../alerts";
import { ScreenParams } from "./ScreenParams";
import i18n from "../i18n.config";
import { SideMenu } from "../components/SideMenu";
import { Icon } from "../components/Icon";
import { Overlay } from "../components/Overlay";
import { PleaseWaitOverlay } from "../components/PleaseWaitOverlay";

const { t } = i18n;

interface GroceryListsState {
  groceryList: GroceryListModel[];
  rightSideMenuOpen: boolean;
  newListName: string;
  waiting: boolean;
}

export class GroceryLists extends Component<NativeStackScreenProps<ScreenParams, "GroceryLists">, GroceryListsState>{

  private unsubscribe: () => void;

  constructor(props: NativeStackScreenProps<ScreenParams, "GroceryLists">) {
    super(props);
    this.updateGroceryLists();
    this.updateHeaderRight();
    this.unsubscribe = props.navigation.addListener('focus', () => {
      this.updateGroceryLists();
    });
  }

  componentWillUnmount(): void {
    this.unsubscribe();
  }

  private async fetchGroceryLists() {
    const response = await apiClient.getGroceryLists();
    const resp = await response?.json();
    console.log(JSON.stringify(resp));
    this.setState({ groceryList: resp })
  }

  private async updateGroceryLists() {
    this.state = { ...this.state, waiting: true };
    this.fetchGroceryLists().then(() => {
      this.setState({ waiting: false });
    });
  }

  private updateHeaderRight() {
    this.props.navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity style={{ paddingHorizontal: 8 }} onPress={() => {
          console.log(`hamburger pressed ${this.state.rightSideMenuOpen}`);
          this.setState({
            rightSideMenuOpen: !this.state.rightSideMenuOpen
          });
          this.updateHeaderRight();
        }}>
          <Icon
            text={`\uF142`}
            color={this.state?.rightSideMenuOpen ? 'gray' : 'white'}
            fontSize={textStyle.header.fontSize * 1.25} />
        </TouchableOpacity>
      ),
    })
  }

  render() {
    const { state } = this;
    if (!state) {
      return <View style={groceryListsStyle.container} />
    }

    return <View style={groceryListsStyle.container}>
      <FlatList data={state.groceryList} renderItem={(info) => {
        return <GroceryListsItem
          key={info.item.id}
          navigation={this.props.navigation}
          groceryList={info.item}
          onDeletedCallback={() => {
            this.setState({ groceryList: state.groceryList?.filter((list) => list.id != info.item.id) });
          }} />
      }}>
      </FlatList>

      <SideMenu
        toggle={this.state.rightSideMenuOpen}
        menuItems={[
          {
            text: 'Add new list', onPress: () => {
              this.props.navigation.navigate('NewGroceryListScreen', { onSuccess: () => this.updateGroceryLists() });
              this.setState({ rightSideMenuOpen: false })
            }
          },
          {
            text: 'close on press', onPress: () => {
              this.setState({ rightSideMenuOpen: false });
              this.updateHeaderRight();
            }
          }]}
        onBackgroundClick={() => {
          this.setState({ rightSideMenuOpen: false });
          this.updateHeaderRight();
        }}>
      </SideMenu>
      <PleaseWaitOverlay toggle={this.state.waiting}></PleaseWaitOverlay>
    </View>
  }
}
