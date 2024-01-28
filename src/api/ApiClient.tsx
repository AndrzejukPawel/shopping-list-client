import { API_URL } from '@env';
import RNUserIdentity, { ICLOUD_ACCESS_ERROR } from 'react-native-user-identity';

type HttpMethod = "all" | "get" | "post" | "put" | "delete" | "patch" | "options" | "head";

class ApiClient {
  private userId!: string;

  async initialize() {
    this.userId = 'andrzejuk94@gmail.com';
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

  getGroceryList(id: number) {
    const path = `groceryList/${id}?userId=${this.userId}`;
    return this.fetchWrapper('get', path);
  }

  deleteGroceryList(id: number) {
    const path = `groceryList/${id}`;
    return this.fetchWrapper('delete', path);
  }

  getGroceryListItems(id: number, locale: string) {
    const path = `groceryList/${id}/item?locale=${locale}`;
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

  getUnits(locale: string) {
    const path = `units?locale=${locale}`;
    return this.fetchWrapper('get', path);
  }

  getGroceryItems(locale: string) {
    const path = `groceryItems?locale=${locale}`;
    return this.fetchWrapper('get', path);
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

