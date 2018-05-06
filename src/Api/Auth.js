import { API_KEY, API_URL, headersApi } from '../Configs/Constants';

export const LoginApi = (username, password) => (
   fetch(`${API_URL}login`, { //eslint-disable-line
      method: 'POST',
      headers: headersApi,
      body: `api_key=${API_KEY}&username=${username}&password=${password}`
  }).then(res => res.json())
);

export const ChangePasswordApi = (userId, oldPassword, newPassword) => (
   fetch(`${API_URL}change_pass`, { //eslint-disable-line
      method: 'POST',
      headers: headersApi,
      body: `api_key=${API_KEY}&user_id=${userId}&old_password=${oldPassword}&real_password=${newPassword}`
  }).then(res => res.json())
);

export const ForgotPasswordApi = email => (
   fetch(`${API_URL}forgot_password`, { //eslint-disable-line
      method: 'POST',
      headers: headersApi,
      body: `api_key=${API_KEY}&email=${email}`
  }).then(res => res.json())
);

export const UploadProfileApi = profile => {
   let body = '';
   Object.keys(profile).map(key => {
     body += `&${key}=${profile[key]}`;
   });

   return fetch(`${API_URL}user_update_info`, { //eslint-disable-line
      method: 'POST',
      headers: headersApi,
      body: `api_key=${API_KEY}${body}`
   }).then(res => res.json());
};

