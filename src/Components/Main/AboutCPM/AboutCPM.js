import React, { Component } from 'react';
import { View, WebView, ActivityIndicator, Image, TouchableOpacity } from 'react-native';
import menuLeftIcon from '../../../Media/Icon/back.png';
import { appColor, appIconDimensions } from '../../../Configs/Constants';

class AboutCPM extends Component {
   renderLoading() {
      return <ActivityIndicator />;
   }

   render() {
      return (
         <View style={{ flex: 1 }} >
            <View style={{ height: 30, backgroundColor: appColor }}>
               <TouchableOpacity
                  style={{ height: 30, backgroundColor: appColor }}
                  onPress={() => this.props.navigation.navigate('DrawerOpen')}
               >
                  <Image source={menuLeftIcon} style={{ ...appIconDimensions, marginLeft: 15 }} />
               </TouchableOpacity>
            </View>
            <WebView
               renderLoading={() => this.renderLoading()}
               source={{ uri: 'https://cpm-vietnam.com/' }}
            />
         </View>
      );
   }
}

export default AboutCPM;
