import React from 'react';
import {
   Image,
   Dimensions,
   Easing,
   Animated,
   TouchableOpacity
} from 'react-native';
import { StackNavigator } from 'react-navigation';
import Icon from 'react-native-vector-icons/Ionicons';
import HomeTab from './HomeTab';
import CheckIn from '../Screens/CheckIn';
import logoCPM from '../../../../Media/Image/logo-header.png';


import { appColor, appTextColor } from '../../../../Configs/Constants';

const { height } = Dimensions.get('window');

const routeConfigs = {
   HomeTab: {
      screen: HomeTab,
      navigationOptions: ({ navigation }) => ({
         headerLeft: (
            <TouchableOpacity onPress={() => navigation.navigate('DrawerOpen')}>
               <Icon
                  name="ios-list-outline"
                  color={appTextColor}
                  size={45}
                  style={{ marginLeft: 15 }}
               />
            </TouchableOpacity>
         )
      })
   },
   CheckIn: {
      screen: CheckIn,
      navigationOptions: ({ navigation }) => ({
         headerLeft: (
            <TouchableOpacity onPress={() => navigation.goBack()}>
               <Icon
                  name="ios-arrow-round-back-outline"
                  color={appTextColor}
                  size={45}
                  style={{ marginLeft: 15 }}
               />
            </TouchableOpacity>
         ),
         headerRight: (
            <TouchableOpacity onPress={() => (null) }>
               <Icon
                  name="ios-sync-outline"
                  color={appTextColor}
                  size={30}
                  style={{ marginRight: 15 }}
               />
            </TouchableOpacity>
         )
      })
   }
};

const StackConfigs = {
   initialRouteName: 'HomeTab',
   navigationOptions: {
      headerTitle: (
         <Image
            source={logoCPM}
            style={{ width: 80, resizeMode: 'contain', alignSelf: 'center' }}
         />
      ),
      headerStyle: {
         height: height * 0.08,
         backgroundColor: appColor,
         elevation: 0
      }
   },
   transitionConfig: () => ({
      transitionSpec: {
         duration: 300,
         easing: Easing.out(Easing.poly(4)),
         timing: Animated.timing,
      },
      screenInterpolator: sceneProps => {
         const { layout, position, scene } = sceneProps;
         const { index } = scene;

         const layoutWidth = layout.initWidth;
         const translateX = position.interpolate({
            inputRange: [index - 1, index, index + 1],
            outputRange: [layoutWidth, 0, 0],
         });

         const opacity = position.interpolate({
            inputRange: [index - 1, index - 0.99, index],
            outputRange: [0, 1, 1],
         });

         return { opacity, transform: [{ translateX }] };
      },
   })
};


export default StackNavigator(routeConfigs, StackConfigs);
