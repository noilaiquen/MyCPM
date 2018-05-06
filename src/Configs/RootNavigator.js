import { StackNavigator } from 'react-navigation';
import MainDrawer from '../Components/Main/Routes/MainDrawer';
import Login from '../Components/Login/Login';

const RootNavigator = (isSignIn = false) => (
   StackNavigator({
      Login: {
         screen: Login
      },
      Main: {
         screen: MainDrawer
      }
   }, {
      initialRouteName: isSignIn ? 'Main' : 'Login',
      headerMode: 'none'
   })
);

export default RootNavigator;

