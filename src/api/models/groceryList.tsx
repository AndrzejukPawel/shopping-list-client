export interface GroceryListModel {
  id: number;
  name: string;
  updated_at: string;
  created_at: string;
  bought?: number;
  not_bought?: number;
}
