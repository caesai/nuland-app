import React from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import { connect } from 'react-redux';
import { ActionCreators } from '../../actions';
import { checkStatus, parseJSON} from '../../utils';

class SignIn extends React.Component {
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
        <TextInput
          style={{
            backgroundColor: '#fff',
            marginTop: 15,
            marginBottom: 15,
            opacity: 0.6,
            width: 300
          }}
          placeholder="Your name"
          onChangeText={(e)=>{
            this.setState({
              'log': e
            })
          }
        }></TextInput>
        <TextInput
          style={{
            backgroundColor: '#fff',
            width: 300,
            marginTop: 15,
            marginBottom: 15,
            opacity: 0.6
          }}
          placeholder="Your password"
          secureTextEntry={true}
          onChangeText={(e)=>{
            this.setState({
              'pas': e
            })
          }
        }></TextInput>
        <Button onPress={()=>{
          this.props.dispatch(ActionCreators.actions.signin({
            username: this.state.log,
            balance: 0,
            isAuthenticated: true,
            key: '',
            private: '',
            public: '',
            mnemonic: [],
            address: '',
            ethAddress: '',
            token: ''
          }));
        }} title='Sign In'></Button>
      </View>
    )
  }
}


const mapStateToProps = (state) => ({
  auth: state.logIn.isAuthenticated,
  name: state.logIn.name
})

export default connect(mapStateToProps)(SignIn);
