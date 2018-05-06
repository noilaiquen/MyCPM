
const initState = {
   isLoading: false,
   isLoadingModal: false,
   isLoggedIn: false,
   isError: false,
   message: null
};

const AuthReducer = (state = initState, action) => {
   switch (action.type) {
      case 'RESET_STATE': {
         return initState;
      }
      case 'FETCHING_LOGIN_START': {
         return {
            ...state,
            isLoading: true,
            message: null,
            isError: false
         };
      }
      case 'FETCHING_LOGIN_SUCCESS': {
         return {
            ...state,
            isLoading: false,
            isLoggedIn: true
         };
      }
      case 'FETCHING_LOGIN_ERROR': {
         const { message } = action;
         return {
            ...state,
            isLoading: false,
            isError: true,
            message
         };
      }
      case 'USER_LOGOUT': {
         return {
            ...state,
            isLoggedIn: false,
            message: null,
            isError: false
         };
      }
      case 'CHANGE_PASSWORD_START': {
         return {
            ...state,
            isLoading: true,
            message: null,
            isError: false
         };
      }
      case 'CHANGE_PASSWORD_SUCCESS': {
         const { message } = action;
         return {
            ...state,
            isLoading: false,
            message
         };
      }
      case 'CHANGE_PASSWORD_ERROR': {
         const { message } = action;
         return {
            ...state,
            isLoading: false,
            isError: true,
            message
         };
      }
      case 'SEND_MAIL_PASSWORD_START': {
         return {
            ...state,
            isLoadingModal: true,
            isError: false,
            message: null
         };
      }
      case 'SEND_MAIL_PASSWORD_SUCCESS': {
         const { message } = action;
         return {
            ...state,
            isLoadingModal: false,
            message

         };
      }
      case 'SEND_MAIL_PASSWORD_ERROR': {
         const { message } = action;
         return {
            ...state,
            isLoadingModal: false,
            isError: true,
            message

         };
      }
      default:
         return state;
   }
};
export default AuthReducer;
