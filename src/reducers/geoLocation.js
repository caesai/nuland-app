import createReducer from '../lib/createReducer';
import * as ActionTypes from '../actions/types';

const initialState = {
  location: {
    lat: '',
    lon: ''
  }
}

export const geoLocation = createReducer(initialState, {
  [ActionTypes.GETLOCATION](state, action) {
    return {
      location: {
        lat: action.payload.lat,
        lon: action.payload.lon
      }
    }
  }
})
