import React, { Component } from 'react';
import { View, Text, TouchableWithoutFeedback } from 'react-native';
import Panel from '../../../../Common/Panel';
import styles from './styles';
import { locationsFindItem } from './../../../../../Storage/LocationHelper';
import ModalCustom from '../../../../Common/Modal';
import { ProvinceList, DistrictList, WardList } from '../../../../Common/Locations';

const modalTitles = {
   province: 'Tỉnh Thành',
   district: 'Quận/Huyện',
   ward: 'Phường/Xã'
};

class CurrentResidenceInfo extends Component {
   constructor(props) {
      super(props);
      this.state = {
         listType: 'province',
         selectedProvince: null,
         selectedDistrict: null,
         selectedWard: null,
      };
   }

   componentWillMount() {
      this.locationHandle();
   }

   locationHandle() {
      const { p_so_province_id, p_so_district_id, p_so_ward_id } = this.props.passProps.profileInfo;
      this.setState({
         selectedProvince: locationsFindItem('province', p_so_province_id)[0],
         selectedDistrict: locationsFindItem('district', p_so_district_id)[0],
         selectedWard: locationsFindItem('ward', p_so_ward_id)[0]
      });
   }

   renderList() {
      const { handleState } = this.props.passProps;
      const { listType, selectedDistrict, selectedProvince } = this.state;
      switch (listType) {
         case 'district':
            return (
               <DistrictList
                  parentId={selectedProvince ? selectedProvince.province_id : 0}
                  onSelectItem={item => this.setState({
                     selectedDistrict: item,
                     selectedWard: null
                  }, () => {
                     handleState('p_so_district_id', item.district_id);
                     this.modal.hide();
                  })}
               />
            );
         case 'ward':
            return (
               <WardList
                  parentId={selectedDistrict ? selectedDistrict.district_id : 0}
                  onSelectItem={item => this.setState({
                     selectedWard: item
                  }, () => {
                     handleState('p_so_ward_id', item.ward_id);
                     this.modal.hide();
                  })}
               />
            );
         default:
            return (
               <ProvinceList
                  onSelectItem={item => this.setState({
                     selectedProvince: item,
                     selectedDistrict: null,
                     selectedWard: null
                  }, () => {
                     handleState('p_so_province_id', item.province_id);
                     this.modal.hide();
                  })}
               />
            );
      }
   }

   render() {
      const {
         inputText,
      } = this.props.passProps;
      
      const { selectedDistrict, selectedProvince, selectedWard } = this.state;

      return (
         <Panel title="NƠI Ở HIỆN TẠI" iconTitle={'ios-home-outline'}>
            <View style={styles.formGroup}>
               <View style={styles.labelContainer}>
                  <Text style={styles.label}>Địa chỉ</Text>
               </View>
               <View style={styles.valueContainer}>
                  {inputText('p_so_address', 'Nhập...')}
               </View>
            </View>

            <View style={styles.formGroup}>
               <View style={styles.labelContainer}>
                  <Text style={styles.label}>Tỉnh/TP</Text>
               </View>
               <TouchableWithoutFeedback
                  onPress={() => this.setState({
                     listType: 'province'
                  }, () => this.modal.show())}
               >
                  <View style={styles.valueContainer}>   
                     <Text style={styles.label}>
                        {selectedProvince ? selectedProvince.province_name : 'Chọn'}
                     </Text>
                  </View>
               </TouchableWithoutFeedback>
            </View>

            <View style={styles.formGroup}>
               <View style={styles.labelContainer}>
                  <Text style={styles.label}>Quận/Huyện</Text>
               </View>
               <TouchableWithoutFeedback
                  onPress={() => this.setState({
                     listType: 'district'
                  }, () => this.modal.show())}
               >
                  <View style={styles.valueContainer}>   
                     <Text style={styles.label}>
                        {selectedDistrict ? selectedDistrict.district_name : 'Chọn'}
                     </Text>
                  </View>
               </TouchableWithoutFeedback>
            </View>

            <View style={styles.formGroup}>
               <View style={styles.labelContainer}>
                  <Text style={styles.label}>Phường/Xã</Text>
               </View>
               <TouchableWithoutFeedback
                  onPress={() => this.setState({
                     listType: 'ward'
                  }, () => this.modal.show())}
               >
                  <View style={styles.valueContainer}>   
                     <Text style={styles.label}>
                        {selectedWard ? selectedWard.ward_name : 'Chọn'}
                     </Text>
                  </View>
               </TouchableWithoutFeedback>
            </View>

            <ModalCustom
               ref={ref => this.modal = ref}
               height={350}
               title={modalTitles[this.state.listType]}
            >
               {this.renderList()}
            </ModalCustom>
         </Panel>
      );
   }
}

export default CurrentResidenceInfo;
