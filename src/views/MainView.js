import React from 'react';
import { StyleSheet, Text, View, AsyncStorage } from 'react-native';
import { connect } from 'react-redux';
import requestPermission from '../utils';
import {Redirect} from 'react-router-native';
import Login from '../components/Login';
import {actions} from '../actions/auth';

const mapStateToProps = (state) => ({
  auth: state.logIn.isAuthenticated
})

const Geolocation = navigator.geolocation;

class MainView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      auth: false,
      latitude: null,
      longitude: null,
      error: null
    };
  }
  async getUserData() {
    try {
      const value = await AsyncStorage.getItem('nuland.storage');
      if (value !== null){
        // We have data!!
        console.log(value);
        this.props.dispatch(actions.login(value));
        setTimeout(()=>{
          console.log(this.props)
        }, 1000)
      }
    } catch (error) {
      // Error retrieving data
    }
  }
  componentDidMount() {
    this.getUserData();
    requestPermission();
    Geolocation.watchPosition(
      (position) => {
        this.setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          error: null
        });
      },
      (error) => this.setState({ error: error.message })
      // { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
    );
  }
  componentWillUnmount() {
    Geolocation.clearWatch(this.watchId);
  }
  render() {
    if(this.props.auth) {
      return <Redirect to='/chat' />
    } else {
      return (
        <View>
          <Text style={styles.heading}>Welcome to NuLand</Text>
          <Login />
        </View>
      )
    }
  }
}

const styles = StyleSheet.create({
  heading: {
    fontSize: 36,
    marginBottom: 20,
    fontWeight: 'bold'
  },
  link: {
    fontSize: 26,
    marginBottom: 20,
    marginTop: 20
  }
});

export default connect(mapStateToProps)(MainView);
