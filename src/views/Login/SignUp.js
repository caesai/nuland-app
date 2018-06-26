import React from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import _ from 'lodash';
import { connect } from 'react-redux';
import { ActionCreators } from '../../actions';

const bip39 = require('bip39');
const crypto = require('crypto');
const secp256k1 = require('secp256k1');
const bitcoin = require('bitcoinjs-lib');
const ethUtils = require('ethereumjs-util');

class SignUp extends React.Component{
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      key: '',
      private: null,
      public: null,
      address: null,
      ethAddress: null,
      mnemonic: null
    }
  }
  generatePrivateKey(){
    return new Promise ((resolve, reject) => {
        crypto.randomBytes(32, (err, buf) => {
          if (err) reject(err);
          resolve(buf);
        });
      }
    )
  }
  componentDidMount() {
    this.generatePrivateKey().then( key => {
      const pubKey = secp256k1.publicKeyCreate(key);
      this.setState({
        key: key,
        private: key.toString('hex'),
        public: pubKey.toString('hex')
      });
    })
  }
  render() {
    return(
      <View>
        <Text>Private key: {this.state.private && this.state.private}</Text>
        <Text>Public key: {this.state.public && this.state.public}</Text>
        <Text>ETH Address: {this.state.ethAddress && this.state.ethAddress}</Text>
        <Text>Mnemonic seed: {this.state.mnemonic && this.state.mnemonic.map((word, key) =>{
          return <Text key={key}>{word} </Text>
        })}</Text>
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
              'username': e
            })
          }}/>
        <Button
          onPress={()=>{
            let mnemonic = bip39.entropyToMnemonic(this.state.key).split(' ');
            let phrase = _.join(mnemonic, ' ');
            let seedBuffer = bip39.mnemonicToSeed(phrase);
            let ethAddress = ethUtils.privateToAddress(this.state.key).toString('hex');

            this.setState({
              mnemonic: mnemonic,
              ethAddress: `0x${ethAddress.toUpperCase()}`
            });
            this.props.dispatch(ActionCreators.actions.signup({
              username: this.state.username,
              key: this.state.key,
              private: this.state.private,
              public: this.state.public,
              mnemonic: mnemonic,
              balance: 0,
              ethAddress: `0x${ethAddress.toUpperCase()}`,
              token: ''
            }));
          }}
          title='Create user'/>
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
})

export default connect(mapStateToProps)(SignUp)
