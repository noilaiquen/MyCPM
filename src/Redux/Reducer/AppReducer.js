const initState = {
   isLoggedIn: false,
   checkLogin: false,
   userInfo: {}
};

const AppReducer = (state = initState, action) => {
   switch (action.type) {
      case 'CHECK_LOGIN': {
         const { userInfo } = action;
         return {
            ...state,
            isLoggedIn: !!userInfo,
            userInfo: userInfo ? userInfo : {},
            checkLogin: true
         };
      }  
      default:    
         return state;
   }
};

export default AppReducer;
