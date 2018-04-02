import createReducer from '../lib/createReducer';
import * as ActionTypes from '../actions/types';

const initialState = {
  activeTab: 0
}

export const nav = createReducer(initialState, {
  [ActionTypes.SET_TAB](state, action) {
    return {
      activeTab: action.payload.index
    }
  }
})
