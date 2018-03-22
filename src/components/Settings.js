import React from 'react';
import {View, Text} from 'react-native';

class Settings extends React.Component {
  componentDidMount(){
    console.log('Settings')
  }
  render() {
    return(
      <View>
        <Text>Settings</Text>
      </View>
    )
  }
}

export default Settings;
