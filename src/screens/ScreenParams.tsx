import { NewGroceryListScreenProps } from "./NewGroceryListScreen";
import { GroceryListProps } from "./groceryList/GroceryList";

export type ScreenParams = {
  Home: undefined;
  GroceryLists: undefined;
  GroceryList: GroceryListProps;
  RecipeList: undefined;
  GroceryItemList: undefined;
  NewGroceryListScreen: NewGroceryListScreenProps;
};
