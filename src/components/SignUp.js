import React from 'react';
import { View, Text, TextInput, Button } from 'react-native';

import crypto from '../utils/key';

class SignUp extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      key: '',
      private: null,
      mnemonic: null
    }
  }
  createPrivateKey() {
    crypto.randomBytes(32)
      .then((privateKey) => {
        this.setState({
          key: privateKey
        })
        return privateKey;
      })
      .catch((err)=>{console.log(err)});
  }
  componentDidMount() {
    this.createPrivateKey();
  }
  render() {
    return(
      <View>
        <Text>{this.state.mnemonic && this.state.mnemonic}</Text>
        <Button
          onPress={()=>{
          
          }}
          title='SignUp'/>
      </View>
    )
  }
}

export default SignUp
