import React from 'react';
// import requireAuthentication from '../containers/AuthenticatedComponent'
import { StyleSheet, Text, View } from 'react-native';
import { NativeRouter, Route, Link } from 'react-router-native';
import requireAuthentication from '../HOC/AuthenticatedContainer';

import Home from '../views/MainView';
import About from '../views/About';
import Chat from '../views/Chat';
import Account from '../views/Account';

const routes = (
    <View>
        <Route exact path='/' component={Home} />
        <Route exact path='/about' component={About} />
        <Route exact path='/chat' component={requireAuthentication(Chat)} />
        <Route exact path='/account' component={requireAuthentication(Account)} />
    </View>
)

export default routes;
