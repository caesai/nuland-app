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
  redirectingTo: '',
  key: '',
  private: null,
  public: null,
  address: null,
  wif: null,
  mnemonic: null
};

export const logIn = createReducer(initialState, {
  [ActionTypes.SIGNIN](state, action) {
    setUserData(action.payload)
    return {
      isAuthenticating: false,
      name: action.payload.username,
      isAuthenticated: true,
      token: action.payload.token,
      key: action.payload.key,
      private: action.payload.private,
      public: action.payload.public,
      mnemonic: action.payload.mnemonic,
      address: action.payload.address,
      ethAddress: action.payload.ethAddress
    }
  },
  [ActionTypes.LOGIN](state, action) {
    return {
      name: action.payload.username,
      isAuthenticated: true,
      token: action.payload.token,
      key: action.payload.key,
      private: action.payload.private,
      mnemonic: action.payload.mnemonic,
      public: action.payload.public,
      address: action.payload.address,
      ethAddress: action.payload.ethAddress
    }
  },
  [ActionTypes.LOGOUT](state, action) {
    logOutUser();
    return initialState
  }
});
