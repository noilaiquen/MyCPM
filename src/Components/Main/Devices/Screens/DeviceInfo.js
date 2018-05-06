import React, { Component } from 'react';
import {
   View,
   Text,
   StyleSheet,
   Dimensions,
   TouchableOpacity
} from 'react-native';
import Info from '../SubComponent/Info';
import Note from '../SubComponent/Note';

import {
   appFont,
   appTextColorHighLight
} from '../../../../Configs/Constants';

const { width, height } = Dimensions.get('window');

class DeviceInfo extends Component {
   constructor(props) {
      super(props);
      this.state = {
        activeTab: 1
      };
   }

   handleActiveTab(tab) {
      this.setState({
         activeTab: tab
      });
   }

   render() {
      return (
         <View style={styles.container} >
            <View style={styles.tabContainer}>
               <TouchableOpacity
                  style={[styles.tab, { backgroundColor: this.state.activeTab === 1 ? '#fff' : '#ddd' }]}
                  onPress={() => this.handleActiveTab(1)}
               >
                  <Text style={styles.label}>Thông tin</Text>
               </TouchableOpacity>
               <TouchableOpacity
                  style={[styles.tab, { backgroundColor: this.state.activeTab === 2 ? '#fff' : '#ddd' }]}
                  onPress={() => this.handleActiveTab(2)}
               >
                  <Text style={styles.label}>Ghi chú</Text>
               </TouchableOpacity>
            </View>
            <View style={styles.contentContaner}>
               {
                  this.state.activeTab === 1 ? (
                     <Info device={this.props.navigation.state.params.device} />
                  ) : (
                     <Note device={this.props.navigation.state.params.device} />
                  )
               }
            </View>
         </View>
      );
   }
}

export default DeviceInfo;

const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: '#FFF',
   },
   tabContainer: {
      height: height * 0.08,
      flexDirection: 'row'
   },
   tab: {
      width: width / 2,
      borderColor: '#000',
      alignItems: 'center',
      justifyContent: 'center'
   },
   label: {
      fontSize: 16,
      fontFamily: appFont,
      color: appTextColorHighLight
   },
   contentContaner: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
   }
});
