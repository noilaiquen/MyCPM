import React, { Component } from 'react';
import {
   View,
   Text,
   ScrollView,
   StyleSheet,
   Dimensions,
   Animated
} from 'react-native';

import {
   appColor,
   appFont
} from '../../../../Configs/Constants';

const { height } = Dimensions.get('window');

class Info extends Component {
   constructor(props) {
      super(props);
      this.state = {
         fadeInAnim: new Animated.Value(0)
      };
   }

   componentDidMount() {
      this.animatedScreen();
   }

   animatedScreen() {
      Animated.timing(
         this.state.fadeInAnim, {
            toValue: 1,
            duration: 300,
            useNativeDriver: true
         }
      ).start();
   }

   render() {
      const { device } = this.props;
      const { fadeInAnim } = this.state;

      return (
         <Animated.View
            style={[ styles.container,
               {
                  opacity: fadeInAnim
               }
            ]}
         >
            <ScrollView>
               <View style={styles.formGroup}>
                  <View style={styles.labelContainer}>
                     <Text style={styles.label}>ID</Text>
                  </View>
                  <View style={styles.valueContainer}>
                     <Text style={styles.value}>{device.device_id}</Text>
                  </View>
               </View>
               <View style={styles.formGroup}>
                  <View style={styles.labelContainer}>
                     <Text style={styles.label}>Tên thiết bị</Text>
                  </View>
                  <View style={styles.valueContainer}>
                     <Text style={styles.value}>{device.device_name}</Text>
                  </View>
               </View>
               <View style={styles.formGroup}>
                  <View style={styles.labelContainer}>
                     <Text style={styles.label}>Mã thiết bị</Text>
                  </View>
                  <View style={styles.valueContainer}>
                     <Text style={styles.value}>{device.device_code}</Text>
                  </View>
               </View>
               <View style={styles.formGroup}>
                  <View style={styles.labelContainer}>
                     <Text style={styles.label}>Loại thiết bị</Text>
                  </View>
                  <View style={styles.valueContainer}>
                     <Text style={styles.value}>{device.device_type}</Text>
                  </View>
               </View>
               <View style={styles.formGroup}>
                  <View style={styles.labelContainer}>
                     <Text style={styles.label}>Model</Text>
                  </View>
                  <View style={styles.valueContainer}>
                     <Text style={styles.value}>{device.model}</Text>
                  </View>
               </View>
               <View style={styles.formGroup}>
                  <View style={styles.labelContainer}>
                     <Text style={styles.label}>Serial</Text>
                  </View>
                  <View style={styles.valueContainer}>
                     <Text style={styles.value}>{device.serial}</Text>
                  </View>
               </View>
               <View style={styles.formGroup}>
                  <View style={styles.labelContainer}>
                     <Text style={styles.label}>IMEI</Text>
                  </View>
                  <View style={styles.valueContainer}>
                     <Text style={styles.value}>{device.imei}</Text>
                  </View>
               </View>
               <View style={styles.formGroup}>
                  <View style={styles.labelContainer}>
                     <Text style={styles.label}>Giá tiền</Text>
                  </View>
                  <View style={styles.valueContainer}>
                     <Text style={styles.value}>{device.price}</Text>
                  </View>
               </View>
               <View style={styles.formGroup}>
                  <View style={styles.labelContainer}>
                     <Text style={styles.label}>Thương hiệu</Text>
                  </View>
                  <View style={styles.valueContainer}>
                     <Text style={styles.value}>{device.brand}</Text>
                  </View>
               </View>
               <View style={styles.formGroup}>
                  <View style={styles.labelContainer}>
                     <Text style={styles.label}>Nhà cung cấp</Text>
                  </View>
                  <View style={styles.valueContainer}>
                     <Text style={styles.value}>{device.manufacture_id}</Text>
                  </View>
               </View>
               <View style={styles.formGroup}>
                  <View style={styles.labelContainer}>
                     <Text style={styles.label}>Mô tả</Text>
                  </View>
                  <View style={styles.valueContainer}>
                     <Text style={styles.value}>{device.device_description}</Text>
                  </View>
               </View>
            </ScrollView>
         </Animated.View>
      );
   }
}

export default Info;

const styles = StyleSheet.create({
   container: {
      flex: 1,
      padding: 10,
      backgroundColor: '#FFF',
      justifyContent: 'center',
      alignItems: 'center'
   },
   formGroup: {
      flexDirection: 'row',
      alignItems: 'center',
      height: height * 0.07,
      borderBottomColor: '#F5F5F5',
      borderBottomWidth: 0.5
   },
   labelContainer: {
      width: '40%'
   },
   label: {
      fontFamily: appFont,
      fontSize: 16,
      color: appColor
   },
   valueContainer: {
      width: '60%'
   },
   value: {
      fontFamily: appFont,
      fontSize: 16
   },
});