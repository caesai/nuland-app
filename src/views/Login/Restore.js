import React from 'react';
import { connect } from 'react-redux'
import { View, Text, TextInput, Button, Dimensions } from 'react-native';

const bip39 = require('bip39');
const secp256k1 = require('secp256k1');
const ethUtils = require('ethereumjs-util');

const { width } = Dimensions.get('window');

class Restore extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mnemonic: '',
      balance: 0
    }
  }
  restoreKey(mnemonic) {
    console.log(mnemonic);
    const keyHex = bip39.mnemonicToEntropy(mnemonic);
    const key = new Buffer(keyHex, 'hex');
    const pubKey = secp256k1.publicKeyCreate(key);
    const ethAddress = ethUtils.privateToAddress(key).toString('hex');

    fetch('http://194.58.122.82/balance',{
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({address: ethAddress})
    }).then((resp) => {
      return resp.json();
    }).then((data) => {
      console.log({
        key: key,
        private: key.toString('hex'),
        public: pubKey.toString('hex'),
        ethAddress: `0x${ethAddress.toUpperCase()}`,
        balance: data.balance
      });
    });

  }
  componentDidMount() {
  }
  render() {
    return(
      <View style={{
        width: width
      }}>
        <TextInput
          value={this.state.mnemonic}
          ref={(input) => { textInp = input }}
          placeholder='Enter your mnemonic passphrase'
          onChangeText={(e)=>{
            this.setState({
              'mnemonic': e
            })
          }}/>
          <Button
            title='Send'
            onPress={()=>{
              this.restoreKey(this.state.mnemonic);
            }}/>
      </View>
    )
  }
}

const mapStateToProps = (state) => ({

});

export default connect(mapStateToProps)(Restore)
