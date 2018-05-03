import React from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import _ from 'lodash';

import crypto from '../utils/key';
const bip39 = require('bip39');

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
            const mnemonic = bip39.entropyToMnemonic(this.state.key).split(' ');
            let mnemonicPhrase = _.join(mnemonic, ' ');
            const privatek = bip39.mnemonicToEntropy(mnemonicPhrase)
            console.log(privatek)
            this.setState({
              mnemonic: mnemonicPhrase,
              private: privatek
            })
          }}
          title='Create mnemonic'/>
      </View>
    )
  }
}

export default SignUp
