import { LoginApi, ChangePasswordApi, ForgotPasswordApi } from '../../Api/Auth';
import {
   setLocalUserLoginInfo,
   removeLocalUserLoginInfo
} from '../../Storage/AsyncStorage/Auth';
import { checkUserLoginAction } from './AppAction';

export const resetStateAction = () => ({
   type: 'RESET_STATE'
});

const loginStartAction = () => ({
   type: 'FETCHING_LOGIN_START'
});

export const loginSuccessAction = () => ({
   type: 'FETCHING_LOGIN_SUCCESS'
});

const loginErrorAction = message => ({
   type: 'FETCHING_LOGIN_ERROR',
   message
});

export const userLogin = (username, password) => (
   dispatch => {
      dispatch(loginStartAction());
      LoginApi(username, password).then(response => {
         const { data, status, message } = response;
         if (status === 1) {
            setLocalUserLoginInfo(data).then(() => {
               dispatch(loginSuccessAction());
            });
         } else {
            dispatch(loginErrorAction(message));
         }
      }).catch(e => {
         console.log(e);
         dispatch(loginErrorAction('Lỗ API'));
      });
   }
);

export const userLogoutAction = () => ({
   type: 'USER_LOGOUT'
});

export const logout = () => (
   dispatch => {
      removeLocalUserLoginInfo().then(() => {
         dispatch(checkUserLoginAction(null));
         dispatch(userLogoutAction());
      }).catch(e => {
         throw new Error(e);
      });
   }
);

const changePasswordAction = () => ({
   type: 'CHANGE_PASSWORD_START'
});

const changePasswordSuccessAction = message => ({
   type: 'CHANGE_PASSWORD_SUCCESS',
   message
});

const changePasswordErrorAction = message => ({
   type: 'CHANGE_PASSWORD_ERROR',
   message
});

export const changePassword = (userId, oldPassword, newPassword) => (
   dispatch => {
      dispatch(changePasswordAction());

      ChangePasswordApi(userId, oldPassword, newPassword).then(response => {
         const { status, message } = response;
         if (status === 1) {
            dispatch(changePasswordSuccessAction(message));
         } else {
            dispatch(changePasswordErrorAction(message));
         }
      }).catch(e => {
         console.log('Change password error: ', e);
         dispatch(changePasswordErrorAction('Không thành công!'));
      });
   }
);


const sendMailPasswordStart = () => ({
   type: 'SEND_MAIL_PASSWORD_START'
});

const sendMailPasswordSuccess = message => ({
   type: 'SEND_MAIL_PASSWORD_SUCCESS',
   message
});

const sendMailPasswordError = message => ({
   type: 'SEND_MAIL_PASSWORD_ERROR',
   message
});

export const sendMailPassword = email => (
   dispatch => {
      dispatch(sendMailPasswordStart());
      ForgotPasswordApi(email).then(response => {
         const { status, message } = response;
         if (status === 1) {
            dispatch(sendMailPasswordSuccess(message));
         } else {
            dispatch(sendMailPasswordError(message));
         }
      }).catch(() => {
         dispatch(sendMailPasswordError('API error!'));
      });
   }
);
