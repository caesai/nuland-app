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
  privKey: null,
  pubKey: null,
  ethAddress: null,
  balance: 0,
  mnemonic: null,
  tx_hash: ''
};

export const logIn = createReducer(initialState, {
  [ActionTypes.SIGNIN](state, action) {
    return {
      isAuthenticating: false,
      name: action.payload.username,
      isAuthenticated: true,
      token: action.payload.token,
      key: action.payload.key,
      privKey: action.payload.privKey,
      pubKey: action.payload.pubKey,
      mnemonic: action.payload.mnemonic,
      address: action.payload.address,
      ethAddress: action.payload.ethAddress,
      balance: action.payload.balance,
      tx_hash: action.payload.tx_hash
    }
  },
  [ActionTypes.SIGNUP](state, action) {
    setUserData(action.payload)
    return {
      name: action.payload.username,
      isAuthenticated: true,
      token: action.payload.token,
      privKey: action.payload.privKey,
      mnemonic: action.payload.mnemonic,
      pubKey: action.payload.pubKey,
      address: action.payload.address,
      ethAddress: action.payload.ethAddress,
      balance: action.payload.balance,
      tx_hash: action.payload.tx_hash
    }
  },
  [ActionTypes.LOGOUT](state, action) {
    logOutUser();
    return initialState
  }
});
