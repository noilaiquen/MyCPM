import React, { Component } from 'react';
import {
   View, Text, StyleSheet,
   ScrollView, Image, Dimensions, FlatList,
   TouchableOpacity
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Icon from 'react-native-vector-icons/Ionicons';
import Loading from '../../../Common/Loading';
import {
   IMAGE_URL,
   appColor,
   appFont,
   appTextColorHighLight,
   appTextColor,
   cpmRed
} from '../../../../Configs/Constants';
import { fetchIncomeInfo } from '../../../../Redux/Action/IncomeAction';

const { width, height } = Dimensions.get('window');

class Home extends Component {
   static navigationOptions = ({ navigation }) => ({
      headerRight: (
         <TouchableOpacity onPress={() => navigation.navigate('CheckIn')}>
            <Icon
               name="ios-locate-outline"
               color={cpmRed} size={30}
               style={{ marginRight: 15 }}
            />
         </TouchableOpacity>
      )
   });

   componentDidMount() {
      // const { user_id } = this.props.userInfo;
      // this.props.fetchIncomeInfo(user_id);
      if (!this.props.isFetched) {
         this.props.fetchIncomeInfo(5835);
      }
   }

   render() {
      const { totalIncomeYear, salary3Months, isLoading, currentYear } = this.props;

      const {
         container, contentContainer, headerContent,
         userNameLabel, emailLabel, avatar, headerUserInfo, content,
         highLightTotal, totalSalaryYear, salaryMonthRow, textGeneral
      } = styles;

      const { fullname, email, image, username } = this.props.userInfo;
      const avatarImageUrl = `${IMAGE_URL}${username}/${image}`;

      return (
         <View style={container}>
            <ScrollView contentContainerStyle={contentContainer}>
               <Image
                  blurRadius={5}
                  source={{ uri: avatarImageUrl }}
                  style={headerContent}
               >
                  <Image source={{ uri: avatarImageUrl }} style={avatar} />
                  <View style={headerUserInfo}>
                     <Text style={userNameLabel}>{fullname}</Text>
                     <Text style={emailLabel}>{email}</Text>
                  </View>
               </Image>
               { isLoading ? (
                  <Loading />
               ) : (
                  <View style={content}>
                     <View style={highLightTotal}>
                        <Text style={totalSalaryYear}>
                           {`Tổng lương năm ${currentYear} là: ${totalIncomeYear} VNĐ`}
                        </Text>
                     </View>

                     <FlatList
                        data={salary3Months}
                        keyExtractor={(item) => item.year_month}
                        renderItem={({ item }) => (
                           <View style={salaryMonthRow}>
                              <Text style={textGeneral}>{item.year_month}</Text>
                              <Text style={textGeneral}>
                                 {item.sum_income} VNĐ
                              </Text>
                           </View>
                        )}
                     />
                  </View>
               )}
            </ScrollView>
         </View>
      );
   }
}

const mapStateToProps = ({ AppState, IncomeState }) => {
   const { userInfo } = AppState;
   const {
      totalIncomeYear,
      salary3Months,
      isError,
      message,
      isLoading,
      currentYear,
      isFetched
   } = IncomeState;

   return {
      userInfo,
      totalIncomeYear,
      salary3Months,
      currentYear,
      isLoading,
      isError,
      message,
      isFetched
   };
};

const mapDispatchToProps = dispatch => (
   bindActionCreators({ fetchIncomeInfo }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(Home);

const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: '#FFF'
   },
   contentContainer: {
      // backgroundColor: cpmBlue
   },
   headerContent: {
      height: height * 0.4,
      justifyContent: 'center',
      alignItems: 'center',
      resizeMode: 'cover'
   },
   avatar: {
      width: width * 0.3,
      height: width * 0.3,
      borderRadius: width * 0.15
   },
   headerUserInfo: {
      marginVertical: 10,
      justifyContent: 'center',
      alignItems: 'center'
   },
   userNameLabel: {
      fontFamily: 'Lato-Bold',
      fontSize: 18,
      color: appTextColor,
      textShadowColor: appColor,
      textShadowOffset: {
         width: 0.5,
         height: 0.5
      },
      textShadowRadius: 1
   },
   emailLabel: {
      fontFamily: appFont,
      fontSize: 14,
      color: '#ddd',
      textShadowColor: appColor,
      textShadowOffset: {
         width: 0.5,
         height: 0.5
      },
      textShadowRadius: 1
   },
   content: {

   },
   highLightTotal: {
      height: height * 0.08,
      backgroundColor: '#DDD',
      justifyContent: 'center',
      alignItems: 'center'
   },
   totalSalaryYear: {
      fontFamily: appFont,
      fontSize: 16,
      color: appTextColorHighLight
   },
   salaryMonthRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      height: height * 0.08,
      borderBottomColor: '#F5F5F5',
      borderBottomWidth: 0.5,
      paddingHorizontal: 10
   },
   textGeneral: {
      fontFamily: appFont,
      fontSize: 14
   }
});

