import React from 'react';
import {
   TouchableOpacity,
   Image,
   Dimensions,
   View,
   Animated,
   Easing,
   Text
} from 'react-native';
import { StackNavigator, NavigationActions } from 'react-navigation';
import Icon from 'react-native-vector-icons/Ionicons';

import StaffList from '../Screens/StaffList';
import StaffInfo from '../Screens/StaffInfo';

import {
   appColor,
   appTextColor,
   appIconDimensions, appFont
} from '../../../../Configs/Constants';
import backIcon from '../../../../Media/Icon/back.png';

const { height } = Dimensions.get('window');

const resetAction = NavigationActions.reset({
   index: 0,
   actions: [
      NavigationActions.navigate({ routeName: 'Main' })
   ],
   key: null
});


const RouteConfigs = {
   StaffList: {
      screen: StaffList,
      navigationOptions: ({ navigation }) => ({
         headerLeft: (
            <TouchableOpacity onPress={() => navigation.dispatch(resetAction)}>
               <Icon
                  name="ios-arrow-round-back-outline"
                  color={appTextColor}
                  size={45}
                  style={{ marginLeft: 15 }}
               />
            </TouchableOpacity>
         ),
         headerRight: (
            <TouchableOpacity onPress={() => navigation.state.params.fetchStaffs()}>
               <Icon
                  name="ios-sync-outline"
                  color={appTextColor}
                  size={30}
                  style={{ marginRight: 15 }}
               />
            </TouchableOpacity>
         )
      })
   },
   StaffInfo: {
      screen: StaffInfo,
      navigationOptions: ({ navigation }) => ({
         headerLeft: (
            <TouchableOpacity onPress={() => navigation.goBack()}>
               <Image
                  source={backIcon}
                  style={[appIconDimensions, { tintColor: appTextColor, marginLeft: 15 }]}
               />
            </TouchableOpacity>
         ),
         headerRight: <View style={[appIconDimensions, { marginRight: 15 }]} />
      })
   }
};

const StackConfigs = {
   initialRouteName: 'StaffList',
   navigationOptions: {
      headerTitle: (
         <Text
            style={{ color: appTextColor, fontFamily: appFont, fontSize: 16 }}
         >
            Quản lý nhân viên
         </Text>
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
