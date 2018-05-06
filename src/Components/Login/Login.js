import React, { Component } from 'react';
import {
   View, Text, Image,
   StyleSheet, Dimensions, TextInput,
   TouchableOpacity, ActivityIndicator,
   ToastAndroid, StatusBar, KeyboardAvoidingView,
   Animated, Alert, Easing,
   Keyboard, Modal, TouchableWithoutFeedback
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { userLogin, sendMailPassword } from '../../Redux/Action/AuthAction';
import { checkLoggedIn } from '../../Redux/Action/AppAction';
import {
   appTextColor,
   appFont,
   appTextColorHighLight,
   cpmRed
} from '../../Configs/Constants';

import logoCPM from '../../Media/Image/logo.png';
import bgImage from '../../Media/Image/bg.jpg';

const { width, height } = Dimensions.get('window');

class Login extends Component {
   constructor(props) {
      super(props);
      this.state = {
         username: null,
         password: null,
         email: null,
         offsetAnim: new Animated.Value(height),
         fadeInAnim: new Animated.Value(0),
         modalVisible: false
      };
      this.animatedScreen = this.animatedScreen.bind(this);
   }

   componentDidMount() {
      this.animatedScreen();
   }

   componentWillReceiveProps(nextProps) {
      if (nextProps.isError) {
         Alert.alert('', nextProps.message,
            [{
               text: 'OK',
               onPress: () => null
            }],
            { cancelable: false }
         );
      }
      if (nextProps.isLoggedIn) {
         this.props.checkLoggedIn();
      }
   }

   onLogin() {
      Keyboard.dismiss();
      const { username, password } = this.state;
      if (!username || !password) {
         ToastAndroid.show('Tải khoản hoặc mật khẩu rỗng!', ToastAndroid.SHORT);
         return;
      }

      this.props.userLogin(username, password);
   }

   setModalVisible(visible) {
      this.setState({
         modalVisible: visible,
         email: null
      });
   }

   sendMail() {
      Keyboard.dismiss();
      const { email } = this.state;
      if (!email) {
         ToastAndroid.show('Email rỗng!', ToastAndroid.SHORT);
         return;
      }
      this.props.sendMailPassword(email);
   }

   animatedScreen() {
      Animated.parallel([
         Animated.timing(
            this.state.offsetAnim, {
               toValue: 0,
               duration: 300,
               easing: Easing.bezier(0.215, 0.61, 0.355, 1),
               useNativeDriver: true
            }
         ),
         Animated.timing(
            this.state.fadeInAnim, {
               toValue: 1,
               duration: 500,
               useNativeDriver: true
            }
         )
      ]).start();
   }

   render() {
      const { isLoading, isLoadingModal } = this.props;
      const { offsetAnim, fadeInAnim, modalVisible } = this.state;

      return (
         <Animated.Image
            source={bgImage}
            style={[styles.container,
               {
                  opacity: fadeInAnim,
                  transform: [{ translateY: offsetAnim }]
               }
            ]}
         >
            <StatusBar
               backgroundColor={modalVisible ? 'rgba(0,0,0,0.3)' : 'transparent'}
               translucent
            />
            <KeyboardAvoidingView behavior="position">
               <View style={styles.logoConainer}>
                  <Image
                     style={styles.logo}
                     source={logoCPM}
                  />
               </View>
               <View style={styles.formConainer}>
                  <View style={styles.inputGroup}>
                     <Icon name="ios-person-outline" size={38} color={appTextColor} />
                     <TextInput
                        style={styles.input}
                        placeholder="Tên đăng nhập"
                        returnKeyType="next"
                        keyboardAppearance="dark"
                        onSubmitEditing={() => this.passwordInput.focus()}
                        placeholderTextColor={appTextColor}
                        underlineColorAndroid="rgba(0,0,0,0)"
                        onChangeText={text => this.setState({ username: text })}
                     />
                  </View>
                  <View style={styles.inputGroup}>
                     <Icon name="ios-lock-outline" size={38} color={appTextColor} />
                     <TextInput
                        style={styles.input}
                        secureTextEntry
                        placeholder="Mật khẩu"
                        returnKeyType="go"
                        keyboardAppearance="dark"
                        placeholderTextColor={appTextColor}
                        underlineColorAndroid="rgba(0,0,0,0)"
                        onChangeText={text => this.setState({ password: text })}
                        ref={(input) => { this.passwordInput = input; }}
                        onSubmitEditing={() => this.onLogin()}
                     />
                  </View>

                  <View style={styles.btnGroup}>
                     <TouchableOpacity style={styles.btnSubmit} onPress={() => this.onLogin()} >
                        {isLoading ? (
                           <ActivityIndicator
                              animating
                              color={appTextColor}
                              size="large"
                           />
                        ) : (
                              <Text style={styles.label}>Đăng nhập</Text>
                           )
                        }
                     </TouchableOpacity>
                  </View>
                  <View>
                     <TouchableOpacity
                        style={styles.btnDefault}
                        onPress={() => this.setModalVisible(true)}
                     >
                        <Text style={styles.labelHight}>Quên mật khẩu?</Text>
                     </TouchableOpacity>
                  </View>
               </View>
            </KeyboardAvoidingView>

            <Modal
               animationType="fade"
               transparent
               visible={modalVisible}
               onRequestClose={() => (null)}
            >
               <TouchableWithoutFeedback onPress={() => this.setModalVisible(!modalVisible)}>
                  <View style={styles.modalContainer}>
                     <View style={styles.modalContent}>
                        <View style={[styles.inputGroup, { borderColor: '#999988' }]}>
                           <Icon name="ios-mail-outline" size={38} color={'#999988'} />
                           <TextInput
                              style={styles.input}
                              placeholder="Email"
                              keyboardType="email-address"
                              returnKeyType="go"
                              keyboardAppearance="dark"
                              placeholderTextColor={'#999988'}
                              underlineColorAndroid="rgba(0,0,0,0)"
                              onChangeText={text => this.setState({ email: text })}
                              onSubmitEditing={() => this.sendMail()}
                           />
                        </View>
                        <TouchableOpacity
                           style={styles.btnOutline}
                           onPress={() => this.sendMail()}
                        >
                           {isLoadingModal ? (
                              <ActivityIndicator
                                 animating
                                 color={cpmRed}
                                 size="large"
                              />
                           ) : (
                              <Text style={styles.labelHight}>Lấy lại mật khẩu</Text>
                           )
                           }
                        </TouchableOpacity>
                     </View>
                  </View>
               </TouchableWithoutFeedback>
            </Modal>
         </Animated.Image>
      );
   }
}

const mapStateToProps = ({ AuthState }) => {
   const { isLoading, isLoggedIn, isError, message, isLoadingModal } = AuthState;
   return {
      isLoading,
      isLoadingModal,
      isLoggedIn,
      isError,
      message
   };
};

const mapDispatchToProps = dispatch => (
   bindActionCreators({ userLogin, sendMailPassword, checkLoggedIn }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(Login);

const styles = StyleSheet.create({
   container: {
      width,
      height,
      resizeMode: 'cover'
   },
   logoConainer: {
      height: height * 0.4,
      alignItems: 'center',
      justifyContent: 'center'
   },
   logo: {
      width: width * 0.8,
      height: height * 0.3,
      resizeMode: 'contain'
   },
   formConainer: {
      alignItems: 'center',
      justifyContent: 'center'
   },
   inputGroup: {
      flexDirection: 'row',
      alignItems: 'center',
      width: width * 0.8,
      marginBottom: 20,
      borderColor: appTextColor,
      borderBottomWidth: 1
   },
   inputIcon: {
      width: '10%'
   },
   icon: {
      width: 30,
      height: 30,
      tintColor: appTextColor
   },
   input: {
      width: '90%',
      fontSize: 16,
      fontFamily: appFont,
      paddingHorizontal: 10,
      color: appTextColorHighLight,
      backgroundColor: 'rgba(0,0,0,0)'
   },
   btnGroup: {
      width: width * 0.8,
      marginVertical: 10
   },
   btnSubmit: {
      flexDirection: 'row',
      height: height * 0.07,
      backgroundColor: cpmRed,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 5
   },
   label: {
      fontSize: 16,
      fontFamily: appFont,
      color: appTextColor
   },
   btnDefault: {
      height: height / 13,
      justifyContent: 'center',
      alignItems: 'center',
   },
   labelHight: {
      fontSize: 16,
      fontFamily: appFont,
      color: appTextColorHighLight
   },
   modalContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0,0,0,0.3)'
   },
   modalContent: {
      justifyContent: 'center',
      alignItems: 'center',
      width: width * 0.9,
      height: height * 0.25,
      borderRadius: 5,
      backgroundColor: appTextColor,
      elevation: 4
   },
   btnOutline: {
      width: width * 0.8,
      borderWidth: 0.5,
      borderColor: cpmRed,
      height: height * 0.07,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 5
   }
});
