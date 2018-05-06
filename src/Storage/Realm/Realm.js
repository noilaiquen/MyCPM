'use strict';
import Realm from 'realm';

class Staff extends Realm.Object { }
Staff.schema = {
   name: 'Staff',
   primaryKey: 'user_id',
   properties: {
      user_id: { type: 'int', indexed: true },
      usercode: 'string',
      username: 'string',
      fullname: 'string',
      email: 'string',
      telephone: 'string',
      image: 'string',
      front_identity_card: 'string',
      back_identity_card: 'string',
      portrait: 'string',
      signature: 'string',
      images: 'string',
      active: 'string',
      p_identity_number: 'string',
      p_identity_issue_date: 'string',
      p_identity_issue_place: 'string',
      p_tax_code: 'string',
      p_insurance_num: 'string',
      p_belonging_persons: 'string',
      p_relative_telephone: 'string',
      p_birthday: 'string',
      p_place_of_birth: 'string',
      p_nationality: 'string',
      p_nation: 'string',
      p_degree: 'string',
      p_re_address: 'string',
      p_re_province_id: 'string',
      p_re_district_id: 'string',
      p_re_ward_id: 'string',
      p_so_address: 'string',
      p_so_province_id: 'string',
      p_so_district_id: 'string',
      p_so_ward_id: 'string',
      p_bi_address: 'string',
      p_bi_province_id: 'string',
      p_bi_district_id: 'string',
      p_bi_ward_id: 'string',
      p_protector: 'string',
      p_bank_holder: 'string',
      p_bank_number: 'string',
      p_bank_name: 'string',
      area_id: 'string',
      region_id: 'string',
      province_id: 'string',
      district_id: 'string',
      ward_id: 'string',
      address: 'string'
   }
};

class LocalProvinces extends Realm.Object { }
LocalProvinces.schema = {
   name: 'LocalProvinces',
   primaryKey: 'province_id',
   properties: {
      province_id: { type: 'int', indexed: true },
      prefix: 'string',
      name: 'string',
      province_name: 'string',
      province_alias: 'string',
      latitude: 'string',
      longitude: 'string',
      province_full: 'string'
   }
};

class LocalDistricts extends Realm.Object { }
LocalDistricts.schema = {
   name: 'LocalDistricts',
   primaryKey: 'district_id',
   properties: {
      district_id: { type: 'int', indexed: true },
      province_id: 'string',
      prefix: 'string',
      name: 'string',
      district_name: 'string',
      district_alias: 'string',
      district_full: 'string'
   }
};

class LocalWards extends Realm.Object { }
LocalWards.schema = {
   name: 'LocalWards',
   primaryKey: 'ward_id',
   properties: {
      ward_id: { type: 'int', indexed: true },
      name: 'string',
      ward_name: 'string',
      ward_full: 'string',
      district_id: 'string',
      province_id: 'string',
      latitude: 'string',
      longitude: 'string'
   }
};

class Devices extends Realm.Object { }
Devices.schema = {
   name: 'Devices',
   primaryKey: 'device_id',
   properties: {
      device_id: { type: 'int', indexed: true },
      device_code: 'string',
      device_name: 'string',
      device_description: 'string',
      model: 'string',
      serial: 'string',
      imei: 'string',
      ngay_mua: 'string',
      price: 'string',
      guarantee: 'string',
      depreciation: 'string',
      invoice_number: 'string',
      invoice_date: 'string',
      manufacture: 'string',
      image: 'string',
      qrcode: 'string',
      device_type_id: 'string',
      brand_id: 'string',
      manufacture_id: 'string',
      user_id: 'string',
      project_id: 'string',
      office_id: 'string',
      device_type: 'string',
      brand: 'string',
      username: 'string',
      fullname: 'string',
      project_code: 'string',
      project_name: 'string'
   }
};


export default new Realm({
   path: Realm.defaultPath,
   schema: [Staff, LocalProvinces, LocalDistricts, LocalWards, Devices],
   schemaVersion: 2
});
