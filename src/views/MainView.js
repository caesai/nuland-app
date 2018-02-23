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
  openPopup() {
    this.props.openPopup()
  }
  render() {
    return (
      <View>
        <Text style={styles.heading}>NuLand Geo App</Text>
        <Link style={styles.link} to='/login'><Text>Sign In</Text></Link>
        <Link style={styles.link} to='/about'><Text>About</Text></Link>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  heading: {
    fontSize: 24,
    marginBottom: 20,
    fontWeight: 'bold'
  },
  link: {
    marginBottom: 10
  }
});

export default connect(()=>{ return {} }, mapDispatchToProps)(MainView);
