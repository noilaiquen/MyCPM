const initState = {
   isLoading: false,
   isError: false,
   message: null
};

const InitDataReducer = (state = initState, action) => {
   switch (action.type) {
      case 'STORE_INIT_DATA_START': {
         const { message } = action;
         return {
            ...state,
            isLoading: true,
            message
         };
      }
      case 'STORE_INIT_DATA_SUCCESS': {
         const { message } = action;
         return {
            ...state,
            isLoading: false,
            message
         };
      }  
      case 'STORE_INIT_DATA_ERROR': {
         const { message } = action;
         return {
            ...state,
            isLoading: false,
            isError: true,
            message
         };
      }  
      default:    
         return state;
   }
};

export default InitDataReducer;
