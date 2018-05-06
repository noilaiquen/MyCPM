'use strict';
import realm from './Realm';

const DeviceServices = {
   getAll: () => new Promise((resolve, reject) => {
      try {
         const devices = realm.objects('Devices');
         resolve(Array.from(devices));
      } catch (e) {
         reject(e);
      }
   }),
   getDevices: (from, to) => new Promise((resolve, reject) => {
      try {
         const devices = realm.objects('Devices').slice(from, to);
         resolve(Array.from(devices));
      } catch (e) {
         reject(e);
      }
   }),
   searchDevices: filterText => new Promise((resolve, reject) => {
      try {
         const devices = realm.objects('Devices').filtered(`device_name CONTAINS "${filterText}" OR device_code = "${filterText}"`);
         resolve(Array.from(devices));
      } catch (e) {
         reject(e);
      }
   }),
   insert: (Device) => {
      try {
         realm.write(() => {
            realm.create('Devices', {
               device_id: Number(Device.device_id),
               device_code: Device.device_code,
               device_name: Device.device_name,
               device_description: Device.device_description,
               model: Device.model,
               serial: Device.serial,
               imei: Device.imei,
               ngay_mua: Device.ngay_mua,
               price: Device.price,
               guarantee: Device.guarantee,
               depreciation: Device.depreciation,
               invoice_number: Device.invoice_number,
               invoice_date: Device.invoice_date,
               manufacture: Device.manufacture,
               image: Device.image,
               qrcode: Device.qrcode,
               device_type_id: Device.device_type_id,
               brand_id: Device.brand_id,
               manufacture_id: Device.manufacture_id,
               user_id: Device.user_id,
               project_id: Device.project_id,
               office_id: Device.office_id,
               device_type: Device.device_type,
               brand: Device.brand,
               username: Device.username,
               fullname: Device.fullname,
               project_code: Device.project_code,
               project_name: Device.project_name
            });
         });
      } catch (e) {
         console.log(` ${e}`);
      }
   },
   insertAll: Devices => new Promise((resolve, reject) => {
      try {
         Devices.forEach(Device => {
            DeviceServices.insert(Device);
         });
         resolve({ message: 'Insert success' });
      } catch (e) {
         reject(e);
      }
   }),
   removeAll: () => new Promise((resolve, reject) => {
      try {
         realm.write(() => {
            const Devices = realm.objects('Devices');
            realm.delete(Devices);
         });
         resolve({ message: 'Remove success' });
      } catch (e) {
         reject(e);
      }
   })
};

export default DeviceServices;
