import React from 'react';
// import requireAuthentication from '../containers/AuthenticatedComponent'
import { StyleSheet, Text, View } from 'react-native';
import { NativeRouter, Route, Link } from 'react-router-native'

import Home from '../views/MainView';
import About from '../views/About';
import Chat from '../views/Chat';
import Account from '../views/Account';

const routes = (
    <View>
      <Route exact path='/' component={Home} />
      <Route exact path='/about' component={About} />
      <Route exact path='/chat' component={Chat} />
      <Route exact path='/account' component={Account} />
    </View>
)

export default routes;
