import { getLocalUserLoginInfo } from '../../Storage/AsyncStorage/Auth';

export const checkUserLoginAction = userInfo => ({
   type: 'CHECK_LOGIN',
   userInfo
});

export const checkLoggedIn = () => (
   dispatch => {
      getLocalUserLoginInfo().then(userInfo => {
         dispatch(checkUserLoginAction(userInfo));
      });
   }
);
