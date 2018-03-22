import React from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import { connect } from 'react-redux';
import { ActionCreators } from '../actions';
import {geoClient, checkStatus, parseJSON} from '../utils';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      'log': '',
      'pas': ''
    }
  }
  render() {
    return(
      <View>
        <Text style={styles.heading}>Sign In</Text>
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
            }).catch(function(error) {
              console.log('request failed', error)
            });
          })
        }} title='Sign In'></Button>
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
    fontSize: 24,
    marginBottom: 10
  }
});

const mapStateToProps = (state) => ({
  auth: state.logIn.isAuthenticated,
  name: state.logIn.name
})

export default connect(mapStateToProps)(Login);
