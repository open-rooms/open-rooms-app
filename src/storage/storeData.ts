import AsyncStorage from '@react-native-async-storage/async-storage';

export const setData = async (value: any, key: string): Promise<boolean> => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (error: unknown) {
    // Specify the type of error as unknown
    console.error('Error storing data for key:', key, 'Error:', error);

    if (error instanceof Error) {
      throw new Error('Could not set data: ' + error.message);
    } else {
      throw new Error('An unknown error occurred');
    }
  }
};

export const getData = async (key: string): Promise<any> => {
  try {
    const value = await AsyncStorage.getItem(key);
    console.log('Fetched data for key:', key, 'Value:', value);
    if (value !== null) {
      return JSON.parse(value);
    } else {
      return null; // Return null if no value is found
    }
  } catch (error: unknown) {
    console.error('Error fetching data for key:', key, 'Error:', error);
    throw new Error('Could not fetch data: ' + error);
  }
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
