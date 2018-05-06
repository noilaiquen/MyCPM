import { API_KEY, API_URL, headersApi } from '../Configs/Constants';

export const FetchAllDeviceApi = userId => (
   fetch(`${API_URL}get_devices`, { //eslint-disable-line
      method: 'POST',
      headers: headersApi,
      body: `api_key=${API_KEY}&user_id=${userId}`
   }).then(res => res.json())
);

export const FetchDeviceNotesApi = () => (
   fetch(`${API_URL}device_note`, { //eslint-disable-line
      method: 'POST',
      headers: headersApi,
      body: `api_key=${API_KEY}`
   }).then(res => res.json())
);

