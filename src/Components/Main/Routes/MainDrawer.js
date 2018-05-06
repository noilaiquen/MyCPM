import { DrawerNavigator } from 'react-navigation';
import React from 'react';
import { View, Text, Dimensions, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import DrawerMenu from '../../Common/DrawerMenu';
import Header from '../../Common/Header';
import HomeStack from '../Home/Routes/HomeStack';
import ChangePassword from '../ChangePassword/ChangePassword';
import StaffManagementStack from '../Staffs/Routes/StaffsStack';
import DeviceManagementStack from '../Devices/Routes/DevicesStack';
import AboutCPM from '../AboutCPM/AboutCPM';
import {
   appColor,
   appTextColor,
   appTextColorHighLight
} from '../../../Configs/Constants';

import menuLeftIcon from '../../../Media/Icon/menu-left.png';
import menuRightIcon from '../../../Media/Icon/refesh.png';

const { width } = Dimensions.get('window');

const AppInfo = props => (
   <View style={{ flex: 1 }}>
      <Header iconLeftBtn={menuLeftIcon} iconRightBtn={menuRightIcon} {...props} />
      <Text>App Info</Text>
   </View>
);

const RouteConfigs = {
   Home: {
      screen: HomeStack,
      navigationOptions: {
         drawerLabel: 'Home',
         drawerIcon: ({ tintColor }) => (
            <View style={styles.iconContainer}>
               <Icon
                  name={'ios-home-outline'}
                  color={tintColor} size={30}
               />
            </View>
         )
      }
   },
   StaffManagement: {
      screen: StaffManagementStack,
      navigationOptions: {
         drawerLabel: 'Nhân viên',
         drawerIcon: ({ tintColor }) => (
            <View style={styles.iconContainer}>
               <Icon
                  name={'ios-people-outline'}
                  color={tintColor} size={30}
                  style={styles.icon}
               />
            </View>
         )
      }
   },
   Devices: {
      screen: DeviceManagementStack,
      navigationOptions: {
         drawerLabel: 'Thiết bị',
         drawerIcon: ({ tintColor }) => (
            <View style={styles.iconContainer}>
               <Icon
                  name={'ios-laptop-outline'}
                  color={tintColor} size={30}
                  style={styles.icon}
               />
            </View>
         )
      }
   },
   ChangePassword: {
      screen: ChangePassword,
      navigationOptions: {
         drawerLabel: 'Đổi mật khẩu',
         drawerIcon: ({ tintColor }) => (
            <View style={styles.iconContainer}>
               <Icon
                  name={'ios-lock-outline'}
                  color={tintColor} size={30}
                  style={styles.icon}
               />
            </View>
         )
      }
   },
   About: {
      screen: AboutCPM,
      navigationOptions: {
         drawerLabel: 'Thông tin CPM',
         drawerIcon: ({ tintColor }) => (
            <View style={styles.iconContainer}>
               <Icon
                  name={'ios-information-circle-outline'}
                  color={tintColor} size={30}
                  style={styles.icon}
               />
            </View>
         )
      }
   },
   AppInfo: {
      screen: AppInfo,
      navigationOptions: {
         drawerLabel: 'Thông tin phần mềm',
         drawerIcon: ({ tintColor }) => (
            <View style={styles.iconContainer}>
               <Icon
                  name={'ios-phone-portrait-outline'}
                  color={tintColor} size={30}
               />
            </View>
         )
      }
   }
};

const DrawerConfigs = {
   initialRouteName: 'Home',
   drawerWidth: width * 0.8,
   drawerBackgroundColor: appColor,
   contentComponent: props => <DrawerMenu {...props} />,
   contentOptions: {
      activeTintColor: appTextColorHighLight,
      inactiveTintColor: appTextColor,
   }
};

export default DrawerNavigator(RouteConfigs, DrawerConfigs);

const styles = StyleSheet.create({
   iconContainer: {
      width: 40,
      alignItems: 'center'
   }
});

