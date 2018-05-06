import React, { Component } from 'react';
import {
   Modal, View, StyleSheet,
   Dimensions, TouchableOpacity, Text,
   Animated
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { cpmRed, appFont } from '../../Configs/Constants';

const screen = Dimensions.get('window');

export default class ModalCustom extends Component {
   constructor(props) {
      super(props);
      this.springValue = new Animated.Value(0.1);
      this.state = {
         isModalVisible: false
      };
   }

   show() {
      this.setState({
         isModalVisible: true
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

   hide() {
      this.setState({
         isModalVisible: false
      });
   }

   render() {
      return (
         <Modal
            visible={this.state.isModalVisible}
            animationType={'none'}
            transparent
            onRequestClose={() => (null)}
         >
            <View style={styles.modalWrapper}>
               <Animated.View
                  style={[
                     styles.modalContainer,
                     {
                        width: this.props.width ? this.props.width : 300,
                        height: this.props.height ? this.props.height : 250,
                        transform: [{ scale: this.springValue }]
                     }
                  ]}
               >
                  <View style={styles.modalHeader}>
                     <Text style={styles.headerText}>{this.props.title ? this.props.title : 'Header Title'}</Text>
                     <TouchableOpacity onPress={() => this.hide()}>
                        <Icon name="ios-close-circle-outline" size={30} color={'#FFF'} />
                     </TouchableOpacity>
                  </View>
                  <View>
                     {this.props.children}
                  </View>
               </Animated.View>
            </View>
         </Modal>
      );
   }
}

const styles = StyleSheet.create({
   modalWrapper: {
      width: screen.width,
      height: screen.height,
      backgroundColor: 'rgba(0,0,0,0.3)',
      justifyContent: 'center',
      alignItems: 'center'
   },
   modalContainer: {
      backgroundColor: '#FFF',
      borderRadius: 5,
      elevation: 3
   },
   modalHeader: {
      flexDirection: 'row',
      width: '100%',
      height: 40,
      backgroundColor: cpmRed,
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: 10,
      borderTopLeftRadius: 5,
      borderTopRightRadius: 5
   },
   headerText: {
      color: '#FFF',
      fontSize: 16,
      fontFamily: appFont
   }
});
