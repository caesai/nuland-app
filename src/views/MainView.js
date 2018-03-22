import React from 'react';
import { StyleSheet, Text, View, AsyncStorage } from 'react-native';
import { connect } from 'react-redux';
import {Redirect} from 'react-router-native';
import Login from '../components/Login';
import {actions} from '../actions/auth';

const mapStateToProps = (state) => ({
  auth: state.logIn.isAuthenticated
});

class MainView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
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
  componentDidMount() {
    this.getUserData();
  }
  render() {
    if(this.props.auth) {
      return <Redirect to='/chat' />
    } else {
      return (
        <View>
          <Text style={styles.heading}>Welcome to NuLand</Text>
          <Login />
        </View>
      )
    }
  }
}

const styles = StyleSheet.create({
  heading: {
    fontSize: 36,
    marginBottom: 20,
    fontWeight: 'bold'
  },
  link: {
    fontSize: 26,
    marginBottom: 20,
    marginTop: 20
  }
});

export default connect(mapStateToProps)(MainView);
