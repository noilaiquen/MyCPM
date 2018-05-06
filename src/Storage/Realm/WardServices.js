'use strict';
import realm from './Realm';

const WardServices = {
   getAll: () => new Promise((resolve, reject) => {
      try {
         const wards = realm.objects('LocalWards');
         resolve(Array.from(wards));
      } catch (e) {
         reject(e);
      }
   }),
   insert: ward => {
      try {
         realm.write(() => {
            realm.create('LocalWards', {
               ward_id: Number(ward.ward_id),
               name: ward.name,
               ward_name: ward.ward_name,
               ward_full: ward.ward_full,
               district_id: ward.district_id,
               province_id: ward.province_id,
               latitude: ward.latitude,
               longitude: ward.longitude
            });
         });
      } catch (e) {
         console.log(` ${e}`);
      }
   },
   insertAll: wards => new Promise((resolve, reject) => {
      try {
         wards.forEach(ward => {
            WardServices.insert(ward);
         });
         resolve({ message: 'Insert local ward success' });
      } catch (e) {
         reject(e);
      }
   }),
   removeAll: () => new Promise((resolve, reject) => {
      try {
         realm.write(() => {
            const wards = realm.objects('LocalWards');
            realm.delete(wards);
         });
         resolve({ message: 'Remove local ward success' });
      } catch (e) {
         reject(e);
      }
   })
};

export default WardServices;
