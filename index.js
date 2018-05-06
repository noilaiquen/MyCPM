import React, { Component } from 'react';
import {
   AppRegistry,
   StatusBar
} from 'react-native';
import { Provider } from 'react-redux';
import store from './src/Redux/Store';
import App from './src/App';
import { appColor } from './src/Configs/Constants';

StatusBar.setBackgroundColor(appColor);
StatusBar.setTranslucent(false);

class MyCPM extends Component {
   render() {
      return (
         <Provider store={store}>
            <App />
         </Provider>
      );
   }
}

AppRegistry.registerComponent('MyCPM', () => MyCPM);
