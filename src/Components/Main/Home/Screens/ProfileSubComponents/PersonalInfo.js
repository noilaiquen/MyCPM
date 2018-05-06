import React, { Component } from 'react';
import { View, Text, TouchableWithoutFeedback, TouchableOpacity } from 'react-native';
import Panel from '../../../../Common/Panel';
import styles from './styles';
import ModalCustom from '../../../../Common/Modal';

const genders = [{
   value: 1,
   title: 'Nam'
}, {
   value: 2,
   title: 'Nữ'
}];

export default class PersonalInfo extends Component {
   constructor(props) {
      super(props);
      this.state = {
         genderSelected: null
      };
   }

   componentWillMount() {
      const { gender } = this.props.passProps.profileInfo;
      this.setState({
         genderSelected: genders.filter(item => item.value == gender)[0]
      });
   }

   render() {
      const { passProps } = this.props;
      const { genderSelected } = this.state;

      return (
         <Panel title="THÔNG TIN CÁ NHÂN" iconTitle={'ios-information-circle-outline'}>
            <View style={styles.formGroup}>
               <View style={styles.labelContainer}>
                  <Text style={styles.label}>Tên đăng nhập</Text>
               </View>
               <View style={styles.valueContainer}>
                  <Text style={styles.value}>{passProps.userInfo.username}</Text>
               </View>
            </View>
            <View style={styles.formGroup}>
               <View style={styles.labelContainer}>
                  <Text style={styles.label}>Mã nhân viên</Text>
               </View>
               <View style={styles.valueContainer}>
                  <Text style={styles.value}>{passProps.userInfo.usercode}</Text>
               </View>
            </View>
            <View style={styles.formGroup}>
               <View style={styles.labelContainer}>
                  <Text style={styles.label}>Email</Text>
               </View>
               <View style={styles.valueContainer}>
                  <Text style={styles.value}>{passProps.userInfo.email}</Text>
               </View>
            </View>
            <View style={styles.formGroup}>
               <View style={styles.labelContainer}>
                  <Text style={styles.label}>Họ và tên</Text>
               </View>
               <View style={styles.valueContainer}>
                  {passProps.inputText('fullname', 'Nhâp...')}
               </View>
            </View>
            <View style={styles.formGroup}>
               <View style={styles.labelContainer}>
                  <Text style={styles.label}>Số điện thoại</Text>
               </View>
               <View style={styles.valueContainer}>
                  {passProps.inputText('telephone', 'Nhâp...', 'numeric')}
               </View>
            </View>
            <View style={styles.formGroup}>
               <View style={styles.labelContainer}>
                  <Text style={styles.label}>Giới tính</Text>
               </View>
               <TouchableWithoutFeedback
                  onPress={() => this.modal.show()}
               >
                  <View style={styles.valueContainer}>
                     <Text style={styles.label}>
                        {genderSelected ? genderSelected.title : 'Chọn'}
                     </Text>
                  </View>
               </TouchableWithoutFeedback>
            </View>
            <View style={styles.formGroup}>
               <View style={styles.labelContainer}>
                  <Text style={styles.label}>Ngày sinh</Text>
               </View>
               <View style={styles.valueContainer}>
                  {passProps.inputDatePicker('p_birthday')}
               </View>
            </View>
            <View style={styles.formGroup}>
               <View style={styles.labelContainer}>
                  <Text style={styles.label}>Nơi sinh</Text>
               </View>
               <View style={styles.valueContainer}>
                  {passProps.inputText('p_place_of_birth', 'Nhâp...')}
               </View>
            </View>
            <View style={styles.formGroup}>
               <View style={styles.labelContainer}>
                  <Text style={styles.label}>Dân tộc</Text>
               </View>
               <View style={styles.valueContainer}>
                  {passProps.inputText('p_nation', 'Nhâp...')}
               </View>
            </View>
            <View style={styles.formGroup}>
               <View style={styles.labelContainer}>
                  <Text style={styles.label}>Quốc tịch</Text>
               </View>
               <View style={styles.valueContainer}>
                  <Text style={styles.value}>Việt Nam</Text>
               </View>
            </View>

            <ModalCustom
               ref={ref => this.modal = ref}
               height={200}
               title={'Giới tính'}
            >
               {genders.map(gender => (
                  <TouchableOpacity
                     key={gender.value}
                     style={styles.listItem}
                     onPress={() => this.setState({
                        genderSelected: gender
                     }, () => {
                        passProps.handleState('gender', gender.value);
                        this.modal.hide();
                     })}
                  >
                     <Text style={styles.listItemLabel}>{gender.title}</Text>
                  </TouchableOpacity>
               ))}
            </ModalCustom>
         </Panel>
      );
   }
}
