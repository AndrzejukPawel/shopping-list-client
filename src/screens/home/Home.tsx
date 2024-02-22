
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { SafeAreaView } from "react-native";
import { homeStyle } from "../../Styles";
import { HomeMenuButton } from "./components/HomeMenuButton";
import { Component, ReactNode } from "react";
import { ScreenParams } from "../ScreenParams";
import i18n from "../../i18n.config";

const { t } = i18n;

export class Home extends Component<NativeStackScreenProps<ScreenParams, "Home">>{
  constructor(props: NativeStackScreenProps<ScreenParams, 'Home'>) {
    super(props);
  }
  render(): ReactNode {
    const { navigation } = this.props;
    return <SafeAreaView style={homeStyle.container} >
      <HomeMenuButton
        text={t('buttonGroceryLists')}
        image="https://t4.ftcdn.net/jpg/01/90/47/95/360_F_190479583_4MceLszZ13jNEIHiD9iySCE2X4h9WpvR.jpg"
        onPress={() => navigation.navigate('GroceryLists')} />
      <HomeMenuButton
        text={t('buttonRecipeList')}
        image="https://img.freepik.com/premium-photo/blank-recipe-book-your-text-rolling-pin-molds-eggs-dough-sugar-flat-lay-view-copy-space-baking-ingredients-kitchen-utensils-gray-background-cookies-holiday_145193-2157.jpg"
        onPress={() => navigation.navigate('RecipeList')} />
      <HomeMenuButton
        text={t('buttonGroceryItemList')}
        image="https://static7.depositphotos.com/1012760/787/i/450/depositphotos_7871447-stock-photo-shopping-spree.jpg"
        onPress={() => navigation.navigate('GroceryItemList')} />
    </SafeAreaView >
  }
}
