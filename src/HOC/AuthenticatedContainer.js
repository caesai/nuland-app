import React from 'react';
import { connect } from 'react-redux';
import {AsyncStorage} from 'react-native';
import requestPermission from '../utils';
import {geoactions} from '../actions/geo';
import {actions} from '../actions/auth';

import LoginView from '../views/LoginView';
import AuthedView from '../views/AuthedView';

const Geolocation = navigator.geolocation;

function getBalance(ethAddress) {
  return fetch('http://194.58.122.82/balance',{
    method: 'post',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({address: ethAddress})
  }).then((resp) => {
    return resp.json();
  }).then((data) => {
    return data.balance;
  });
}

class AuthenticatedContainer extends React.Component {
  constructor(props) {
    super(props);
  }
  async getUserData() {
    try {
      // Checking if user was authenticated on device
      const value = await AsyncStorage.getItem('nuland.storage');
      // Getting geo data from the device
      Geolocation.watchPosition(
        (position) => {
          this.props.dispatch(geoactions.getLocation({
            lat: position.coords.latitude,
            lon: position.coords.longitude
          }));
        },
        (error) => this.setState({ error: error.message })
      );

      if (value !== null){
        let userData = JSON.parse(value);
        let address = userData.ethAddress;
        getBalance(address).then((balance) => {
          userData.balance = balance;
          this.setState({
            userData
          })
          this.props.dispatch(actions.signin(userData));
        })
        // Checking user balance
      }
    } catch (error) {
      console.log(error);
    }
  }
  componentDidMount() {
    requestPermission();
    this.getUserData();
  }
  componentWillUnmount() {
    Geolocation.clearWatch(this.watchId);
  }
  render() {
    if (this.props.user) {
      return <AuthedView />
    } else {
      return <LoginView />
    }
  }
}

function mapStateToProps(state) {
  return {
    user: state.logIn.isAuthenticated
  }
}

export default connect(mapStateToProps)(AuthenticatedContainer);
