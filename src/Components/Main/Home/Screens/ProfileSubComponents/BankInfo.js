import React from 'react';
import { View, Text } from 'react-native';
import Panel from '../../../../Common/Panel';
import styles from './styles';

const BankInfo = ({ passProps }) => (
   <Panel title="TÀI KHOẢN NGÂN HÀNG" iconTitle={'logo-usd'}>
      <View style={styles.formGroup}>
         <View style={styles.labelContainer}>
            <Text style={styles.label}>Chủ tài khoản</Text>
         </View>
         <View style={styles.valueContainer}>
            {passProps.inputText('p_bank_holder', 'Nhập...')}
         </View>
      </View>
      <View style={styles.formGroup}>
         <View style={styles.labelContainer}>
            <Text style={styles.label}>Số tài khoản</Text>
         </View>
         <View style={styles.valueContainer}>
            {passProps.inputText('p_bank_number', 'Nhập...')}
         </View>
      </View>
      <View style={styles.formGroup}>
         <View style={styles.labelContainer}>
            <Text style={styles.label}>Ngân hàng/Chi nhánh</Text>
         </View>
         <View style={styles.valueContainer}>
            {passProps.inputText('p_bank_name', 'Nhập...')}
         </View>
      </View>
   </Panel>
);

export default BankInfo;
