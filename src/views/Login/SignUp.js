import React from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import _ from 'lodash';
import { connect } from 'react-redux';
import { ActionCreators } from '../../actions';

const bip39 = require('bip39');
const crypto = require('crypto');
const hash256 = crypto.createHash('sha256');
const secp256k1 = require('secp256k1');
const bitcoin = require('bitcoinjs-lib');
const ethUtils = require('ethereumjs-util');
const Exonum = require('exonum-client');

class SignUp extends React.Component{
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      key: '',
      private: null,
      public: null,
      ethAddress: null,
      mnemonic: null
    }
    this.generatePrivateKey = this.generatePrivateKey.bind(this);
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

  }
  render() {
    return(
      <View>

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

            this.generatePrivateKey().then( rndmBts => {
              let privKeyHex = hash256.update(rndmBts.toString('hex') + this.state.username);
              const key = new Buffer(privKeyHex.digest('hex'), 'hex');
              let pubKey = secp256k1.publicKeyCreate(key);

              let mnemonic = bip39.entropyToMnemonic(key).split(' ');
              let ethAddress = ethUtils.privateToAddress(key).toString('hex');

              this.setState({
                privKey: key.toString('hex'),
                pubKey: pubKey.toString('hex')
              });

              const CreateTransaction = {
                protocol_version: 0,
                service_id: 128,
                message_id: 2,
                fields: [
                  { name: 'pub_key', type: Exonum.PublicKey },
                  { name: 'name', type: Exonum.String }
                ]
              }

              const data = {
                pub_key: this.state.pubKey,
                name: this.state.username
              }

              const TxCreateWallet = Exonum.newMessage(CreateTransaction);
                
              const signature = TxCreateWallet.sign(key.toString('hex') , data);

              TxCreateWallet.signature = signature;

              const hash = TxCreateWallet.hash(data);

              TxCreateWallet.send('http://146.185.145.5', '/api/explorer/v1/transactions/', data, signature)
              .then(() => {
                console.log(data);
                this.setState({
                  mnemonic: mnemonic,
                  ethAddress: `0x${ethAddress.toUpperCase()}`,
                  tx_hash : hash
                });
              });

              this.props.dispatch(ActionCreators.actions.signup({
                username: this.state.username,
                privKey: this.state.privKey,
                pubKey: this.state.pubKey,
                mnemonic: mnemonic,
                balance: 0,
                ethAddress: `0x${ethAddress.toUpperCase()}`,
                tx_hash : this.state.hash
              }));
            });

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
  ethAddress: state.logIn.ethAddress,
  tx_hash: state.logIn.tx_hash
})

export default connect(mapStateToProps)(SignUp)
