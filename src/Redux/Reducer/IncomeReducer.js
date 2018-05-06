
const initState = {
   isFetched: false,
   totalIncomeYear: 0,
   salary3Months: [],
   currentYear: 0,
   isLoading: false,
   isError: false,
   message: null
};

const IncomeReducer = (state = initState, action) => {
   switch (action.type) {
      case 'FETCH_INCOME_INFO_START': {
         return {
            ...state,
            isLoading: true,
            isError: false,
            message: null
         };
      }
      case 'FETCH_INCOME_INFO_SUCCESS': {
         const { totalIncomeYear, salary3Months, message, currentYear } = action.data;
         return {
            ...state,
            totalIncomeYear,
            salary3Months,
            currentYear,
            isLoading: false,
            isFetched: true,
            message
         };
      }
      case 'FETCH_INCOME_INFO_ERROR': {
         const { message } = action.data;
         return {
            ...state,
            isLoading: false,
            isError: true,
            message
         };
      }
      default:
         return state;
   }
};
export default IncomeReducer;
