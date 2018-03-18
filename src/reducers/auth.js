import createReducer from '../lib/createReducer';
import * as ActionTypes from '../actions/types';

const initialState = {
  isAuthenticating: false,
  isAuthenticated: false,
  token: '',
  name: '',
  redirectingTo: ''
};

export const logIn = createReducer(initialState, {
  [ActionTypes.SIGNIN](state, action) {
    return {
      isAuthenticating: false,
      name: action.payload.username,
      isAuthenticated: true,
      token: action.payload.token
    }
  },
  [ActionTypes.LOGOUT](state, action) {
    return initialState
  }
});
