import React, { Component } from 'react';
import {
   Text,
   ScrollView,
   StyleSheet,
   View,
   Dimensions,
   Image
} from 'react-native';
import {
   appColor,
   appFont,
   IMAGE_URL
} from '../../../../Configs/Constants';
import Panel from '../../../Common/Panel';
import { findValueDB } from '../../../../Storage/DBHelper';
import logoImg from '../../../../Media/Icon/cpm-icon-white.png'

const { height } = Dimensions.get('window');

class StaffInfo extends Component {
   constructor(props) {
      super(props);
      this.state = {
         p_re_province_name: 'None',
         p_re_district_name: 'None',
         p_re_ward_name: 'None',
         p_so_province_name: 'None',
         p_so_district_name: 'None',
         p_so_ward_name: 'None',
         images: {}
      };
   }

   componentDidMount() {
      const { staff } = this.props.navigation.state.params;

      let p_re_province_name = 'None';
      let p_re_district_name = 'None';
      let p_re_ward_name = 'None';

      let p_so_province_name = 'None';
      let p_so_district_name = 'None';
      let p_so_ward_name = 'None';

      if (staff.p_so_district_id !== '') {
         p_so_district_name = findValueDB('LocalDistricts', 'district_id', Number(staff.p_so_district_id), 'district_name');
      }
      if (staff.p_re_ward_id !== '') {
         p_so_ward_name = findValueDB('LocalWards', 'ward_id', Number(staff.p_re_ward_id), 'ward_name');
      }

      const images = JSON.parse(staff.images);

      this.setState({
         p_re_province_name,
         p_re_district_name,
         p_re_ward_name,
         p_so_province_name,
         p_so_district_name,
         p_so_ward_name,
         images
      });
   }

   render() {
      const { staff } = this.props.navigation.state.params;
      const {
         front_identity_card,
         back_identity_card,
         portrait,
         signature
      } = this.state.images;

      const portraitImage = (portrait !== '') ? { uri: `${IMAGE_URL}${staff.username}/${portrait}` } : logoImg;
      const frontIdentityCardImage = (front_identity_card !== '') ? { uri: `${IMAGE_URL}${staff.username}/${front_identity_card}` } : logoImg;
      const backIdentityCardImage = (back_identity_card !== '') ? { uri: `${IMAGE_URL}${staff.username}/${back_identity_card}` } : logoImg;
      const signatureImage = (signature !== '') ? { uri: `${IMAGE_URL}${staff.username}/${signature}` } : logoImg;
      return (
         <ScrollView style={styles.container}>
            <Panel title="THÔNG TIN CÁ NHÂN" iconTitle={'ios-information-circle-outline'}>
               <View style={styles.formGroup}>
                  <View style={styles.labelContainer}>
                     <Text style={styles.label}>Họ và tên</Text>
                  </View>
                  <View style={styles.valueContainer}>
                     <Text style={styles.value}>{staff.fullname}</Text>
                  </View>
               </View>
               <View style={styles.formGroup}>
                  <View style={styles.labelContainer}>
                     <Text style={styles.label}>Tên đăng nhập</Text>
                  </View>
                  <View style={styles.valueContainer}>
                     <Text style={styles.value}>{staff.username}</Text>
                  </View>
               </View>
               <View style={styles.formGroup}>
                  <View style={styles.labelContainer}>
                     <Text style={styles.label}>Mã nhân viên</Text>
                  </View>
                  <View style={styles.valueContainer}>
                     <Text style={styles.value}>{staff.usercode}</Text>
                  </View>
               </View>
               <View style={styles.formGroup}>
                  <View style={styles.labelContainer}>
                     <Text style={styles.label}>Email</Text>
                  </View>
                  <View style={styles.valueContainer}>
                     <Text style={styles.value}>{staff.email}</Text>
                  </View>
               </View>
               <View style={styles.formGroup}>
                  <View style={styles.labelContainer}>
                     <Text style={styles.label}>Nơi làm việc</Text>
                  </View>
                  <View style={styles.valueContainer}>
                     <Text style={styles.value}>{'Hồ Chí Minh'}</Text>
                  </View>
               </View>
               <View style={styles.formGroup}>
                  <View style={styles.labelContainer}>
                     <Text style={styles.label}>Số điện thoại</Text>
                  </View>
                  <View style={styles.valueContainer}>
                     <Text style={styles.value}>{staff.telephone}</Text>
                  </View>
               </View>
               <View style={styles.formGroup}>
                  <View style={styles.labelContainer}>
                     <Text style={styles.label}>Ngày sinh</Text>
                  </View>
                  <View style={styles.valueContainer}>
                     <Text style={styles.value}>{staff.p_birthday}</Text>
                  </View>
               </View>
               <View style={styles.formGroup}>
                  <View style={styles.labelContainer}>
                     <Text style={styles.label}>Nơi sinh</Text>
                  </View>
                  <View style={styles.valueContainer}>
                     <Text style={styles.value}>{staff.p_place_of_birth}</Text>
                  </View>
               </View>
               <View style={styles.formGroup}>
                  <View style={styles.labelContainer}>
                     <Text style={styles.label}>Giới tính</Text>
                  </View>
                  <View style={styles.valueContainer}>
                     <Text style={styles.value}>{'Nam'}</Text>
                  </View>
               </View>
               <View style={styles.formGroup}>
                  <View style={styles.labelContainer}>
                     <Text style={styles.label}>Quốc tịch</Text>
                  </View>
                  <View style={styles.valueContainer}>
                     <Text style={styles.value}>{staff.p_nationality}</Text>
                  </View>
               </View>
               <View style={styles.formGroup}>
                  <View style={styles.labelContainer}>
                     <Text style={styles.label}>Dân tộc</Text>
                  </View>
                  <View style={styles.valueContainer}>
                     <Text style={styles.value}>{staff.p_nation}</Text>
                  </View>
               </View>
            </Panel>
            <Panel title="CMND/HỘ KHẨU" iconTitle={'ios-copy-outline'}>
               <View style={styles.formGroup}>
                  <View style={styles.labelContainer}>
                     <Text style={styles.label}>Số CMDN</Text>
                  </View>
                  <View style={styles.valueContainer}>
                     <Text style={styles.value}>{staff.p_identity_number}</Text>
                  </View>
               </View>
               <View style={styles.formGroup}>
                  <View style={styles.labelContainer}>
                     <Text style={styles.label}>Ngày cấp</Text>
                  </View>
                  <View style={styles.valueContainer}>
                     <Text style={styles.value}>{staff.p_identity_issue_date}</Text>
                  </View>
               </View>
               <View style={styles.formGroup}>
                  <View style={styles.labelContainer}>
                     <Text style={styles.label}>Nơi cấp</Text>
                  </View>
                  <View style={styles.valueContainer}>
                     <Text style={styles.value}>{staff.p_identity_issue_place}</Text>
                  </View>
               </View>
               <View style={styles.formGroup}>
                  <View style={styles.labelContainer}>
                     <Text style={styles.label}>Địa chỉ</Text>
                  </View>
                  <View style={styles.valueContainer}>
                     <Text style={styles.value}>{staff.p_bi_address}</Text>
                  </View>
               </View>
               <View style={styles.formGroup}>
                  <View style={styles.labelContainer}>
                     <Text style={styles.label}>Tỉnh/Thành Phố</Text>
                  </View>
                  <View style={styles.valueContainer}>
                     <Text style={styles.value}>{this.state.p_re_province_name}</Text>
                  </View>
               </View>
               <View style={styles.formGroup}>
                  <View style={styles.labelContainer}>
                     <Text style={styles.label}>Quận/Huyện</Text>
                  </View>
                  <View style={styles.valueContainer}>
                     <Text style={styles.value}>{this.state.p_re_district_name}</Text>
                  </View>
               </View>
               <View style={styles.formGroup}>
                  <View style={styles.labelContainer}>
                     <Text style={styles.label}>Phường/Xã</Text>
                  </View>
                  <View style={styles.valueContainer}>
                     <Text style={styles.value}>{this.state.p_re_ward_name}</Text>
                  </View>
               </View>
            </Panel>
            <Panel title="NƠI Ở HIỆN TẠI" iconTitle={'ios-home-outline'}>
               <View style={styles.formGroup}>
                  <View style={styles.labelContainer}>
                     <Text style={styles.label}>Địa chỉ</Text>
                  </View>
                  <View style={styles.valueContainer}>
                     <Text style={styles.value}>{staff.p_so_address}</Text>
                  </View>
               </View>
               <View style={styles.formGroup}>
                  <View style={styles.labelContainer}>
                     <Text style={styles.label}>Tỉnh/Thành Phố</Text>
                  </View>
                  <View style={styles.valueContainer}>
                     <Text style={styles.value}>{this.state.p_so_province_name}</Text>
                  </View>
               </View>
               <View style={styles.formGroup}>
                  <View style={styles.labelContainer}>
                     <Text style={styles.label}>Quận/Huyện</Text>
                  </View>
                  <View style={styles.valueContainer}>
                     <Text style={styles.value}>{this.state.p_so_district_name}</Text>
                  </View>
               </View>
               <View style={styles.formGroup}>
                  <View style={styles.labelContainer}>
                     <Text style={styles.label}>Phường/Xã</Text>
                  </View>
                  <View style={styles.valueContainer}>
                     <Text style={styles.value}>{this.state.p_so_ward_name}</Text>
                  </View>
               </View>
            </Panel>
            <Panel title="TÀI KHOẢN NGÂN HÀNG" iconTitle={'logo-usd'}>
               <View style={styles.formGroup}>
                  <View style={styles.labelContainer}>
                     <Text style={styles.label}>Chủ tài khoản</Text>
                  </View>
                  <View style={styles.valueContainer}>
                     <Text style={styles.value}>{staff.p_bank_holder}</Text>
                  </View>
               </View>
               <View style={styles.formGroup}>
                  <View style={styles.labelContainer}>
                     <Text style={styles.label}>Số tài khoản</Text>
                  </View>
                  <View style={styles.valueContainer}>
                     <Text style={styles.value}>{staff.p_bank_number}</Text>
                  </View>
               </View>
               <View style={styles.formGroup}>
                  <View style={styles.labelContainer}>
                     <Text style={styles.label}>Chi nhánh</Text>
                  </View>
                  <View style={styles.valueContainer}>
                     <Text style={styles.value}>{staff.p_bank_name}</Text>
                  </View>
               </View>
            </Panel>
            <Panel title="THÔNG TIN KHAI SINH" iconTitle={'ios-list-box-outline'}>
               <View style={styles.formGroup}>
                  <View style={styles.labelContainer}>
                     <Text style={styles.label}>Tỉnh/Thành Phố</Text>
                  </View>
                  <View style={styles.valueContainer}>
                     <Text style={styles.value}>{'None'}</Text>
                  </View>
               </View>
               <View style={styles.formGroup}>
                  <View style={styles.labelContainer}>
                     <Text style={styles.label}>Quận/Huyện</Text>
                  </View>
                  <View style={styles.valueContainer}>
                     <Text style={styles.value}>{'None'}</Text>
                  </View>
               </View>
               <View style={styles.formGroup}>
                  <View style={styles.labelContainer}>
                     <Text style={styles.label}>Phường/Xã</Text>
                  </View>
                  <View style={styles.valueContainer}>
                     <Text style={styles.value}>{'None'}</Text>
                  </View>
               </View>
               <View style={styles.formGroup}>
                  <View style={styles.labelContainer}>
                     <Text style={styles.label}>Người giám hộ</Text>
                  </View>
                  <View style={styles.valueContainer}>
                     <Text style={styles.value}>{staff.p_protector}</Text>
                  </View>
               </View>
            </Panel>
            <Panel title="HÌNH ẢNH" iconTitle={'ios-images-outline'}>
               <View style={styles.imageContainer}>
                  <View style={styles.imageBox}>
                     <Image
                        source={portraitImage}
                        style={styles.image}
                     />
                     <Text>Chân dung</Text>
                  </View>
                  <View style={styles.imageBox}>
                     <Image
                        source={frontIdentityCardImage}
                        style={styles.image}
                     />
                     <Text>CMND mặt trước</Text>
                  </View>
                  <View style={styles.imageBox}>
                     <Image
                        source={backIdentityCardImage}
                        style={styles.image}
                     />
                     <Text>CMND mặt sau</Text>
                  </View>
                  <View style={styles.imageBox}>
                     <Image
                        source={signatureImage}
                        style={styles.image}
                     />
                     <Text>Chữ ký</Text>
                  </View>
               </View>
            </Panel>
         </ScrollView>
      );
   }
};

export default StaffInfo;

const styles = StyleSheet.create({
   container: {
      flex: 1
   },
   formGroup: {
      flexDirection: 'row',
      alignItems: 'center',
      borderColor: '#eee',
      borderBottomWidth: 0.3,
      height: height * 0.07
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
      fontSize: 16,
      // color: appTextColorHighLight
   },
   imageContainer: {
      justifyContent: 'space-around',
      flexDirection: 'row',
      flexWrap: 'wrap',
      alignItems: 'flex-start'
   },
   imageBox: {
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 10
   },
   image: {
      width: 170,
      height: 170,
      resizeMode: 'contain'
   }
});
