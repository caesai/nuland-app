import React from 'react';
import { Text, TextInput, View, Button } from 'react-native';
import { connect } from 'react-redux';
import { actions } from '../actions/auth';

class Account extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      latitude: null,
      longitude: null,
      mnemonic: props.mnemonic || [],
      error: null
    }
  }
  componentDidMount() {
  }
  render() {
    return(
      <View style={{
        paddingHorizontal: 10
      }}>
        <Text>User: {this.props.name}</Text>
        <Text>Private: {this.props.private}</Text>
        <Text>Public: {this.props.public}</Text>
        <Text>Balance: 0 NLD</Text>
        <Text>BTC: {this.props.address}</Text>
        <Text>ETH: {this.props.ethAddress}</Text>
        <Text>Mnemonic: {this.props.mnemonic.map((word, key) =>{
          return <Text key={key}>{word} </Text>
        })}</Text>
        <Text>Location:</Text>
        <Text>Lat: {this.props.geo.lat}</Text>
        <Text>Lon: {this.props.geo.lon}</Text>
        {this.state.error ? <Text>Error: {this.state.error}</Text> : null}
        <Button
          onPress={()=>{
            this.props.dispatch(actions.logout());
          }}
          title='logout'></Button>
      </View>
    )
  }
}

const authStateToProps = (state) => (console.log(state),{
  auth: state.logIn.isAuthenticated,
  name: state.logIn.name,
  geo: state.geoLocation.location,
  key: state.logIn.key,
  private: state.logIn.private,
  public: state.logIn.public,
  address: state.logIn.address,
  mnemonic: state.logIn.mnemonic,
  ethAddress: state.logIn.ethAddress
});

export default connect(authStateToProps)(Account);
