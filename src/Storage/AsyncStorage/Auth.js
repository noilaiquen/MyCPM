import { AsyncStorage } from 'react-native';

export const setLocalUserLoginInfo = async (userInfo) => {
   await AsyncStorage.setItem('@userInfo', JSON.stringify(userInfo));
};

export const getLocalUserLoginInfo = async () => {
   try {
       const userInfo = await AsyncStorage.getItem('@userInfo');
       if (userInfo !== null) {
           return JSON.parse(userInfo);
       }
       return null;
   } catch (e) {
       throw new Error(e);
   }
};

export const removeLocalUserLoginInfo = async () => {
   await AsyncStorage.removeItem('@userInfo');
};
