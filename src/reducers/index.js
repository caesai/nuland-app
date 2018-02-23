import { combineReducers} from 'redux';
import * as authReducers from './auth';
import * as popupReducers from './popup';

export default combineReducers(Object.assign(
  authReducers,
  popupReducers
))
