import React from 'react';
import { View } from 'react-native';
import { Route } from 'react-router-native';
import requireAuthentication from '../HOC/AuthenticatedContainer';

import Home from '../views/MainView';
import About from '../views/About';
import Chat from '../views/Chat';
import CameraView from '../views/Camera';
import Account from '../views/Account';

const routes = (
    <View>
        <Route exact path='/' component={Home} />
        <Route path='/about' component={About} />
        <Route path='/chat' component={requireAuthentication(Chat)} />
        <Route path='/camera' component={requireAuthentication(CameraView)} />
        <Route path='/account' component={requireAuthentication(Account)} />
    </View>
)

export default routes;
