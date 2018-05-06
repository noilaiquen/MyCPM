import { fetchTotalIncomeYearApi, fetchSalary3MonthsApi } from '../../Api/Income';
// import { setIncomeInfo, getIncomeInfo } from '../../Storage/AsyncStorage/Income';

const fetchIncomeInfoStart = () => ({
   type: 'FETCH_INCOME_INFO_START'
});

const fetchIncomeInfoSuccess = data => ({
   type: 'FETCH_INCOME_INFO_SUCCESS',
   data
});

const fetchIncomeInfoError = message => ({
   type: 'FETCH_INCOME_INFO_ERROR',
   message
});

export const fetchIncomeInfo = userId => (
   dispatch => {
      dispatch(fetchIncomeInfoStart());
      Promise.all([
         fetchTotalIncomeYearApi(userId),
         fetchSalary3MonthsApi(userId)
      ]).then(responses => {
         const data = {
            totalIncomeYear: (responses[0].status === 1) ? responses[0].data.total_income : 0,
            currentYear: (responses[0].status === 1) ? responses[0].data.current_year : 0,
            salary3Months: (responses[1].status === 1) ? responses[1].data.income_by_month : [],
            message: 'Success!'
         };

         dispatch(fetchIncomeInfoSuccess(data));

        /*  Promise.all([
            setIncomeInfo(data),
            getIncomeInfo(data)
         ]).then(cacheResponses => {
            dispatch(fetchIncomeInfoSuccess(cacheResponses[1]));
         }); */
      }).catch(() => dispatch(fetchIncomeInfoError('Lỗi!')));
   }
);

