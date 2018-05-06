import React from 'react';
import {
   TouchableOpacity,
   Image,
   Dimensions,
   Text,
   Animated,
   Easing
} from 'react-native';
import { StackNavigator } from 'react-navigation';

import DeviceList from '../Screens/DeviceList';
import DeviceInfo from '../Screens/DeviceInfo';
import DeviceNotes from '../Screens/DeviceNotes';

import {
   appColor,
   appTextColor,
   appIconDimensions,
   appFont
} from '../../../../Configs/Constants';

import openDrawerIcon from '../../../../Media/Icon/menu-left.png';
import refeshIcon from '../../../../Media/Icon/refesh.png';
import noteIcon from '../../../../Media/Icon/note.png';
import backIcon from '../../../../Media/Icon/back.png';
import logoCPM from '../../../../Media/Image/logo-header.png';

const { height } = Dimensions.get('window');

const RouteConfigs = {
   DeviceList: {
      screen: DeviceList,
      navigationOptions: ({ navigation }) => ({
         headerLeft: (
            <TouchableOpacity onPress={() => navigation.navigate('DrawerOpen')}>
               <Image
                  source={openDrawerIcon}
                  style={[appIconDimensions, { tintColor: appTextColor, marginLeft: 15 }]}
               />
            </TouchableOpacity>
         ),
         headerRight: (
            <TouchableOpacity onPress={() => navigation.state.params.fetchDevices()}>
               <Image
                  source={refeshIcon}
                  style={[appIconDimensions, { tintColor: appTextColor, marginRight: 15 }]}
               />
            </TouchableOpacity>
         )
      })
   },
   DeviceInfo: {
      screen: DeviceInfo,
      navigationOptions: ({ navigation }) => ({
         headerLeft: (
            <TouchableOpacity onPress={() => navigation.goBack()}>
               <Image
                  source={backIcon}
                  style={[appIconDimensions, { tintColor: appTextColor, marginLeft: 15 }]}
               />
            </TouchableOpacity>
         ),
         headerTitle: (
            <Text
               style={{
                  color: appTextColor,
                  fontFamily: appFont,
                  fontSize: 16
               }}
            >
               { navigation.state.params.device.fullname }
            </Text>
         ),
         headerRight: (
            <TouchableOpacity onPress={() => navigation.navigate('DeviceNotes')}>
               <Image
                  source={noteIcon}
                  style={[appIconDimensions, { tintColor: appTextColor, marginRight: 15 }]}
               />
            </TouchableOpacity>
         )
      })
   },
   DeviceNotes: {
      screen: DeviceNotes,
      navigationOptions: ({ navigation }) => ({
         headerLeft: (
            <TouchableOpacity onPress={() => navigation.goBack()}>
               <Image
                  source={backIcon}
                  style={[appIconDimensions, { tintColor: appTextColor, marginLeft: 15 }]}
               />
            </TouchableOpacity>
         ),
         headerTitle: (
            <Text
               style={{
                  color: appTextColor,
                  fontFamily: appFont,
                  fontSize: 16
               }}
            >
               Notes
            </Text>
         )
      })
   }
};

const StackConfigs = {
   initialRouteName: 'DeviceList',
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

export default StackNavigator(RouteConfigs, StackConfigs);
