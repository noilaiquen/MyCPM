
const initState = {
   isLoading: false, //for show loading when reload data from API
   isEndReached: false, //for show loading load more of Flatlist
   isSearching: false,
   isError: false,
   staffs: [],
   staffsSearch: [],
   page: 1,
   limit: 20
};

const StaffReducer = (state = initState, action) => {
   switch (action.type) {
      case 'RESET_STATES_TO_DEFAULT': {
         return initState;
      }
      case 'FETCH_STAFFS_START': {
         return {
            ...state,
            isLoading: true,
            page: 1,
            staffs: [] //reset list
         };
      }
      case 'FETCH_STAFFS_SUCCESS': {
         return {
            ...state,
            isLoading: false,
            isError: false
         };
      }
      case 'FETCH_STAFFS_ERROR': {
         return {
            ...state,
            isLoading: false,
            isError: true
         };
      }
         
      /* --------------------------LOCAL----------------------- */   
      case 'FETCH_STAFFS_LOCAL_START': {
         return {
            ...state,
            isEndReached: true,
            isError: false,
         };
      }
      case 'FETCH_STAFFS_LOCAL_SUCCESS': {
         const { staffs } = action;
         return {
            ...state,
            isEndReached: false,
            staffs: state.staffs.concat(staffs),
            page: state.page + 1
         };
      }
      case 'FETCH_STAFFS_LOCAL_ERROR': {
         return {
            ...state,
            isEndReached: false,
            isError: true
         };
      }
         
      /* --------------------------SEARCH STAFF----------------------- */   
      case 'SEARCH_STAFFS': {
         const { staffs } = action;
         return {
            ...state,
            staffsSearch: staffs,
            isSearching: true
         };
      }
      case 'END_SEARCH_STAFFS': {
         return {
            ...state,
            staffsSearch: [],
            isSearching: false
         };
      }
      default:
         return state;
   }
};
export default StaffReducer;
