import React from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../actions';

const fs = require('fs');

function instantiate(bytes, imports) {
  return WebAssembly.compile(bytes).then(m => new WebAssembly.Instance(m, imports));
}

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      'log': '',
      'pas': ''
    }
  }
  logIn() {

  }
  componentDidMount() {
    // async function run() {
    //   const {signup} = await loadWasm('../wasm/geoclient.wasm');
    //   const result = signup();
    //   console.log(`result: ${result}`);
    // }
    //
    // run();

  }
  render() {
    return(
      <View>
        <Text style={styles.heading}>Sign In</Text>
        <Text>Login</Text>
        <TextInput
          onChangeText={(e)=>{
            this.setState({
              'log': e
            })
          }
        }></TextInput>
        <Text>Password</Text>
        <TextInput
          secureTextEntry={true}
          onChangeText={(e)=>{
            this.setState({
              'pas': e
            })
          }
        }></TextInput>
        <Button title='Sign In' onPress={()=>{this.logIn()}}></Button>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  heading: {
    fontSize: 24,
    marginBottom: 20,
    fontWeight: 'bold'
  },
  link: {
    marginBottom: 10
  }
});

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

export default connect(mapDispatchToProps)(Login);
