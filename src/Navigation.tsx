import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Home } from "./screens/home/Home";
import { GroceryList } from "./screens/groceryList/GroceryList";
import { GroceryLists } from "./screens/groceryLists/GroceryLists";
import { GroceryItemList } from "./screens/GroceryItemList";
import { useEffect } from "react";
import { apiClient } from "./api/ApiClient";
import { RecipeList } from "./screens/RecipeList";
import { primaryColor, textStyle } from "./Styles";
import { ScreenParams } from "./screens/ScreenParams";
import { NewGroceryListScreen } from "./screens/NewGroceryListScreen";
import { LogBox } from 'react-native';

LogBox.ignoreLogs([
  'Non-serializable values were found in the navigation state',
]);

const Stack = createNativeStackNavigator<ScreenParams>();
export function Navigation() {

  useEffect(() => {
    apiClient.initialize().catch((err) => {
      console.log(`Api client initialization failed! Reason: ${err}`);
    });
  })


  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false, animation: "none" }} initialRouteName="Home">
        <Stack.Screen name="Home" component={Home}
          options={{
            title: 'Yet another grocery list app',
            headerStyle: {
              backgroundColor: primaryColor,
            },
            headerTintColor: '#fff',
            headerTitleStyle: textStyle.header,
            headerShown: true,
          }} />
        <Stack.Screen name="GroceryLists" component={GroceryLists}
          options={{
            title: 'Yet another grocery list app',
            headerStyle: {
              backgroundColor: primaryColor,
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
            headerShown: true,
          }} />
        <Stack.Screen name="NewGroceryListScreen" component={NewGroceryListScreen}
          options={{
            title: 'Yet another grocery list app',
            headerStyle: {
              backgroundColor: primaryColor,
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
            headerShown: true,
          }} />
        <Stack.Screen name="GroceryList" component={GroceryList}
          options={{
            title: 'Yet another grocery list app',
            headerStyle: {
              backgroundColor: primaryColor,
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
            headerShown: true,
          }} />
        <Stack.Screen name="RecipeList" component={RecipeList} />
        <Stack.Screen name="GroceryItemList" component={GroceryItemList} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
