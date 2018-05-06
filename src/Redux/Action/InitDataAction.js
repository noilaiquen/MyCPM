import FetchAllLocalDataApi from '../../Api/LocalData';
import { setInitAppDataFlat } from '../../Storage/AsyncStorage/App';

import ProvinceServices from '../../Storage/Realm/ProvinceServices';
import DistrictServices from '../../Storage/Realm/DistrictServices';
import WardServices from '../../Storage/Realm/WardServices';

const storeInitDataStart = message => ({
   type: 'STORE_INIT_DATA_START',
   message
});

const storeInitDataSuccess = message => ({
   type: 'STORE_INIT_DATA_SUCCESS',
   message
});

const storeInitDataError = message => ({
   type: 'STORE_INIT_DATA_ERROR',
   message
});

const storeInitData = navigationToLogin => {
   return (
      dispatch => {
         dispatch(storeInitDataStart('Caching data...'));

         FetchAllLocalDataApi().then(responseAPI => {
            const { provinces, districts, wards } = responseAPI;
            Promise.all([
               ProvinceServices.insertAll(provinces),
               DistrictServices.insertAll(districts),
               WardServices.insertAll(wards)
            ]).then(() => {
               setInitAppDataFlat(true).then(() => {
                  dispatch(storeInitDataSuccess('Cached data success!'));
                  setTimeout(() => navigationToLogin(), 1500);
               })
            }).catch(() => {
               dispatch(storeInitDataError('Cached data error!'));
            });
         }).catch(e => {
            throw new Error(e);
         });
      }
   );
};

export default storeInitData;

