import React, { Component } from 'react';
import {
   ScrollView,
   TouchableOpacity,
   TextInput,
   Keyboard,
   DatePickerAndroid,
   ToastAndroid,
   Alert,
   View,
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Icon from 'react-native-vector-icons/Ionicons';
import PersonalInfo from './ProfileSubComponents/PersonalInfo';
import RegistrationInfo from './ProfileSubComponents/RegistrationInfo';
import CurrentResidenceInfo from './ProfileSubComponents/CurrentResidenceInfo';
import BirthInfo from './ProfileSubComponents/BirthInfo';
import BankInfo from './ProfileSubComponents/BankInfo';
import styles from './ProfileSubComponents/styles';
import Loading from '../../../Common/Loading';

import { appFont, appTextColor } from '../../../../Configs/Constants';
import { updateProfile, resetState } from '../../../../Redux/Action/ProfileAction';

class Profile extends Component {
   static navigationOptions = ({ navigation }) => ({
      headerRight: (
         <TouchableOpacity
            style={{ marginRight: 15 }}
            onPress={() => navigation.state.params.updateProfileInfo()}
         >
            <Icon name="ios-cloud-upload-outline" color={appTextColor} size={30} />
         </TouchableOpacity>
      )
   });

   constructor(props) {
      super(props);
      const { userInfo } = props;
      this.state = {
         profileInfo: {
            /* thông tin cá nhân*/
            user_id: userInfo.user_id,
            fullname: userInfo.fullname,
            email: userInfo.email,
            telephone: userInfo.telephone,
            p_birthday: userInfo.p_birthday,
            gender: userInfo.gender,
            p_place_of_birth: userInfo.p_place_of_birth,
            p_re_province_name: userInfo.p_re_province_name,
            p_nation: userInfo.p_nation,
            /* thông tin CMND */
            p_identity_number: userInfo.p_identity_number,
            p_identity_issue_date: userInfo.p_identity_issue_date,
            p_identity_issue_place: userInfo.p_identity_issue_place,
            /* thông tin thường trú */
            p_re_address: userInfo.p_re_address,
            p_re_province_id: userInfo.p_re_province_id,
            p_re_district_id: userInfo.p_re_district_id,
            p_re_ward_id: userInfo.p_re_ward_id,
            /* nơi ở hiện tại */
            p_so_address: userInfo.p_so_address,
            p_so_province_id: userInfo.p_so_province_id,
            p_so_district_id: userInfo.p_so_district_id,
            p_so_ward_id: userInfo.p_so_ward_id,
            /*thông tin khai sinh*/
            p_bi_province_id: userInfo.p_bi_province_id,
            p_bi_district_id: userInfo.p_bi_district_id,
            p_bi_ward_id: userInfo.p_bi_ward_id,
            p_protector: userInfo.p_protector,
            /*thông tin ngân hàng*/
            p_bank_holder: userInfo.p_bank_holder,
            p_bank_number: userInfo.p_bank_number,
            p_bank_name: userInfo.p_bank_name,
         }
      };

      this.handleState = this.handleState.bind(this);
      this.inputText = this.inputText.bind(this);
      this.inputDatePicker = this.inputDatePicker.bind(this);
      this.updateProfileInfo = this.updateProfileInfo.bind(this);
   }

   componentDidMount() {
      this.props.navigation.setParams({
         updateProfileInfo: this.updateProfileInfo
      });
   }

   componentWillReceiveProps(nextProps) {
      if (nextProps.message !== null) {
         Alert.alert('', nextProps.message, [
            { text: 'OK', onPress: () => this.props.resetState() }
         ]);
      }
   }

   updateProfileInfo() {
      const { profileInfo } = this.state;
      this.props.updateProfile(profileInfo);
   }

   handleState(key, value) {
      const newProfileInfo = this.state.profileInfo;
      newProfileInfo[key] = value;
      this.setState({ profileInfo: newProfileInfo });
   }

   inputText(key, hint, type = 'default') {
      return (
         <TextInput
            value={this.state.profileInfo[key]}
            style={styles.input}
            keyboardType={type}
            placeholder={hint}
            keyboardAppearance="dark"
            placeholderTextColor="#ddd"
            underlineColorAndroid="rgba(0,0,0,0)"
            onChangeText={text => this.handleState(key, text)}
         />
      );
   }

   inputDatePicker(key) {
      return (
         <TextInput
            defaultValue="0000-00-00"
            style={{ fontSize: 16, fontFamily: appFont }}
            value={this.state.profileInfo[key]}
            placeholderTextColor="#ddd"
            underlineColorAndroid="rgba(0,0,0,0)"
            onFocus={() => {
               Keyboard.dismiss();
               DatePickerAndroid.open({
                  date: new Date()
               }).then(({ year, month, day, action }) => {
                  if (action !== DatePickerAndroid.dismissedAction) {
                     const dateValue = `${year}-${month}-${day}`;
                     this.handleState(key, dateValue);
                  }
               }).catch(() => ToastAndroid.show('Cannot open date picker', ToastAndroid.LONG));
            }}
         />
      );
   }

   render() {
      const { userInfo, isLoading } = this.props;
      const passProps = {
         userInfo,
         profileInfo: this.state.profileInfo,
         handleState: this.handleState,
         inputDatePicker: this.inputDatePicker,
         inputText: this.inputText,
      };

      return (
         <View style={{ flex: 1 }}>
            <ScrollView>
               <PersonalInfo passProps={passProps} />
               <RegistrationInfo passProps={passProps} />
               <CurrentResidenceInfo passProps={passProps} />
               <BirthInfo passProps={passProps} />
               <BankInfo passProps={passProps} />
               {/*<Images passProps={passProps} />*/}
            </ScrollView>

            {/* Loading */}
            <Loading isShow={isLoading} />
         </View>
      );
   }
}

const mapStateToProps = ({ AppState, ProfileState }) => ({
   userInfo: AppState.userInfo,
   message: ProfileState.message,
   isLoading: ProfileState.isLoading,
   isError: ProfileState.isError
});

const mapDispatchToProps = dispatch => (
   bindActionCreators({ updateProfile, resetState }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(Profile);

