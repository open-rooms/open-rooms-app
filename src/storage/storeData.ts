import AsyncStorage from '@react-native-async-storage/async-storage';

export const setData = async (value: any, key: string): Promise<boolean> => {
  return new Promise(async (resolve, reject) => {
    try {
      await AsyncStorage.setItem(key, JSON.stringify(value));
      resolve(true);
    } catch {
      reject(false);
    }
  });
};

export const getData = async (key: string): Promise<string> => {
  return new Promise(async (resolve, reject) => {
    try {
      const value = await AsyncStorage.getItem(key);
      console.log('Fetched data for key:', key, 'Value:', value);
      if (value !== null) {
        resolve(JSON.parse(value));
      } else {
        reject('No value found');
      }
    } catch (e) {
      console.error('Error fetching data for key:', key, 'Error:', e);
      reject(e);
    }
  });
};

export const removeData = async (key: string): Promise<boolean> => {
  return new Promise(async (resolve, reject) => {
    try {
      await AsyncStorage.removeItem(key);
      resolve(true);
    } catch {
      reject(false);
    }
  });
};
