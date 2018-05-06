import { AsyncStorage } from 'react-native';

export const setInitAppDataFlat = async (value) => {
   await AsyncStorage.setItem('@appDataFlat', JSON.stringify({ isStored: value }));
};

export const getInitAppDataFlat = async () => {
   try {
      const appDataFlat = await AsyncStorage.getItem('@appDataFlat');
      if (appDataFlat !== null) {
         const dataParseJSON = JSON.parse(appDataFlat);
         return dataParseJSON.isStored ? true : false;
      }
      return false;
   } catch (error) {
      throw new Error(error);
   }
};

