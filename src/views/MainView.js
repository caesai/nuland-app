import React from 'react';
import { View, AsyncStorage, NetInfo, Image } from 'react-native';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-native';
import Login from '../components/Login';
import SignUp from '../components/SignUp';
import {actions} from '../actions/auth';
import styled from 'styled-components';

const mapStateToProps = (state) => ({
  auth: state.logIn.isAuthenticated
});

const Title = styled.Text`
  font-size: 32px;
  color: #0073b2;
  padding-bottom: 5px;
`;

const SubTitle = styled.Text`
  color: #1d82bb;
  font-size: 22px;
  text-align: center;
`;

const LoginBtn = styled.Text`
  background-color: #d1deea;
  color: #4486b0;
  height: 50px;
  padding: 10px;
  font-size: 18px;
  width: 80px;
  text-align:center;
  margin-right: 15px;
`;

class MainView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      status: false,
      connection: '',
      activeBtn: 0,
      auth: false
    };
  }
  async getUserData() {
    try {
      const value = await AsyncStorage.getItem('nuland.storage');
      if (value !== null){
        console.log(value);
        this.props.dispatch(actions.login(JSON.parse(value)));
      }
    } catch (error) {
      console.log(error);
    }
  }
  handleConnectionChange = (isConnected) => {
    this.setState({ status: isConnected });
    this.setState({ connection: `is connected: ${this.state.status}`});
  }
  componentDidMount() {
    this.getUserData();
    NetInfo.isConnected.addEventListener('connectionChange', this.handleConnectionChange);

    NetInfo.isConnected.fetch().done(
      (isConnected) => { this.setState({ status: isConnected }); }
    );
  }
  render() {
    let logo = require('../img/logo.png');
    if(this.props.auth) {
      return <Redirect to='/chat' />
    } else {
      return (
        <View style={{
          flex: 1,
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          width: 300
        }}>
          <View style={{
            flexDirection: 'row',
            flex: 1,
            maxHeight: 50
          }}>
            <Image
              style={{
                flexDirection: 'row',
                alignSelf: 'flex-start'
              }}
              source={logo} />
            <Title style={{
              alignSelf: 'flex-end'
            }}>NuLand</Title>
          </View>
          <SubTitle>Embedding physical reality into cyberspace</SubTitle>
          <View style={{
            flex: 1,
            flexDirection: 'row',
            alignSelf: 'flex-start',
            marginTop: 30,
            maxHeight: 50
          }}>
            <LoginBtn
              style={{flexDirection: 'row', alignSelf: 'flex-start'}}
              onPress={()=>{
                this.setState({
                  activeBtn: 0
                })
              }}>SignIn</LoginBtn>
            <LoginBtn
              style={{color: '#75a1c1'}}
              onPress={()=>{
                this.setState({
                  activeBtn: 1
                })
              }}>SignUp</LoginBtn>
          </View>
          {
            this.state.activeBtn == 0 ? <Login /> : <SignUp />
          }
        </View>
      )
    }
  }
}

export default connect(mapStateToProps)(MainView);
