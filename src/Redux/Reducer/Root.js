import { combineReducers } from 'redux';

import AppReducer from './AppReducer';
import InitDataReducer from './InitDataReducer';
import AuthReducer from './AuthReducer';
import StaffReducer from './StaffReducer';
import DeviceReducer from './DeviceReducer';
import IncomeReducer from './IncomeReducer';
import ProfileReducer from './ProfileReducer';
// import NavReducer from './NavReducer';

const RootReducer = combineReducers({
   AppState: AppReducer,
   AuthState: AuthReducer,
   StaffState: StaffReducer,
   DeviceState: DeviceReducer,
   InitDataState: InitDataReducer,
   IncomeState: IncomeReducer,
   ProfileState: ProfileReducer,
   // NavState: NavReducer
});
export default RootReducer;
