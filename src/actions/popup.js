import * as types from './types';

export function openPopup() {
  return {
    type: types.OPEN_POPUP
  }
}

export function closePopup() {
  return {
    type: types.CLOSE_POPUP
  }
}
