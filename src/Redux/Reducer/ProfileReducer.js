const initState = {
  isLoading: false,
  message: null,
  isError: false
};

const ProfileReducer = (state = initState, action) => {
   switch (action.type) {
      case 'UPDATE_RPOFILE_START': {
         return {
            ...state,
            isLoading: true,
            message: null,
            isError: false
         };
      }
      case 'UPDATE_RPOFILE_SUCCESS': {
         const { message } = action;
         return {
            ...state,
            isLoading: false,
            message
         };
      }
      case 'UPDATE_RPOFILE_ERROR': {
         const { message } = action;
         return {
            ...state,
            isLoading: false,
            isError: true,
            message
         };
      }
      case 'RESET_STATE': {
         return initState;
      }

      default:
         return state;
   }
};

export default ProfileReducer;
