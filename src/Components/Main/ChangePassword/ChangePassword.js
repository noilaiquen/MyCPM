import React, { Component } from 'react';
import {
   View, Text, TextInput,
   StyleSheet, Dimensions, TouchableOpacity,
   ActivityIndicator, Alert, TouchableWithoutFeedback, Keyboard
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Icon from 'react-native-vector-icons/Ionicons';

import { changePassword, resetStateAction } from '../../../Redux/Action/AuthAction';
import { cpmRed, appTextColor, appFont, appColor } from '../../../Configs/Constants';

const { width, height } = Dimensions.get('window');

class ChangePassWord extends Component {

   constructor(props) {
      super(props);
      this.state = {
         oldPassword: null,
         newPassword: null,
         reNewPassword: null,
         errorMessage: null
      };
   }

   componentWillReceiveProps(nextProps) {
      const { message, isError } = nextProps;

      if (message) {
         Alert.alert(
            '', message,
            [
               {
                  text: 'OK',
                  onPress: () => {
                     if (isError) {
                        this.props.resetStateAction();
                     } else {
                        this.props.navigation.navigate('Home');
                     }
                  }
               },
            ],
            { cancelable: false }
         );
      }
   }

   onSubmit() {
      Keyboard.dismiss();
      const { oldPassword, newPassword, reNewPassword } = this.state;
      const { user_id } = this.props;

      if (!oldPassword || !newPassword || !reNewPassword) {
         this.setState({
            errorMessage: 'Mật khẩu không được để trống!'
         });
         return;
      }
      if (oldPassword === newPassword) {
         this.setState({
            errorMessage: 'Mật khẩu cũ và mới không được giống nhau!'
         });
         return;
      }
      if (newPassword !== reNewPassword) {
         this.setState({
            errorMessage: 'Hai mật khẩu mới không trùng khớp với nhau!'
         });
         return;
      }

      this.props.changePassword(user_id, oldPassword, newPassword);
   }

   render() {
      const { isLoading } = this.props;
      return (
         <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()} >
            <View style={styles.container}>
               <View style={styles.headerContainer}>
                  <TouchableOpacity style={styles.backIcon} onPress={() => this.props.navigation.goBack()}>
                     <Icon
                        name={'ios-arrow-round-back-outline'}
                        size={40}
                        color={appTextColor}
                     />
                  </TouchableOpacity>
                  <Text style={styles.title}>Đổi mật khẩu</Text>
                  <View />
               </View>

               <View style={styles.containerContent} >
                  <Text style={styles.errorMessage}>{this.state.errorMessage}</Text>
                  <TextInput
                     style={styles.input}
                     placeholder="Mật khẩu cũ"
                     secureTextEntry
                     returnKeyType="next"
                     keyboardAppearance="dark"
                     placeholderTextColor="#bdc3c7"
                     underlineColorAndroid="rgba(0,0,0,0)"
                     onSubmitEditing={() => this.passwordInput.focus()}
                     onFocus={() => this.setState({ errorMessage: null })}
                     onChangeText={text => this.setState({ oldPassword: text })}
                  />
                  <TextInput
                     style={styles.input}
                     placeholder="Mật khẩu mới"
                     secureTextEntry
                     returnKeyType="next"
                     keyboardAppearance="dark"
                     placeholderTextColor="#bdc3c7"
                     underlineColorAndroid="rgba(0,0,0,0)"
                     onFocus={() => this.setState({ errorMessage: null })}
                     onSubmitEditing={() => this.reNewPassword.focus()}
                     onChangeText={text => this.setState({ newPassword: text })}
                     ref={(input) => { this.passwordInput = input; }}
                  />
                  <TextInput
                     style={styles.input}
                     placeholder="Nhập lại mật khẩu mới"
                     secureTextEntry
                     returnKeyType="go"
                     keyboardAppearance="dark"
                     placeholderTextColor="#bdc3c7"
                     underlineColorAndroid="rgba(0,0,0,0)"
                     onFocus={() => this.setState({ errorMessage: null })}
                     onChangeText={text => this.setState({ reNewPassword: text })}
                     ref={(input) => { this.reNewPassword = input; }}
                     onSubmitEditing={() => this.onSubmit()}
                  />
                  <TouchableOpacity
                     style={styles.btnSubmit}
                     onPress={() => this.onSubmit()}
                  >
                     {isLoading ? (
                        <ActivityIndicator
                           animating
                           color={appTextColor}
                           size="large"
                        />
                     ) : (
                           <Text style={styles.btnLabel}>Đổi mật khẩu</Text>
                        )
                     }
                  </TouchableOpacity>
               </View>
            </View>
         </TouchableWithoutFeedback>
      );
   }
}

const mapStateToProps = ({ AppState, AuthState }) => {
   const { isLoading, isError, message } = AuthState;
   const { userInfo } = AppState;
   return {
      user_id: userInfo.user_id,
      isLoading,
      isError,
      message
   };
};

const mapDispatchToProps = dispatch => (
   bindActionCreators({ changePassword, resetStateAction }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(ChangePassWord);

const styles = StyleSheet.create({
   container: {
      flex: 1,
   },
   headerContainer: {
      flexDirection: 'row',
      // justifyContent: 'space-between',
      alignItems: 'center',
      height: height * 0.08,
      backgroundColor: appColor
   },
   backIcon: {
      paddingLeft: 15
   },
   title: {
      fontFamily: appFont,
      fontSize: 16,
      color: appTextColor,
      marginLeft: 15
   },
   containerContent: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#fff'
   },
   errorMessage: {
      color: cpmRed,
      fontSize: 14,
      fontFamily: appFont,
      marginVertical: 10
   },
   input: {
      width: width * 0.8,
      height: height * 0.07,
      borderColor: '#bdc3c7',
      fontSize: 16,
      color: cpmRed,
      fontFamily: appFont,
      borderWidth: 0.5,
      marginVertical: 5,
      borderRadius: 5,
      paddingHorizontal: 10
   },
   btnSubmit: {
      width: width * 0.8,
      height: height * 0.07,
      backgroundColor: cpmRed,
      marginVertical: 5,
      borderRadius: 5,
      paddingVertical: 5,
      alignItems: 'center',
      justifyContent: 'center'
   },
   btnLabel: {
      fontSize: 16,
      color: appTextColor,
      fontFamily: appFont
   }
});
