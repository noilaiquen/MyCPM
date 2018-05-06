import provinces from './province.json';
import districts from './district.json';
import wards from './ward.json';

export const locationsFinder = (unit = 'province', parentUnitId = 0) => {
   switch (unit) {
      case 'district': {
         if (parentUnitId == 0) {
            return [];
         }
         return districts.filter(district => district.province_id == parentUnitId);
      }
      case 'ward': {
         if (parentUnitId == 0) {
            return [];
         }
         return wards.filter(ward => ward.district_id == parentUnitId);
      }
      default:
         return provinces;
   }
};

export const locationsFindItem = (unit, unitId) => {
   switch (unit) {
      case 'district':
         return districts.filter(district => district.district_id == unitId);
      case 'ward':
         return wards.filter(ward => ward.ward_id == unitId);
      default:
         return provinces.filter(province => province.province_id == unitId);
   }
};

