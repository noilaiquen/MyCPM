import React from 'react';
import { Image, TouchableOpacity, StyleSheet, View, Text, Dimensions } from 'react-native';
import avatarIcon from '../../../../Media/Icon/avatar.png';
import { cpmRed, appFont } from '../../../../Configs/Constants';

const { width, height } = Dimensions.get('window');

const RenderItems = (staffs, navigation) => (
   <TouchableOpacity
      style={styles.staffItem}
      onPress={() => navigation.navigate('StaffInfo')}
   >
      <Image
         source={avatarIcon}
         style={styles.avatar}
      />
      <View style={styles.staffInfo}>
         <Text style={styles.staffFullname}>{staffs.fullname}</Text>
         <Text style={styles.staffPhone}>{staffs.telephone}</Text>
         <Text style={styles.staffPhone}>{staffs.email}</Text>
      </View>
   </TouchableOpacity>
);

export default RenderItems;

const styles = StyleSheet.create({
   staffItem: {
      flexDirection: 'row',
      width,
      height: height * 0.15,
      alignItems: 'center'
   },
   avatar: {
      height: 80,
      width: 80,
      resizeMode: 'contain',
      tintColor: '#bdc3c7'
   },
   staffInfo: {
      width: '100%',
      height: '100%',
      borderColor: '#E0E0E0',
      borderBottomWidth: 0.5,
      marginLeft: 10,
      justifyContent: 'center'
   },
   staffFullname: {
      fontFamily: appFont,
      fontSize: 16,
      color: cpmRed
   },
   staffPhone: {
      fontFamily: appFont,
   }
});
