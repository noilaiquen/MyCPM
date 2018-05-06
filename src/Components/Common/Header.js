import React from 'react';
import {
   View, Image,
   TouchableOpacity, StyleSheet, Dimensions
} from 'react-native';
import { NavigationActions } from 'react-navigation';
import { appColor, appTextColor, appIconDimensions } from '../../Configs/Constants';
import logoImage from '../../Media/Image/logo-header.png';

const { height } = Dimensions.get('window');

const Header = ({ iconLeftBtn, iconRightBtn, navigation }) => {
   const { container, iconLeft, iconRight, logo, nullNode } = Styles;
   return (
      <View style={headerContainer}>
         <TouchableOpacity onPress={() => navigation.navigate('DrawerOpen')} >
            <Image source={iconLeftBtn} style={iconLeft} />
         </TouchableOpacity>
         <Image source={logoImage} style={logo} />
         {iconRightBtn ? (
            <TouchableOpacity>
               <Image source={iconRightBtn} style={iconRight} />
            </TouchableOpacity>
         ) : (
            <View style={nullNode} />
         )}
      </View>
   );
};

export default Header;

const Styles = StyleSheet.create({
   headerContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      height: height * 0.08,
      backgroundColor: appColor
   },
   iconLeft: {
      ...appIconDimensions,
      marginLeft: 15,
      tintColor: appTextColor
   },
   iconRight: {
      ...appIconDimensions,
      marginRight: 15,
      tintColor: appTextColor
   },
   logo: {
      width: 80,
      resizeMode: 'contain'
   },
   nullNode: {
      marginRight: 15,
      ...appIconDimensions
   }
});
