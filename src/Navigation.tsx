import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Home } from "./screens/home/Home";
import { GroceryList } from "./screens/groceryList/GroceryList";
import { GroceryLists } from "./screens/groceryLists/GroceryLists";
import { GroceryItemList } from "./screens/GroceryItemList";
import { useEffect } from "react";
import { apiClient } from "./api/ApiClient";
import { RecipeList } from "./screens/RecipeList";
import { headerColor } from "./Styles";
import { RootStackParamList } from "./screens/rootStackParamList";

const Stack = createNativeStackNavigator<RootStackParamList>();
export function Navigation() {

  useEffect(() => {
    apiClient.initialize().catch((err) => {
      console.log(`Api client initialization failed! Reason: ${err}`);
    });
  })


  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="Home">
        <Stack.Screen name="Home" component={Home}
          options={{
            title: 'Yet another grocery list app',
            headerStyle: {
              backgroundColor: headerColor,
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
            headerShown: true,
          }} />
        <Stack.Screen name="GroceryLists" component={GroceryLists}
          options={{
            title: 'Yet another grocery list app',
            headerStyle: {
              backgroundColor: headerColor,
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
              backgroundColor: headerColor,
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
