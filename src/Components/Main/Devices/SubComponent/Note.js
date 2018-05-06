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

class Note extends Component {
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
                     <Text style={styles.label}>Ngày mua</Text>
                  </View>
                  <View style={styles.valueContainer}>
                     <Text style={styles.value}>{device.ngay_mua}</Text>
                  </View>
               </View>
               <View style={styles.formGroup}>
                  <View style={styles.labelContainer}>
                     <Text style={styles.label}>Số hóa đơn</Text>
                  </View>
                  <View style={styles.valueContainer}>
                     <Text style={styles.value}>{device.invoice_number}</Text>
                  </View>
               </View>
               <View style={styles.formGroup}>
                  <View style={styles.labelContainer}>
                     <Text style={styles.label}>Ngày hóa đơn</Text>
                  </View>
                  <View style={styles.valueContainer}>
                     <Text style={styles.value}>{device.invoice_date}</Text>
                  </View>
               </View>
               <View style={styles.formGroup}>
                  <View style={styles.labelContainer}>
                     <Text style={styles.label}>Thời gian bảo hành</Text>
                  </View>
                  <View style={styles.valueContainer}>
                     <Text style={styles.value}>{device.guarantee}</Text>
                  </View>
               </View>
               <View style={styles.formGroup}>
                  <View style={styles.labelContainer}>
                     <Text style={styles.label}>Thời gian khấu hao</Text>
                  </View>
                  <View style={styles.valueContainer}>
                     <Text style={styles.value}>{device.depreciation}</Text>
                  </View>
               </View>
               <View style={styles.formGroup}>
                  <View style={styles.labelContainer}>
                     <Text style={styles.label}>Người sử dụng</Text>
                  </View>
                  <View style={styles.valueContainer}>
                     <Text style={styles.value}>{device.fullname}</Text>
                  </View>
               </View>
               <View style={styles.formGroup}>
                  <View style={styles.labelContainer}>
                     <Text style={styles.label}>Văn phòng</Text>
                  </View>
                  <View style={styles.valueContainer}>
                     <Text style={styles.value}>{device.office_id}</Text>
                  </View>
               </View>
               <View style={styles.formGroup}>
                  <View style={styles.labelContainer}>
                     <Text style={styles.label}>Dự án</Text>
                  </View>
                  <View style={styles.valueContainer}>
                     <Text style={styles.value}>{device.project_code}</Text>
                  </View>
               </View>
            </ScrollView>
         </Animated.View>
      );
   }
}

export default Note;

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
