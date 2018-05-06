import { ToastAndroid } from 'react-native';
import { FetchAllStaffApi } from '../../Api/Staff';
import StaffServices from '../../Storage/Realm/StaffService';

export const resetStatesToDefault = () => ({
   type: 'RESET_STATES_TO_DEFAULT'
});

const fecthStaffsStartAction = () => ({
   type: 'FETCH_STAFFS_START'
});

const fecthStaffsSuccessAction = () => ({
   type: 'FETCH_STAFFS_SUCCESS'
});

const fecthStaffsErrorAction = () => ({
   type: 'FETCH_STAFFS_ERROR'
});

export const fetchStaffs = userId => (
   dispatch => {
      dispatch(fecthStaffsStartAction());
      
      FetchAllStaffApi(userId).then(resJSON => {
         const { data, status } = resJSON;
         if (status === 1) {
            Promise.all([ 
               StaffServices.removeAll(),
               StaffServices.insertAll(data)
            ]).then(() => {
               dispatch(fecthStaffsSuccessAction());
            }).catch(() => {
               dispatch(fecthStaffsErrorAction());
               ToastAndroid.show('Cache error!', ToastAndroid.LONG);
            });
         } else {
            dispatch(fecthStaffsErrorAction());
            ToastAndroid.show('API response error code!', ToastAndroid.LONG);
         }
      }).catch(() => {
         dispatch(fecthStaffsErrorAction());
         ToastAndroid.show('API Error!', ToastAndroid.LONG);
      });
   }
);

const fecthStaffsLocalStartAction = () => ({
   type: 'FETCH_STAFFS_LOCAL_START'
});

const fecthStaffsLocalSuccessAction = staffs => ({
   type: 'FETCH_STAFFS_LOCAL_SUCCESS',
   staffs
});

const fecthStaffsLocalErrorAction = () => ({
   type: 'FETCH_STAFFS_LOCAL_ERROR'
});

export const getStaffsLocal = (from, to) => (
   dispatch => {
      dispatch(fecthStaffsLocalStartAction());
      StaffServices.getStaffs(from, to).then(staffs => {
         //delay 1s for loading
         setTimeout(() => {
            dispatch(fecthStaffsLocalSuccessAction(staffs));
         }, 1000);
      }).catch(() => {
         dispatch(fecthStaffsLocalErrorAction());
         ToastAndroid.show('Load staffs cache error!', ToastAndroid.LONG);
      });
   }
);

const searchStaffsAction = staffs => ({
   type: 'SEARCH_STAFFS',
   staffs
});

export const endSearchStaffs = () => ({
   type: 'END_SEARCH_STAFFS'
});

export const searchStaffs = filterText => (
   dispatch => {
      StaffServices.searchStaffs(filterText).then(staffs => {
         dispatch(searchStaffsAction(staffs));
      }).catch(() => {
         ToastAndroid.show('Search error!', ToastAndroid.LONG);
      });
   }
);
