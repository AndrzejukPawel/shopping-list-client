import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Component, ReactNode, useEffect, useLayoutEffect, useState } from "react";
import { View, Button, FlatList, Alert, TouchableOpacity, TextInput, AnimatableStringValue, Text } from "react-native";
import { apiClient } from "../../api/ApiClient";
import { GroceryListModel } from "../../api/models/groceryList";
import { GroceryListsItem } from "./components/GroceryListsItem";
import { backgroundColor, buttonStyle, groceryListsStyle, textStyle } from "../../Styles";
import { alertWrapper } from "../../alerts";
import { ScreenParams } from "../ScreenParams";
import i18n from "../../i18n.config";
import { SideMenu } from "../../components/SideMenu";
import { Icon } from "../../components/Icon";
import { Overlay } from "../../components/Overlay";
import { PleaseWaitOverlay } from "../../components/PleaseWaitOverlay";

const { t } = i18n;

interface GroceryListsState {
  groceryList: GroceryListModel[];
  rightSideMenuOpen: boolean;
  newListName: string;
  waiting: boolean;
}

export class GroceryLists extends Component<NativeStackScreenProps<ScreenParams, "GroceryLists">, GroceryListsState>{

  constructor(props: NativeStackScreenProps<ScreenParams, "GroceryLists">) {
    super(props);
    this.state = { ...this.state, waiting: true };
    this.fetchGroceryLists().then(() => {
      this.setState({ waiting: false });
    });
    this.updateHeaderRight();
  }

  private async fetchGroceryLists() {
    const response = await apiClient.getGroceryLists();
    this.setState({ groceryList: await response?.json() })
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
            size={textStyle.header.fontSize * 1.25} />
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
          groceryList={info.item}
          onPressView={() => {
            console.log(`View item: ${info.item.id}`);
            this.props.navigation.navigate('GroceryList', { listId: info.item.id });
          }}
          onPressDelete={() => {

            alertWrapper({
              message: t('areYouSureYouWantToDelete', { item: info.item.name }),
              buttons: [
                {
                  text: t('yes'), onPress: () => {
                    apiClient.deleteGroceryList(info.item.id)
                      .then((response) => {
                        if (!response?.ok) {
                          // TODO: send report
                          alertWrapper({
                            title: t('errorAlertTitle'),
                            message: response?.statusText,
                            buttons: [
                              {
                                text: t('sendReport'),
                                onPress: () => console.log('ERROR SENT REPORT'),
                                style: 'cancel',
                              },
                              { text: t('close') },
                            ]
                          });
                          return;
                        }
                        this.setState({ groceryList: state.groceryList?.filter((list) => list.id != info.item.id) });

                        alertWrapper({
                          message: t('itemSuccessfullyDeleted', { item: info.item.name }),
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
          }} />
      }}>

      </FlatList>

      <SideMenu
        toggle={this.state.rightSideMenuOpen}
        menuItems={[
          {
            text: 'Add new list', onPress: () => {
              this.props.navigation.navigate('NewGroceryListScreen');
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
