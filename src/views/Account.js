import React from 'react';
import { Text, TextInput, View, Button } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../actions';



class Account extends React.Component{
  componentDidMount() {
    console.log(this.props)
  }
  render() {
    return(
      <View>

      </View>
    )
  }
}

const authStateToProps = (state) => ({
  auth: state.logIn.isAuthenticated,
  name: state.logIn.name
});

function mapDispatchToProps (dispatch){
  return bindActionCreators(ActionCreators, dispatch, authStateToProps);
}

export default connect(mapDispatchToProps)(Account);
