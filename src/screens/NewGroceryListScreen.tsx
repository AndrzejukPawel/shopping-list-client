import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Component } from "react";
import { View, TouchableOpacity, TextInput, Text } from "react-native";
import { backgroundColor, buttonStyle, textStyle } from "../Styles";
import i18n from "../i18n.config";
import { ScreenParams } from "./ScreenParams";
import { apiClient } from "../api/ApiClient";
import { alertWrapper } from "../alerts";

const { t } = i18n;

export interface NewGroceryListScreenProps {
  onSuccess: () => void;
}

interface NewGroceryListScreenState {
  newListName: string;
}

export class NewGroceryListScreen extends Component<NativeStackScreenProps<ScreenParams, "NewGroceryListScreen">, NewGroceryListScreenState>{

  render() {
    return <View style={{
      backgroundColor,
      flex: 1,
      alignContent: 'center',
      justifyContent: 'center'
    }}>
      <Text style={[textStyle.mainLarge, {
        marginHorizontal: 40,
        marginBottom: 20,
      }]}> Enter name for a new list:</Text>
      <View style={{
        marginHorizontal: 40,
        marginBottom: 20,
      }}>
        <TextInput style={[textStyle.inputText, {
          backgroundColor: 'white',
        }]}
          onChangeText={(text) => this.setState({ newListName: text })} />
      </View>
      <View style={[buttonStyle.generic, {
        margin: 40,
        flexDirection: 'row',
        flexShrink: 1,
      }]}>
        <TouchableOpacity style={{ flex: 1 }} onPress={() =>
          apiClient.addGroceryList(this.state.newListName)
            .then(() => {
              console.log("goind back");
              this.props.navigation.goBack();
              this.props.route.params.onSuccess();
            })
            .catch((err) => alertWrapper({ title: t('errorProcessingTryAgain', { err }) }))
        } >
          <Text style={textStyle.button}> Add</Text>
        </TouchableOpacity>
      </View>
    </View>;
  }
}
