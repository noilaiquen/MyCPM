import React, { Component } from 'react';
import {
   View,
   StyleSheet,
   Dimensions,
   TouchableOpacity,
   Text,
   Alert
} from 'react-native';
import MapView from 'react-native-maps';
import DialogBox from '../../../Common/DialogBox';
import mapStyle from '../kMapStyle.json';
import { appFont, cpmRed } from '../../../../Configs/Constants';

class CheckIn extends Component {
   constructor(props) {
      super(props);
      this.state = {
         markerCoords: null,
         region: null
      };
      this.checkIn = this.checkIn.bind(this);
   }

   componentDidMount() {
      setTimeout(() => {
         this.checkIn();
      }, 500);
   }

   checkIn() {
      navigator.geolocation.getCurrentPosition(position => { //eslint-disable-line
         const { coords } = position;
         this.setState({
            markerCoords: coords
         }, () => {
            this._map.animateToRegion({ //eslint-disable-line
               latitude: coords.latitude,
               longitude: coords.longitude,
               latitudeDelta: 0.010948229928487763,
               longitudeDelta: 0.009123869240283966,
            }, 1000);
         });
      }, error => {
         Alert.alert('Error!', error.message);
      });
   }

   render() {
      const { region, markerCoords } = this.state;
      const latitude = region ? region.latitude : 0.0;
      const longitude = region ? region.longitude : 0.0;
      return (
         <View style={styles.container}>
            <DialogBox ref={ref => this.dialogBox = ref} />   
            <MapView
               ref={map => { this._map = map; }} //eslint-disable-line
               style={styles.map}
               customMapStyle={mapStyle}
               region={region}
               onRegionChange={regionChange => this.setState({ region: regionChange })}
               onRegionChangeComplete={(regionChange) => {
                  this.setState({ region: regionChange });
                  if (markerCoords) {
                     this.marker.showCallout();
                  }
               }}
            >
               {markerCoords &&
                  <MapView.Marker
                     ref={marker => { this.marker = marker; }}
                     coordinate={markerCoords}
                     title={`${markerCoords.latitude}, ${markerCoords.longitude}`}
                     description={new Date().toLocaleString()}
                  />
               }
            </MapView>
            <View style={styles.coordsInfo}>
               <Text style={styles.textHighLight}>{`Latitude: ${latitude}`}</Text>
               <Text style={styles.textHighLight}>{`Longitude: ${longitude}`}</Text>
            </View>

            <View style={styles.areaControl}>
               <TouchableOpacity
                  style={styles.btnCheckIn}
                  onPress={() => this.dialogBox.show('Check In tại vị trí này', [
                     {
                        text: 'Đồng ý',
                        onPress: () => this.props.navigation.goBack()
                     },
                     {
                        text: 'Hủy',
                        onPress: () => console.log(222)
                     }
                  ])}
               >
                  <Text style={styles.text}>Check in</Text>
               </TouchableOpacity>
               <TouchableOpacity style={styles.btnCheckOut}>
                  <Text style={styles.text}>Check out</Text>
               </TouchableOpacity>
            </View>
         </View>
      );
   }
}

export default CheckIn;

const styles = StyleSheet.create({
   container: {
      ...StyleSheet.absoluteFillObject,
      width: Dimensions.get('window').width,
      justifyContent: 'flex-end',
      alignItems: 'center',
   },
   map: {
      ...StyleSheet.absoluteFillObject,
   },
   coordsInfo: {
      position: 'absolute',
      top: 0,
      left: 0,
      height: Dimensions.get('window').height * 0.1,
      width: Dimensions.get('window').width,
      backgroundColor: 'rgba(0,0,0,0)',
      paddingHorizontal: 10
   },
   textHighLight: {
      color: cpmRed,
      fontFamily: appFont,
      fontSize: 12
   },
   text: {
      fontFamily: appFont,
      fontSize: 14
   },
   areaControl: {
      position: 'absolute',
      bottom: 10,
      flexDirection: 'row',
      justifyContent: 'space-around',
      height: Dimensions.get('window').height * 0.1
   },
   btnCheckIn: {
      justifyContent: 'center',
      alignItems: 'center',
      width: Dimensions.get('window').width * 0.3,
      height: Dimensions.get('window').height * 0.06,
      backgroundColor: '#757575',
      borderRadius: 5,
      marginHorizontal: 10
   },
   btnCheckOut: {
      justifyContent: 'center',
      alignItems: 'center',
      width: Dimensions.get('window').width * 0.3,
      height: Dimensions.get('window').height * 0.06,
      backgroundColor: '#757575',
      borderRadius: 5,
      marginHorizontal: 10
   }
});

