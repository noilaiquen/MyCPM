import { ToastAndroid } from 'react-native';
import { FetchAllDeviceApi, FetchDeviceNotesApi } from '../../Api/Device';
import DeviceServices from '../../Storage/Realm/DeviceServices';

export const resetStatesToDefault = () => ({
   type: 'RESET_STATES_TO_DEFAULT'
});

const fecthDevicesStartAction = () => ({
   type: 'FETCH_DEVICES_START'
});

const fecthDevicesSuccessAction = () => ({
   type: 'FETCH_DEVICES_SUCCESS'
});

const fecthDevicesErrorAction = () => ({
   type: 'FETCH_DEVICES_ERROR'
});

export const fetchDevices = userId => (
   dispatch => {
      dispatch(fecthDevicesStartAction());

      FetchAllDeviceApi(userId).then(resJSON => {
         const { data, status } = resJSON;
         if (status === 1) {
            Promise.all([
               DeviceServices.removeAll(),
               DeviceServices.insertAll(data)
            ]).then(() => {
               dispatch(fecthDevicesSuccessAction());
            }).catch(() => {
               dispatch(fecthDevicesErrorAction());
               ToastAndroid.show('Cache error!', ToastAndroid.LONG);
            });
         } else {
            dispatch(fecthDevicesErrorAction());
            ToastAndroid.show('API response error code!', ToastAndroid.LONG);
         }
      }).catch(() => {
         dispatch(fecthDevicesErrorAction());
         ToastAndroid.show('API Error!', ToastAndroid.LONG);
      });
   }
);

const fecthDevicesLocalStartAction = () => ({
   type: 'FETCH_DEVICES_LOCAL_START'
});

const fecthDevicesLocalSuccessAction = devices => ({
   type: 'FETCH_DEVICES_LOCAL_SUCCESS',
   devices
});

const fecthDevicesLocalErrorAction = () => ({
   type: 'FETCH_DEVICES_LOCAL_ERROR'
});

export const getDevicesLocal = (from, to) => (
   dispatch => {
      dispatch(fecthDevicesLocalStartAction());
      DeviceServices.getDevices(from, to).then(devices => {
         //delay 1s for loading
         setTimeout(() => {
            dispatch(fecthDevicesLocalSuccessAction(devices));
         }, 1000);
      }).catch(() => {
         dispatch(fecthDevicesLocalErrorAction());
         ToastAndroid.show('Load devices cache error!', ToastAndroid.LONG);
      });
   }
);

const searchDevicesAction = staffs => ({
   type: 'SEARCH_DEVICES',
   staffs
});

export const endSearchDevices = () => ({
   type: 'END_SEARCH_DEVICES'
});

export const searchDevices = filterText => (
   dispatch => {
      DeviceServices.searchDevices(filterText).then(devices => {
         dispatch(searchDevicesAction(devices));
      }).catch(() => {
         ToastAndroid.show('Search error!', ToastAndroid.LONG);
      });
   }
);

const fecthDeviceNotesStart = () => ({
   type: 'FETCH_DEVICE_NOTES_START'
});

const fecthDeviceNotesSuccess = notes => ({
   type: 'FETCH_DEVICE_NOTES_SUCCESS',
   notes
});

const fecthDeviceNotesError = (message = null) => ({
   type: 'FETCH_DEVICE_NOTES_ERROR',
   message
});

export const fetchDeviceNotes = () => (
   dispatch => {
      dispatch(fecthDeviceNotesStart());

      FetchDeviceNotesApi().then(response => {
         const { status, message, data } = response;

         if (status === 1) {
            dispatch(fecthDeviceNotesSuccess(data));
         } else {
            dispatch(fecthDeviceNotesError(message));
         }
      }).catch(() => {
         dispatch(fecthDevicesLocalErrorAction('API Error!'));
         ToastAndroid.show('API Error!', ToastAndroid.LONG);
      });
   }
);

export const resetDeviceNotesState = () => ({
   type: 'RESET_DEVICE_NOTES_STATE'
})
