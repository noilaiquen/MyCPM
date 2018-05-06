import { API_KEY, API_URL, headersApi } from '../Configs/Constants';

export const FetchAllStaffApi = userId => (
   fetch(`${API_URL}get_users`, { //eslint-disable-line
      method: 'POST',
      headers: headersApi,
      body: `api_key=${API_KEY}&user_id=${userId}`
  }).then(res => res.json())
);
