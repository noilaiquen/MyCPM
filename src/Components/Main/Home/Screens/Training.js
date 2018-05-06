import React, { Component } from 'react';
import {
   View,
   StyleSheet,
   TouchableOpacity
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { appTextColor } from '../../../../Configs/Constants';

class Training extends Component {
   static navigationOptions = ({ navigation }) => ({
      headerRight: (
         <TouchableOpacity
            style={{ marginRight: 15 }}
            onPress={() => console.log(1)}
         >
            <Icon name="ios-cloud-upload-outline" color={appTextColor} size={30} />
         </TouchableOpacity>
      )
   });

   render() {
      const { Wrapper } = Styles;
      return (
         <View style={Wrapper}>
            <Icon name="ios-mail-outline" color="#4F8EF7" size={50} />
         </View>
      );
   }
}

export default Training;

const Styles = StyleSheet.create({
   Wrapper: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#FFF'
   }
});

