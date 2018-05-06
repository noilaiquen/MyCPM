import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import RootNavigator from './Configs/RootNavigator';
import { checkLoggedIn } from './Redux/Action/AppAction';
import Splash from './Components/Splash/Splash';

class App extends Component {
   componentWillMount() {
      this.props.checkLoggedIn();
   }

   render() {
      const { isLoggedIn, checkLogin } = this.props;
      const Layout = RootNavigator(isLoggedIn);

      if (!checkLogin) {
         return <Splash />;
      }

      return (
         <Layout />
      );
   }
}

const mapStateToProps = ({ AppState }) => {
   const { isLoggedIn, checkLogin } = AppState;
   return {
      isLoggedIn,
      checkLogin
   };
};

const mapDispatchToProps = dispatch => ({
      dispatch,
      ...bindActionCreators({ checkLoggedIn }, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
