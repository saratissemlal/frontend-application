import AsyncStorage from '@react-native-async-storage/async-storage';

export const ClearValue = async(value) => {
  try{
      await AsyncStorage.removeItem(value)
    } catch(e) {
      console.log(e)
  }
}

export const StoreData = async (key, data) => {
    try {

      await AsyncStorage.setItem(key, data);

    } catch (error) {

      throw new Error(error);
      
    }
  };

  export const RetrieveParseData = async (key) => {
    try {
      const value = await AsyncStorage.getItem(key);
      const val = JSON.parse(value);
      return val;
    } catch (error) {
      return null;
    }
  }

  export const RetrieveData = async (key) => {
    try {
      const value = await AsyncStorage.getItem(key);
      return value;
    } catch (error) {
      return null;
    }
  };