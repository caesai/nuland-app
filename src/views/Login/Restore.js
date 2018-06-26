import React from 'react';
import { connect } from 'react-redux'
import { View, Text, TextInput, Button, Dimensions } from 'react-native';
import { actions } from '../../actions/auth';

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
    const keyHex = bip39.mnemonicToEntropy(mnemonic);
    const key = new Buffer(keyHex, 'hex');
    const pubKey = secp256k1.publicKeyCreate(key);
    const ethAddress = ethUtils.privateToAddress(key).toString('hex');
    const address = `0x${ethAddress.toUpperCase()}`;

    console.log({
      name: 'Sushka',
      key: key,
      private: key.toString('hex'),
      public: pubKey.toString('hex'),
      ethAddress: address,
    })

    fetch('http://194.58.122.82/balance',{
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({address: address})
    }).then((resp) => {
      return resp.json();
    }).then((data) => {

      this.props.dispatch(actions.signin({
        username: '',
        key: key,
        private: key.toString('hex'),
        public: pubKey.toString('hex'),
        mnemonic: mnemonic.split(' '),
        ethAddress: address,
        balance: data.balance
      }));
    });

  }
  render() {
    return(
      <View>
        <TextInput
          style={{
            width: 300
          }}
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
            style={{
              width: 300
            }}
            onPress={()=>{
              this.restoreKey(this.state.mnemonic);
            }}/>
      </View>
    )
  }
}

const mapStateToProps = (state) => ({
  auth: state.logIn.isAuthenticated,
  name: state.logIn.name,
  key: state.logIn.key,
  private: state.logIn.private,
  public: state.logIn.public,
  mnemonic: state.logIn.mnemonic,
  address: state.logIn.address,
  ethAddress: state.logIn.ethAddress
});

export default connect(mapStateToProps)(Restore)
