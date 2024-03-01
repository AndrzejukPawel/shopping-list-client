import { NewGroceryListScreenProps } from "./NewGroceryListScreen";
import { GroceryListProps } from "./GroceryList";
import { AddNewProdcutToGroceryListScreenProps } from "./AddNewProdcutToGroceryListScreen";

export type ScreenParams = {
  Home: undefined;
  GroceryLists: undefined;
  GroceryList: GroceryListProps;
  RecipeList: undefined;
  GroceryItemList: undefined;
  NewGroceryListScreen: NewGroceryListScreenProps;
  AddNewProdcutToGroceryListScreen: AddNewProdcutToGroceryListScreenProps
};
