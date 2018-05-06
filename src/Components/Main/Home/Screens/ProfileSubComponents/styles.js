import { StyleSheet, Dimensions } from 'react-native';
import { appFont, appColor } from '../../../../../Configs/Constants';

const { height } = Dimensions.get('window');

const styles = StyleSheet.create({
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
      width: '60%',
      paddingHorizontal: 10
   },
   value: {
      fontFamily: appFont,
      fontSize: 16,
      color: '#757575'
   },
   input: {
      fontFamily: appFont,
      color: '#212121',
      fontSize: 16
   },
   listItem: {
      width: '100%',
      height: 40,
      justifyContent: 'center',
      borderBottomWidth: 0.4,
      borderColor: '#eee',
      paddingHorizontal: 10
   },
   listItemLabel: {
      fontSize: 16,
      fontFamily: appFont,
      color: appColor
   }
});
export default styles;
