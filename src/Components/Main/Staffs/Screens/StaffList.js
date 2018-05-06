import React, { Component } from 'react';
import {
   View, Image, Text,
   StyleSheet, TextInput,
   Dimensions, FlatList, TouchableOpacity,
   Alert, ActivityIndicator
} from 'react-native';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { 
   fetchStaffs, 
   getStaffsLocal, 
   searchStaffs,
   endSearchStaffs,
   resetStatesToDefault
} from '../../../../Redux/Action/StaffAction';

import { 
   cpmRed, 
   appFont, 
   appIconDimensions 
} from '../../../../Configs/Constants';

import Loading from '../../../Common/Loading';
import DialogBox from '../../../Common/DialogBox';
import searchIcon from '../../../../Media/Icon/search.png';
import avatarIcon from '../../../../Media/Icon/cpm-avatar.png';

const { width, height } = Dimensions.get('window');

class StaffList extends Component {
   constructor(props) {
      super(props);
      this.state = {
         searchText: null
      };
      this.loadMore = this.loadMore.bind(this);
      this.onRefeshStaffs = this.onRefeshStaffs.bind(this);
   }

   componentDidMount = () => {
      //xet params cho header
      this.props.navigation.setParams({
         fetchStaffs: this.onRefeshStaffs
      });

      setTimeout(() => this.loadMore(), 500);
   }

   componentWillUnmount = () => {
      this.props.resetStatesToDefault();
   }

   onRefeshStaffs = () => {
      const { user_id } = this.props;
      // this.dialogBox.show();
       Alert.alert('', 'Xóa hết nhân viên và tải lại?',
         [
            { text: 'Tải lại', onPress: () => this.props.fetchStaffs(user_id) },
            { text: 'Hủy bỏ', onPress: () => (null) }
         ],
         { cancelable: false }
      );
   }
   
   
   onSearch = searchText => {
      this.setState({
         searchText: (searchText !== '') ? searchText : null
      }, () => {
         if (!this.state.searchText) {
            this.props.endSearchStaffs();
         } else {
            this.props.searchStaffs(this.state.searchText);
         }
      });
   }

   loadMore = () => {
      //paging
      const { page, limit, isLoading, isEndReached } = this.props;
      const { searchText } = this.state;
      const from = (page - 1) * limit;
      const to = from + limit;

      //fetch if isLoading and isEndReached === false , avoid conflic data => avoid conflic key in flatList
      if (!isLoading && !isEndReached && searchText === null) {
         this.props.getStaffsLocal(from, to);
      }
   }

   renderItem = staff => (
         <TouchableOpacity
            style={styles.staffItem}
            onPress={() => this.props.navigation.navigate('StaffInfo', { staff })}
         >
            <Image
               source={avatarIcon}
               style={styles.avatar}
            />
            <View style={styles.staffInfo}>
               <Text style={styles.staffFullname}>{staff.fullname}</Text>
               <Text style={styles.staffPhone}>{staff.telephone}</Text>
               <Text style={styles.staffPhone}>{staff.email}</Text>
            </View>
         </TouchableOpacity>
   )

   renderFooter = () => {
      const { isEndReached } = this.props;
      return (!isEndReached) ?
         <View style={{ marginVertical: 20 }} /> :
         <ActivityIndicator animating size="large" />;
   }

   render() {
      const { isEndReached, isLoading, staffs, } = this.props;
      return (
         <View style={styles.container}>
            <Loading isShow={isLoading} />
            <DialogBox ref={(ref) => { this.dialogBox = ref; }} />

            <View style={styles.searchBox}>
               <Image source={searchIcon} style={[styles.icon, { ...appIconDimensions }]} />   
               <TextInput
                  style={styles.input}
                  placeholder="Tìm nhân viên"
                  keyboardAppearance="dark"
                  underlineColorAndroid="rgba(0,0,0,0)"
                  returnKeyType="go"
                  placeholderTextColor="#bdc3c7"
                  onChangeText={text => this.onSearch(text)}
               />
            </View>
            <FlatList
               refreshing={isEndReached}
               data={staffs}
               keyExtractor={(item) => item.user_id}
               renderItem={({ item }) => this.renderItem(item)}
               onEndReached={this.loadMore}
               onEndReachedThreshold={0.01}
               ListFooterComponent={() => this.renderFooter()}
            />
         </View>
      );
   }
}

const mapStateToProps = ({ StaffState, AppState }) => ({
   isLoading: StaffState.isLoading,
   isEndReached: StaffState.isEndReached,
   staffs: (StaffState.isSearching) ? StaffState.staffsSearch : StaffState.staffs,
   isError: StaffState.isError,
   page: StaffState.page,
   limit: StaffState.limit,
   user_id: AppState.userInfo.user_id
});

const mapDispatchToProps = dispatch => (
   bindActionCreators({
      fetchStaffs,
      getStaffsLocal,
      searchStaffs,
      resetStatesToDefault,
      endSearchStaffs
   }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(StaffList);

const styles = StyleSheet.create({
   loading: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#FFF'
   },
   container: {
      flex: 1,
      paddingHorizontal: 10,
      backgroundColor: '#FFF'
   },
   searchBox: {
      flexDirection: 'row',
      alignItems: 'center',
      height: height * 0.06,
      marginVertical: 5,
      borderWidth: 0.5,
      borderColor: '#bdc3c7',
      borderRadius: 10,
   },
   icon: {
      marginHorizontal: 10,
      tintColor: '#bdc3c7',
   },
   input: {
      width: '85%',
      fontSize: 14,
      color: cpmRed,
      fontFamily: appFont,
      padding: 3
   },
   staffItem: {
      flexDirection: 'row',
      width,
      height: height * 0.15,
      alignItems: 'center'
   },
   avatar: {
      height: 70,
      width: 70,
      resizeMode: 'contain',
      borderRadius: 35
   },
   staffInfo: {
      width: '100%',
      height: '100%',
      // borderColor: '#E0E0E0',
      // borderBottomWidth: 0.5,
      marginLeft: 10,
      justifyContent: 'center'
   },
   staffFullname: {
      fontFamily: appFont,
      fontSize: 16,
      color: cpmRed
   },
   staffPhone: {
      fontFamily: appFont,
      // color: '#bdc3c7'
   }
});

