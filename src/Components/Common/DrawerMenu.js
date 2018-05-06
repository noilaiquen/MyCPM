import React, { Component } from 'react';
import {
   View, StyleSheet, Text, Dimensions, Image, TouchableOpacity
} from 'react-native';
import { DrawerItems } from 'react-navigation';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { appTextColor, IMAGE_URL, appFont, appColor } from '../../Configs/Constants';

import { logout } from '../../Redux/Action/AuthAction';

import Logo from '../../Media/Image/logo-white.png';
import Avatar from '../../Media/Icon/avatar.png';

const { width, height } = Dimensions.get('window');

class DrawerMenu extends Component {
   render() {
      const {
         wrapper, listItem, menuItem, btnLogOut,
         footerInfo, logoCenter,
         avatarCenter, footer, footerContainer,
         textLogOut, textUsername, header,
         menuLastItem
      } = Styles;
      const { fullname, image, username } = this.props.userInfo;
      const avatarImg = (image !== '') ? { uri: `${IMAGE_URL}${username}/${image}` } : Avatar;
      const countRoute = this.props.items.length;

      return (
         <View style={wrapper}>
            <View style={header}>
               <Image source={Logo} style={logoCenter} />
            </View>
            <View style={listItem}>
               <DrawerItems
                  {...this.props}
                  renderIcon={() => (null)} // cho hàm renderIcon mặt định render rỗng
                  getLabel={scene => {
                     const { tintColor } = scene;
                     return (
                        <View style={(scene.index === (countRoute - 1)) ? menuLastItem : menuItem} >
                           {this.props.renderIcon(scene)}
                           <Text
                              style={{
                                 color: tintColor,
                                 fontSize: 16,
                                 fontFamily: appFont,
                                 marginLeft: 15
                              }}
                           >
                              {this.props.getLabel(scene)}
                           </Text>
                        </View>
                     );
                  }}
               />
            </View>

            <View style={footer} >
               <View style={footerContainer}>
                  <View style={footerInfo}>
                     <TouchableOpacity style={btnLogOut} onPress={() => this.props.logout()} >
                        <Text style={textLogOut}>Đăng xuất</Text>
                     </TouchableOpacity>
                     <Text style={textUsername}>{fullname}</Text>
                  </View>
                  <Image source={avatarImg} style={avatarCenter} />
               </View>
            </View>
         </View>
      );
   }
}

const mapStateToProps = ({ AppState }) => {
   const { userInfo } = AppState;
   return {
      userInfo
   };
};

const mapDispatchToProps = dispatch => (
   bindActionCreators({ logout }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(DrawerMenu);

const Styles = StyleSheet.create({
   wrapper: {
      flex: 1,
      flexDirection: 'column',
      alignItems: 'center',
      backgroundColor: appColor
   },
   header: {
      flex: 2,
      width: '60%',
      justifyContent: 'center'
   },
   logoCenter: {
      width: '100%',
      resizeMode: 'contain'
   },
   listItem: {
      flex: 6.5,
      width: '90%'
   },
   footer: {
      flex: 1.5,
      width: '90%'
   },
   footerContainer: {
      flexDirection: 'row',
      height: '100%',
      borderColor: '#424242',
      borderTopWidth: 0.5,
      justifyContent: 'space-between',
      alignItems: 'center'
   },
   avatarCenter: {
      resizeMode: 'cover',
      width: width * 0.15,
      height: width * 0.15,
      borderRadius: width * 0.075
   },
   footerInfo: {
      width: '70%',
      justifyContent: 'space-between'
   },
   menuItem: {
      flexDirection: 'row',
      width: '100%',
      height: height * 0.08,
      borderColor: '#424242',
      borderBottomWidth: 0.5,
      alignItems: 'center'
   },
   menuLastItem: {
      flexDirection: 'row',
      width: '100%',
      height: height * 0.08,
      alignItems: 'center'
   },
   /* userLabel: {
      color: '#FFF',
      fontSize: 18,
      textShadowColor: appColor,
      textShadowOffset: {
         width: 1,
         height: 1
      },
      textShadowRadius: 4
   }, */
   btnLogOut: {
      flexDirection: 'row'
   },
   textLogOut: {
      color: appTextColor,
      fontSize: 16,
      fontFamily: appFont,
      marginBottom: 10
   },
   textUsername: {
      color: '#99938d',
      fontSize: 13,
      fontFamily: appFont
   },
   textEmail: {
      color: '#99938d',
      fontSize: 13,
      fontFamily: appFont
   }
});
