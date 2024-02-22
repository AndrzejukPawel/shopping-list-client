import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { t } from "i18next";
import { Component, ReactNode } from "react";
import { View, Button } from "react-native";

type GroceryItemListProps = {
  GroceryItemList: undefined;
};

export class GroceryItemList extends Component<NativeStackScreenProps<GroceryItemListProps, "GroceryItemList">>{
  constructor(props: NativeStackScreenProps<GroceryItemListProps, "GroceryItemList">) {
    super(props);
  }
  render(): ReactNode {
    return <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button title={t('buttonGroceryItemList')} onPress={() => this.props.navigation.goBack()}></Button>
    </View>
  }
}


