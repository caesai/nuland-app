import { combineReducers} from 'redux';
import * as authReducers from './auth';
import * as popupReducers from './popup';
import * as geoLocation from './geoLocation';

export default combineReducers(Object.assign(
  authReducers,
  popupReducers,
  geoLocation
))
