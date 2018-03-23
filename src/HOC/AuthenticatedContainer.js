import React from 'react';
import { connect } from 'react-redux'
import {Redirect} from 'react-router-native';
import { View, Text, Dimensions } from 'react-native';
import {Link} from 'react-router-native';
import requestPermission from '../utils';
import {actions} from '../actions/geo';
import Swiper from 'react-native-swiper';
import Account from '../views/Account';
import Camera from '../views/Camera';

const Geolocation = navigator.geolocation;

export default function requireAuthentication(Component) {

  class AuthenticatedContainer extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        visibleSwiper: false
     };
    }
    componentDidMount() {
      requestPermission();

      Geolocation.watchPosition(
        (position) => {
          this.props.dispatch(actions.getLocation({
            lat: position.coords.latitude,
            lon: position.coords.longitude
          }));
        },
        (error) => this.setState({ error: error.message })
        // { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
      );
      setTimeout(() => {
      this.setState({
        visibleSwiper: true
      });
   }, 100);
    }
    componentWillUnmount() {
      Geolocation.clearWatch(this.watchId);
    }
    render() {
      const { height } = Dimensions.get('window');
      const { width } = Dimensions.get('window');
      if (this.props.user) {
        return (
            <View>
              <Swiper
                loop={false}
                height={height}
                width={width}
                index={1}
                showButtons={false}
                removeClippedSubviews={false}>
                <Camera />
                <Component {...this.props} />
                <Account />
              </Swiper>
              <Link to='/account'><Text>Settings</Text></Link>
            </View>
        )
      } else {
        return <Redirect to='/' />
      }

    }
  }

  function mapStateToProps(state) {
    return {
      user: state.logIn.isAuthenticated
    }
  }

  return connect(mapStateToProps)(AuthenticatedContainer);
}
