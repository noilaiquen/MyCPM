'use strict';
import realm from './Realm';

const StaffServices = {
   getAll: () => new Promise((resolve, reject) => {
      try {
         const staffs = realm.objects('Staff');
         resolve(Array.from(staffs));
      } catch (e) {
         reject(e);
      }
   }),
   getStaffs: (from, to) => new Promise((resolve, reject) => {
      try {
         const staffs = realm.objects('Staff').slice(from, to);
         resolve(Array.from(staffs));
      } catch (e) {
         reject(e);
      }
   }),
   searchStaffs: filterText => new Promise((resolve, reject) => {
      try {
         const staffs = realm.objects('Staff').filtered(`fullname CONTAINS "${filterText}" OR telephone CONTAINS "${filterText}"`);
         resolve(Array.from(staffs));
      } catch (e) {
         reject(e);
      }
   }),
   insert: (Staff) => {
      try {
         realm.write(() => {
            realm.create('Staff', {
               user_id: Number(Staff.user_id),
               usercode: Staff.usercode,
               fullname: Staff.fullname,
               username: Staff.username,
               email: Staff.email,
               telephone: Staff.telephone,
               image: Staff.image,
               front_identity_card: Staff.front_identity_card,
               back_identity_card: Staff.back_identity_card,
               portrait: Staff.portrait,
               signature: Staff.signature,
               images: Staff.images,
               active: Staff.active,
               p_identity_number: Staff.p_identity_number,
               p_identity_issue_date: Staff.p_identity_issue_date,
               p_identity_issue_place: Staff.p_identity_issue_place,
               p_tax_code: Staff.p_tax_code,
               p_insurance_num: Staff.p_insurance_num,
               p_belonging_persons: Staff.p_belonging_persons,
               p_relative_telephone: Staff.p_relative_telephone,
               p_birthday: Staff.p_birthday,
               p_place_of_birth: Staff.p_place_of_birth,
               p_nationality: Staff.p_nationality,
               p_nation: Staff.p_nation,
               p_degree: Staff.p_degree,
               p_re_address: Staff.p_re_address,
               p_re_province_id: Staff.p_re_province_id,
               p_re_district_id: Staff.p_re_district_id,
               p_re_ward_id: Staff.p_re_ward_id,
               p_so_address: Staff.p_so_address,
               p_so_province_id: Staff.p_so_province_id,
               p_so_district_id: Staff.p_so_district_id,
               p_so_ward_id: Staff.p_so_ward_id,
               p_bi_address: Staff.p_bi_address,
               p_bi_province_id: Staff.p_bi_province_id,
               p_bi_district_id: Staff.p_bi_district_id,
               p_bi_ward_id: Staff.p_bi_ward_id,
               p_protector: Staff.p_protector,
               p_bank_holder: Staff.p_bank_holder,
               p_bank_number: Staff.p_bank_number,
               p_bank_name: Staff.p_bank_name,
               area_id: Staff.area_id,
               region_id: Staff.region_id,
               province_id: Staff.province_id,
               district_id: Staff.district_id,
               ward_id: Staff.ward_id,
               address: Staff.address
            });
         });
      } catch (e) {
         console.log(` ${e}`);
      }
   },
   insertAll: (Staffs) => new Promise((resolve, reject) => {
      try {
         Staffs.forEach(Staff => {
            StaffServices.insert(Staff);
         });
         resolve({ message: 'Insert success' });
      } catch (e) {
         reject(e);
      }
   }),
   removeAll: () => new Promise((resolve, reject) => {
      try {
         realm.write(() => {
            const Staffs = realm.objects('Staff');
            realm.delete(Staffs);
         });
         resolve({ message: 'Remove success' });
      } catch (e) {
         reject(e);
      }
   })
};

export default StaffServices;
