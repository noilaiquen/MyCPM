import React, { Component } from 'react';
import {
   StyleSheet,
   Text,
   View,
   TouchableOpacity,
   Animated,
   Dimensions
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {
   appFont,
   appIconDimensions,
   appColor
} from '../../Configs/Constants';

const { height } = Dimensions.get('window');

class Panel extends Component {
   constructor(props) {
      super(props);
      this.state = {
         expanded: true,
         animation: new Animated.Value(),
         maxHeight: 0,
         minHeight: 0
      };
   }

   setMaxHeight = event => {
      this.setState({
         maxHeight: event.nativeEvent.layout.height
      });
   }

   setMinHeight = event => {
      this.setState({
         minHeight: event.nativeEvent.layout.height
      });
   }

   toggle = () => {
      const initValue = this.state.expanded ? this.state.maxHeight + this.state.minHeight : this.state.minHeight; //eslint-disable-line

      const finalValue = this.state.expanded ? this.state.minHeight : this.state.maxHeight + this.state.minHeight; //eslint-disable-line

      this.setState({
         expanded: !this.state.expanded
      });

      this.state.animation.setValue(initValue);
      Animated.spring(
         this.state.animation,
         {
            toValue: finalValue
         }
      ).start();
   }

   render() {
      const { title, children, iconTitle } = this.props;

      return (
         <Animated.View style={[styles.container, { height: this.state.animation }]}>
            <View style={styles.titleContainer} onLayout={this.setMinHeight.bind(this)}>
               {iconTitle && <Icon name={iconTitle} size={25} style={{ marginRight: 10 }} color={appColor} />}
               <Text style={styles.title}>{title}</Text>
               <TouchableOpacity style={styles.button} onPress={this.toggle.bind(this)}>
                  <Icon name={this.state.expanded ? 'ios-arrow-up-outline' : 'ios-arrow-down-outline'} size={25} color={appColor} />
               </TouchableOpacity>
            </View>

            <View style={styles.body} onLayout={this.setMaxHeight.bind(this)}>
               {children}
            </View>

         </Animated.View>
      );
   }
}
export default Panel;

const styles = StyleSheet.create({
   container: {
      overflow: 'hidden',
      backgroundColor: '#fff',
      marginBottom: 10,
      paddingHorizontal: 10
   },
   titleContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      height: height * 0.06,
      borderColor: '#ddd',
      borderBottomWidth: 0.5
   },
   title: {
      flex: 1,
      fontFamily: appFont,
      fontSize: 15,
      color: appColor,
   },
   buttonImage: {
      ...appIconDimensions,
      tintColor: appColor
   },
   body: {
      paddingVertical: 10
   }
});
