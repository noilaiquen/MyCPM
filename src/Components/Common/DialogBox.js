import React, { Component } from 'react';
import {
   View, StyleSheet,
   TouchableOpacity, Text,
   Animated, Modal
} from 'react-native';
import { cpmRed, appFont, appColor } from '../../Configs/Constants';

export default class DialogBox extends Component {
   constructor(props) {
      super(props);
      this.springValue = new Animated.Value(0.1);
      this.state = {
         isShow: false,
         message: 'Message',
         approveCb: null,
         rejectCb: null
      };
   }

   onApprove() {
      const { approveCb } = this.state;
      
      this.setState({
         isShow: false
      }, () => approveCb.onPress());
   }

   onReject() {
      const { rejectCb } = this.state;
      
      this.setState({
         isShow: false
      }, () => rejectCb.onPress());
   }

   show(message, callbacks) {
      this.setState({
         message,
         approveCb: callbacks[0],
         rejectCb: callbacks[1] !== undefined ? callbacks[1] : null,
         isShow: true
      }, () => {
         this.springValue.setValue(0.1);
         Animated.spring(
            this.springValue,
            {
               toValue: 1,
               friction: 6
            }
         ).start();
      });
   }

   render() {
      return (
         <Modal
            visible={this.state.isShow}
            animationType={'none'}
            transparent
            onRequestClose={() => (null)}
         >
            <View style={styles.wrapper}>
               <Animated.View style={[styles.container, { transform: [{ scale: this.springValue }] }]}>
                  <View style={styles.content}>
                     <View style={styles.contentContainer}>   
                        <Text style={[styles.btnText, { color: appColor, fontSize: 17 }]}>{this.state.message}</Text>
                     </View>

                     <View style={styles.btnContainer}>
                        <TouchableOpacity
                           style={styles.btn}
                           onPress={() => this.onApprove()}
                        >
                           <Text style={[styles.btnText, { color: '#FFF' }]}>{this.state.approveCb ? this.state.approveCb.text : 'Ok'}</Text>
                        </TouchableOpacity>

                        {this.state.rejectCb && (
                           <TouchableOpacity
                              style={styles.btnOutline}
                              onPress={() => this.onReject()}
                           >
                              <Text style={[styles.btnText, { color: cpmRed }]}>{this.state.rejectCb.text}</Text>
                           </TouchableOpacity>
                        )}
                     </View>
                  </View>
               </Animated.View>
            </View>
         </Modal>
      );
   }
}

const styles = StyleSheet.create({
   wrapper: {
      position: 'absolute',
      zIndex: 1,
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      backgroundColor: 'rgba(0,0,0,0.3)',
      justifyContent: 'center',
      alignItems: 'center'
   },
   container: {
      backgroundColor: '#FFF',
      borderRadius: 5,
      elevation: 3,
      width: 250,
      height: 180
   },
   header: {
      width: '100%',
      height: 40,
      backgroundColor: cpmRed,
      // backgroundColor: cpmRed,
      justifyContent: 'center',
      paddingHorizontal: 10,
      borderTopLeftRadius: 5,
      borderTopRightRadius: 5
   },
   content: {
      flex: 1,
      alignItems: 'center',
      paddingHorizontal: 10
   },
   headerText: {
      color: '#FFF',
      fontSize: 16,
      fontFamily: appFont
   },
   contentContainer: {
      flex: 2,
      width: '100%',
      alignItems: 'center',
      justifyContent: 'center'
   },
   btnContainer: {
      flex: 3,
      width: '100%',
      alignItems: 'center',
      justifyContent: 'space-around',
      paddingVertical: 5
   },
   btn: {
      width: '100%',
      height: 40,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: cpmRed,
      borderRadius: 5
   },
   btnOutline: {
      width: '100%',
      height: 40,
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth: 0.5,
      borderColor: cpmRed,
      borderRadius: 5
   },
   btnText: {
      fontFamily: appFont,
      fontSize: 16
   }
});
