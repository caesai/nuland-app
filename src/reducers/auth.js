import createReducer from '../lib/createReducer';
import * as ActionTypes from '../actions/types';
import {AsyncStorage} from 'react-native';

async function setUserData(data) {
  try {
    await AsyncStorage.setItem('nuland.storage', JSON.stringify(data))
  } catch(err) {
    console.log(err)
  }
}

async function logOutUser() {
  try {
    await AsyncStorage.removeItem('nuland.storage')
  } catch(err) {
    console.log(err)
  }
}

const initialState = {
  isAuthenticating: false,
  isAuthenticated: false,
  token: '',
  name: '',
  redirectingTo: ''
};

export const logIn = createReducer(initialState, {
  [ActionTypes.SIGNIN](state, action) {
    setUserData(action.payload)
    return {
      isAuthenticating: false,
      name: action.payload.username,
      isAuthenticated: true,
      token: action.payload.token
    }
  },
  [ActionTypes.LOGIN](state, action) {
    console.log(action)
    return {
      name: action.payload.username,
      isAuthenticated: true,
      token: action.payload.token
    }
  },
  [ActionTypes.LOGOUT](state, action) {
    logOutUser();
    return initialState
  }
});
