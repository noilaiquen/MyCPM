import realm from './Realm/Realm';

export const findValueDB = (modelName, inputKey, keyValue, outputValue) => {
   try {
      const value = realm.objects(modelName).filtered(`${inputKey} = ${keyValue}`)[0];
      return value !== undefined ? value[`${outputValue}`] : null ;
   } catch (e) {
      throw new Error(e);
   }
}
