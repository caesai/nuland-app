import React from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../actions';

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
        <Button onPress={()=>{}} title='Sign In'></Button>
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
