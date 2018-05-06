import React, { Component } from 'react';
import {
   View,
   Text,
   StyleSheet,
   FlatList,
   TouchableOpacity,
   Dimensions
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchDeviceNotes, /*resetDeviceNotesState*/ } from '../../../../Redux/Action/DeviceAction';
import Loading from '../../../Common/Loading';
import { appFont, appColor } from '../../../../Configs/Constants';

const { width, height } = Dimensions.get('window');

class DeviceNotes extends Component {
   componentDidMount() {
      this.props.fetchDeviceNotes();
   }

   renderItem = note => (
      <TouchableOpacity style={styles.noteContainer}>
         <View style={styles.dateTime}>
            <Text style={styles.textDateTime}>{note.date_added.substring(0, 10)}</Text>
            <Text style={styles.textDateTime}>{note.date_added.substring(10, 19)}</Text>
         </View>
         <View style={styles.noteText}>
            <Text style={styles.noteTextValue}>{note.note}</Text>
         </View>
      </TouchableOpacity>
   )

   render() {
      const { isLoading } = this.props;
      return (
         <View style={styles.container} >
            <Loading isShow={isLoading} />   
            <FlatList
               data={this.props.notes}
               keyExtractor={(item) => item.device_note_id}
               renderItem={({ item }) => this.renderItem(item)}
            />
         </View>
      );
   }
}

const mapStateToProps = ({ DeviceState }) => {
   const { isError, isLoading, notes, message } = DeviceState;
   return {
      isError,
      isLoading,
      notes,
      message
   };
};

const mapDispatchToProps = dispatch => {
   return {
      dispatch,
      ...bindActionCreators({ fetchDeviceNotes }, dispatch)
   };
};

export default connect(mapStateToProps, mapDispatchToProps)(DeviceNotes);

const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: '#FFF',
      padding: 10
   },
   noteContainer: {
      height: height * 0.1,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      borderBottomColor: '#F5F5F5',
      borderBottomWidth: 0.5
   },
   datetime: {
      width: width * 0.3,
      justifyContent: 'center',
      alignItems: 'center',
      flex: 1,
      flexWrap: 'wrap'
   },
   noteText: {
      width: width * 0.7,
      paddingLeft: 10,
      flex: 1,
      flexWrap: 'wrap'
   },
   textDateTime: {
      fontFamily: appFont,
      fontSize: 16
   },
   noteTextValue: {
      fontFamily: appFont,
      color: appColor,
      fontSize: 16
   }
});
