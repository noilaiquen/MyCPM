import Frisbee from 'frisbee';
import { API_URL } from '../Configs/Constants';

// create a new instance of Frisbee
const Api = new Frisbee({
   baseURI: API_URL,
   headers: {
      Accept: 'application/json',
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
   }
});
export default Api;
