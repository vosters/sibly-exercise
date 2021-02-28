import AsyncStorage from '@react-native-community/async-storage';
// import { ApplicationError } from '../models/Errors';

class LocalStateService {
  public async setStorage(
    key: string,
    value: string | { [key: string]: string },
  ): Promise<void> {
    try {
      await AsyncStorage.setItem(
        key,
        typeof value !== 'string' ? JSON.stringify(key) : value,
      );
    } catch (err) {
      return Promise.reject('Unable to set local state.');
    }
  }

  public async getStorage(key: string): Promise<string | null> {
    try {
      return await AsyncStorage.getItem(key);
    } catch (err) {
      return Promise.reject('Unable to get local state.');
    }
  }

  public async removeStorage(key: string): Promise<void> {
    try {
      await AsyncStorage.removeItem(key);
    } catch (err) {
      return Promise
        .reject
        // new ApplicationError('Unable to remove local state.'),
        ();
    }
  }
}

export default LocalStateService;
