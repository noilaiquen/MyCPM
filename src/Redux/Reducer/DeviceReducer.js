
const initState = {
   isLoading: false, //for show loading when reload data from API
   isEndReached: false, //for show loading load more of Flatlist
   isSearching: false,
   isError: false,
   devices: [],
   notes: [],
   devicesSearch: [],
   page: 1,
   limit: 20
};

const DeviceReducer = (state = initState, action) => {
   switch (action.type) {
      case 'RESET_STATES_TO_DEFAULT': {
         return initState;
      }
      case 'FETCH_DEVICES_START': {
         return {
            ...state,
            isLoading: true,
            page: 1,
            devices: [] //reset list
         };
      }
      case 'FETCH_DEVICES_SUCCESS': {
         return {
            ...state,
            isLoading: false,
            isError: false
         };
      }
      case 'FETCH_DEVICES_ERROR': {
         return {
            ...state,
            isLoading: false,
            isError: true
         };
      }
         
      /* --------------------------LOCAL----------------------- */   
      case 'FETCH_DEVICES_LOCAL_START': {
         return {
            ...state,
            isEndReached: true,
            isError: false,
         };
      }
      case 'FETCH_DEVICES_LOCAL_SUCCESS': {
         const { devices } = action;
         return {
            ...state,
            isEndReached: false,
            devices: state.devices.concat(devices),
            page: state.page + 1
         };
      }
      case 'FETCH_DEVICES_LOCAL_ERROR': {
         return {
            ...state,
            isEndReached: false,
            isError: true
         };
      }
         
      /* --------------------------SEARCH DEVICE----------------------- */
      case 'SEARCH_DEVICES': {
         const { devices } = action;
         return {
            ...state,
            devicesSearch: devices,
            isSearching: true
         };
      }
      case 'END_SEARCH_DEVICES': {
         return {
            ...state,
            devicesSearch: [],
            isSearching: false
         };
      }

      /*------------DEVICE NOTES-----------*/
      case 'FETCH_DEVICE_NOTES_START': {
         return {
            ...state,
            isLoading: true,
            isError: false,
            notes: [],
            message: null
         };
      }
      case 'FETCH_DEVICE_NOTES_SUCCESS': {
         const { notes } = action;
         return {
            ...state,
            isLoading: false,
            isError: false,
            notes
         };
      }
      case 'FETCH_DEVICE_NOTES_ERROR': {
         const { message } = action;
         return {
            ...state,
            isLoading: false,
            isError: true,
            message
         };
      }
      case 'RESET_DEVICE_NOTES_STATE': {
         console.log(111111111111111)
         return {
            ...state,
            isLoading: false,
            isError: false,
            notes: []
         };
      }
      default:
         return state;
   }
};
export default DeviceReducer;
