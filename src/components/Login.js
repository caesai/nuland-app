import React from 'react';
import { StyleSheet, Text, View, TextInput } from 'react-native';

export default class Login extends React.Component {
  render() {
    return (
      <View>
        <Text>Login</Text>
        <TextInput></TextInput>
        <Text>Password</Text>
        <TextInput></TextInput>
      </View>
    )
  }
}
