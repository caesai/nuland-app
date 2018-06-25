import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NativeRouter, Route, Link } from 'react-router-native';
import { Provider } from 'react-redux';
import {store} from './src/store';
import styled from 'styled-components';

import AuthenticatedContainer from './src/HOC/AuthenticatedContainer';

const MainContainer = styled.View`
  background: #ecf4fa;
  max-width: 800px;
`;

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <NativeRouter>
          <MainContainer style={{
            alignItems: 'center',
            flex: 1
          }}>
            <AuthenticatedContainer />
          </MainContainer>
        </NativeRouter>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
});
