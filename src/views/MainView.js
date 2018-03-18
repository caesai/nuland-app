import React from 'react';
import { StyleSheet, Text, View, TouchableHighlight } from 'react-native';
import { Link } from 'react-router-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../actions';

function mapDispatchToProps (dispatch){
  return bindActionCreators(ActionCreators, dispatch);
}

class MainView extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <View>
        <Text style={styles.heading}>NuLand Geo App</Text>
        {
          this.props.auth ?
          <Text>Hello {this.props.name}</Text> :
          <Link to='/login'><Text style={styles.link}>Sign In</Text></Link>
        }
        <Link to='/about'><Text style={styles.link}>About</Text></Link>
      </View>
    )
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

const authStateToProps = (state) => ({
  auth: state.logIn.isAuthenticated,
  name: state.logIn.name
});

export default connect(authStateToProps, mapDispatchToProps)(MainView);
