import React, { Component } from 'react';
import {
   View,
   Text,
   StyleSheet,
   TouchableOpacity
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { appTextColor, cpmGreen } from '../../../../Configs/Constants';


class Support extends Component {
   static navigationOptions = ({ navigation }) => ({
      headerRight: (
         <TouchableOpacity
            style={{ marginRight: 15 }}
            onPress={() => console.log(1)}
         >
            <Icon name="ios-sync-outline" color={appTextColor} size={30} />
         </TouchableOpacity>
      )
   });

   render() {
      const { Wrapper } = Styles;
      return (
         <View style={Wrapper}>
            <Text>Salary</Text>
         </View>
      );
   }
}

export default Support;

const Styles = StyleSheet.create({
   Wrapper: {
      flex: 1,
      backgroundColor: cpmGreen
   }
});

