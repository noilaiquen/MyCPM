'use strict';
import realm from './Realm';

const DistrictServices = {
   getAll: () => new Promise((resolve, reject) => {
      try {
         const districts = realm.objects('LocalDistricts');
         resolve(Array.from(districts));
      } catch (e) {
         reject(e);
      }
   }),
   insert: district => {
      try {
         realm.write(() => {
            realm.create('LocalDistricts', {
               district_id: Number(district.district_id),
               province_id: district.province_id,
               prefix: district.prefix,
               name: district.name,
               district_name: district.district_name,
               district_alias: district.district_alias,
               district_full: district.district_full
            });
         });
      } catch (e) {
         console.log(` ${e}`);
      }
   },
   insertAll: districts => new Promise((resolve, reject) => {
      try {
         districts.forEach(district => {
            DistrictServices.insert(district);
         });
         resolve({ message: 'Insert local district success' });
      } catch (e) {
         reject(e);
      }
   }),
   removeAll: () => new Promise((resolve, reject) => {
      try {
         realm.write(() => {
            const districts = realm.objects('LocalDistricts');
            realm.delete(districts);
         });
         resolve({ message: 'Remove local district success' });
      } catch (e) {
         reject(e);
      }
   })
};

export default DistrictServices;
