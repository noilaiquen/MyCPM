'use strict';
import realm from './Realm';

const ProvinceServices = {
   getAll: () => new Promise((resolve, reject) => {
      try {
         const provinces = realm.objects('LocalProvinces');
         resolve(Array.from(provinces));
      } catch (e) {
         reject(e);
      }
   }),
   insert: province => {
      try {
         realm.write(() => {
            realm.create('LocalProvinces', {
               province_id: Number(province.province_id),
               prefix: province.prefix,
               name: province.name,
               province_name: province.province_name,
               province_alias: province.province_alias,
               latitude: province.latitude,
               longitude: province.longitude,
               province_full: province.province_full
            });
         });
      } catch (e) {
         console.log(` ${e}`);
      }
   },
   insertAll: provinces => new Promise((resolve, reject) => {
      try {
         provinces.forEach(province => {
            ProvinceServices.insert(province);
         });
         resolve({ message: 'Insert local province success' });
      } catch (e) {
         reject(e);
      }
   }),
   removeAll: () => new Promise((resolve, reject) => {
      try {
         realm.write(() => {
            const provinces = realm.objects('LocalProvinces');
            realm.delete(provinces);
         });
         resolve({ message: 'Remove local province success' });
      } catch (e) {
         reject(e);
      }
   })
};

export default ProvinceServices;
