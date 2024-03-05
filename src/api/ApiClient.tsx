import { API_URL } from '@env';
import i18next from 'i18next';
import RNUserIdentity, { ICLOUD_ACCESS_ERROR } from 'react-native-user-identity';

type HttpMethod = "all" | "get" | "post" | "put" | "delete" | "patch" | "options" | "head";

class ApiClient {
  private userId!: string;
  private locale!: string;

  async initialize() {
    this.userId = 'test';
    this.locale = i18next.language.split('-')[0];
    return;
    try {
      const result = await RNUserIdentity.getUserId({})
      if (result === null) {
        throw new Error('User canceled UI flow')
      }
      this.userId = result as string;
    } catch (error) {
      if (error === ICLOUD_ACCESS_ERROR) {
        throw new Error('Please set up an iCloud account in settings')
      }
    }
    console.log(`Api client initialization successful! User id: ${this.userId}`);
  }

  getUser() {
    const path = `user/${this.userId}`;
    return this.fetchWrapper('get', path);
  }

  getGroceryLists() {
    const path = `groceryList?userId=${this.userId}`;
    return this.fetchWrapper('get', path);
  }

  createGroceryList(name: string) {
    const path = `groceryList`;
    return this.fetchWrapper('put', path, { name, owner: this.userId });
  }

  deleteGroceryList(id: number) {
    const path = `groceryList/${id}`;
    return this.fetchWrapper('delete', path);
  }

  getGroceryListItems(id: number) {
    const path = `groceryList/${id}/item?locale=${this.locale}`;
    return this.fetchWrapper('get', path);
  }

  updateGroceryListItemBoughtStatus(listId: number, itemId: number, bought: boolean) {
    const path = `groceryList/${listId}/item/${itemId}`;
    return this.fetchWrapper('patch', path, { bought });
  }

  deleteGroceryListItem(listId: number, itemId: number) {
    const path = `groceryList/${listId}/item/${itemId}`;
    return this.fetchWrapper('delete', path);
  }

  getUnits() {
    const path = `units?locale=${this.locale}`;
    return this.fetchWrapper('get', path);
  }

  getGroceryItems() {
    const path = `groceryItem?locale=${this.locale}`;
    return this.fetchWrapper('get', path);
  }

  addItemToGroceryList(listId: number, itemId: number, unitsId: number, amount: number) {
    const path = `groceryList/${listId}/item?locale=${this.locale}`;
    return this.fetchWrapper('put', path, {
      grocery_list_id: listId,
      grocery_item_id: itemId,
      amount: amount,
      amount_unit_id: unitsId,
      bought: false
    })
  }

  private async fetchWrapper(method: HttpMethod, path: string, body?: any) {
    const url = `http://${API_URL}/${path}`;
    try {
      const result = await fetch(url, { method, body: JSON.stringify(body), headers: { 'Content-Type': 'application/json' } });
      console.log(`Request ${method.toUpperCase()} ${body ? `with body: ${JSON.stringify(body)}` : ''}: ${url} returned ${result.status}`);
      return result;
    }
    catch (err) {
      console.log(`Request ${method.toUpperCase()}: ${url}  failed with error: ${err}`);
    }
  }
}

const apiClient = new ApiClient()
export { apiClient };

