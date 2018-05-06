import React from 'react';
import { TabNavigator } from 'react-navigation';
import Icon from 'react-native-vector-icons/Ionicons';

import Home from '../Screens/Home';
import Profile from '../Screens/Profile';
import Training from '../Screens/Training';
import Support from '../Screens/Support';

import {
   appColor, appTextColorHighLight, appFont
} from '../../../../Configs/Constants';

const RouteConfigs = {
   Home: {
      screen: Home,
      navigationOptions: {
         tabBarLabel: 'Home',
         tabBarIcon: ({ tintColor, focused }) => (
            <Icon
               name={focused ? 'ios-home' : 'ios-home-outline'}
               color={tintColor} size={30}
            />
         )
      }
   },
   Profile: {
      screen: Profile,
      navigationOptions: {
         tabBarLabel: 'Profile',
         tabBarIcon: ({ tintColor, focused }) => (
            <Icon
               name={focused ? 'ios-contact' : 'ios-contact-outline'}
               color={tintColor} size={30}
            />
         )
      }
   },
   Training: {
      screen: Training,
      navigationOptions: {
         tabBarLabel: 'Traning',
         tabBarIcon: ({ tintColor, focused }) => (
            <Icon
               name={focused ? 'ios-book' : 'ios-book-outline'}
               color={tintColor} size={30}
            />
         )
      }
   },
   Support: {
      screen: Support,
      navigationOptions: {
         tabBarLabel: 'Support',
         tabBarIcon: ({ tintColor, focused }) => (
            <Icon
               name={focused ? 'ios-help-circle' : 'ios-help-circle-outline'}
               color={tintColor} size={30}
            />
         )
      }
   }
};

const TabConfigs = {
   initialRouteName: 'Home',
   // initialRouteName: 'Profile',
   tabBarPosition: 'bottom',
   swipeEnabled: false,
   animationEnabled: false,
   tabBarOptions: {
      showLabel: true,
      showIcon: true,
      upperCaseLabel: false,
      activeTintColor: appTextColorHighLight,
      inactiveTintColor: appColor,
      style: {
         backgroundColor: '#FFF'
      },
      indicatorStyle: {
         backgroundColor: appTextColorHighLight
      },
      labelStyle: {
         fontFamily: appFont,
         fontSize: 10,
         marginTop: 0,
         marginBottom: 0
      },
      iconStyle: {
         width: 31,
         height: 31
     },
   }
};

export default TabNavigator(RouteConfigs, TabConfigs);
