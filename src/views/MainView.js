import React from 'react';
import { StyleSheet, Text, PermissionsAndroid, View, TextInput, Button } from 'react-native';
import { Link } from 'react-router-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../actions';
import {geoClient, checkStatus, parseJSON} from '../utils';

function mapDispatchToProps (dispatch){
  return bindActionCreators(ActionCreators, dispatch);
}

const Geolocation = navigator.geolocation;


async function requestPermission() {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        'title': 'Nuland needs your permission.',
        'message': `Nuland App needs permission to use your location`
      }
    )
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log("You can use the camera")
    } else {
      console.log("Camera permission denied")
    }
  } catch (err) {
    console.warn(err)
  }
}

class MainView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      latitude: null,
      longitude: null,
      'log': '',
      'pas': '',
      error: null
    };
  }
  componentDidMount() {
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
    console.log(this.props)
  }
  componentWillUnmount() {
    Geolocation.clearWatch(this.watchId);
  }
  render() {
    return (
      <View>
        <Text style={styles.heading}>NuLand</Text>
        <Text style={styles.link}>Login</Text>
        <TextInput style={styles.link}
          onChangeText={(e)=>{
            this.setState({
              'log': e
            })
          }
        }></TextInput>
        <Text style={styles.link}>Password</Text>
        <TextInput style={styles.link}
          secureTextEntry={true}
          onChangeText={(e)=>{
            this.setState({
              'pas': e
            })
          }
        }></TextInput>
        <Button onPress={()=>{
          geoClient.client.then(api => {
            const signin_request = api.client.signup(this.state.log.toLowerCase().toString(), this.state.pas.toString());

            fetch('http://188.226.153.11:4000/users/signin', {
              method: 'POST',
              body: signin_request,
              headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json'
              }
            })
            .then(checkStatus)
            .then(function(response) {
                console.log("Content-Type" + response.headers.get('Content-Type'))
                console.log("Date" + response.headers.get('Date'))
                console.log("Status" + response.status)
                console.log("Status text" + response.statusText)
                return response
            })
            .then(parseJSON)
            .then((data) => {
              console.log('request succeeded with JSON response', data);
              this.props.dispatch(ActionCreators.actions.auth(data));
              this.props.history.push('/chat');
            }).catch(function(error) {
              console.log('request failed', error)
            });
          })
        }} title='Sign In'></Button>
        <Link to='/about'><Text style={styles.link}>?</Text></Link>
      </View>
    )
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

const authStateToProps = (state) => ({
  auth: state.logIn.isAuthenticated,
  name: state.logIn.name
});

export default connect(mapDispatchToProps)(MainView);
