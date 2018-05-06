import { AsyncStorage } from 'react-native';

export const setIncomeInfo = async (incomeInfo) => {
   await AsyncStorage.setItem('@incomeInfo', JSON.stringify(incomeInfo));
};

export const getIncomeInfo = async () => {
   try {
      const incomeInfo = await AsyncStorage.getItem('@incomeInfo');
      if (incomeInfo !== null) {
         return JSON.parse(incomeInfo);
      }
      return null;
   } catch (error) {
      throw new Error(error);
   }
};
