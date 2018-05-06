import { API_KEY, API_URL, headersApi } from '../Configs/Constants';

export const fetchTotalIncomeYearApi = userId => (
   fetch(`${API_URL}user_income/total_income_current_year`, { //eslint-disable-line
      method: 'POST',
      headers: headersApi,
      body: `api_key=${API_KEY}&user_id=${userId}`
   }).then(res => res.json())
);

export const fetchSalary3MonthsApi = userId => (
   fetch(`${API_URL}user_income/total_income_by_month`, { //eslint-disable-line
      method: 'POST',
      headers: headersApi,
      body: `api_key=${API_KEY}&user_id=${userId}`
   }).then(res => res.json())
);

