import React, { Component } from 'react';
import { 
   View,
   Image,
   StyleSheet, 
   Dimensions,
} from 'react-native';
import { 
   appColor
} from '../../Configs/Constants';
import logoCPM from '../../Media/Image/logo-white.png';

const { width } = Dimensions.get('window');

class Splash extends Component {

   render() {
      return (
         <View style={styles.container}>
            <Image source={logoCPM} style={styles.logo} />
         </View>
      );
   }
}

export default Splash;

const styles = StyleSheet.create({
   container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: appColor
   },
   logo: {
      width: width * 0.8,
      resizeMode: 'contain',
   }
});
