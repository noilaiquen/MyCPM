import { API_URL, headersApi } from '../Configs/Constants';

export const FetchLocalProvincesApi = () => (
   fetch(`${API_URL}local_provinces`, {
      method: 'POST',
      headers: headersApi
  }).then(res => res.json())
);

export const FetchLocalDistrictsApi = () => (
   fetch(`${API_URL}local_districts`, {
      method: 'POST',
      headers: headersApi
  }).then(res => res.json())
);

export const FetchLocalWardsApi = () => (
   fetch(`${API_URL}local_wards`, {
      method: 'POST',
      headers: headersApi
  }).then(res => res.json())
);

const FetchAllLocalDataApi = () => new Promise((resolve, reject) => {
   Promise.all([
      FetchLocalProvincesApi(),
      FetchLocalDistrictsApi(),
      FetchLocalWardsApi()
   ]).then(responses => {
      if(responses[0].data !== undefined && responses[1].data !== undefined && responses[2].data !== undefined){
         resolve({
            provinces: responses[0].data,
            districts: responses[1].data,
            wards: responses[2].data
         });
      } else {
         reject('API response wrong status code!');
      }
   }).catch(e => {
      reject(e);
   })
});

export default FetchAllLocalDataApi;
