import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useTranslation } from "react-i18next";
import { View, Button, Pressable, Text, SafeAreaView, ImageBackground, Touchable, TouchableOpacity, Image, StyleSheet, GestureResponderEvent } from "react-native";
import { homeStyle } from "../../Styles";
import { HomeButton } from "./components/HomeButton";

type Params = {
  Home: undefined;
  RecipeList: undefined;
  GroceryLists: undefined;
  GroceryItemList: undefined;
};

type Props = { navigation: NativeStackNavigationProp<Params> };

export function Home({ navigation }: Props) {
  const { t } = useTranslation();
  return <SafeAreaView style={homeStyle.container} >
    <HomeButton
      text={t('buttonGroceryLists')}
      image="https://t4.ftcdn.net/jpg/01/90/47/95/360_F_190479583_4MceLszZ13jNEIHiD9iySCE2X4h9WpvR.jpg"
      onPress={() => navigation.navigate('GroceryLists')} />
    <HomeButton
      text={t('buttonRecipeList')}
      image="https://img.freepik.com/premium-photo/blank-recipe-book-your-text-rolling-pin-molds-eggs-dough-sugar-flat-lay-view-copy-space-baking-ingredients-kitchen-utensils-gray-background-cookies-holiday_145193-2157.jpg"
      onPress={() => navigation.navigate('RecipeList')} />
    <HomeButton
      text={t('buttonGroceryItemList')}
      image="https://static7.depositphotos.com/1012760/787/i/450/depositphotos_7871447-stock-photo-shopping-spree.jpg"
      onPress={() => navigation.navigate('GroceryItemList')} />
  </SafeAreaView >
}
