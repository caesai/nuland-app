import createReducer from '../lib/createReducer';
import * as ActionTypes from '../actions/types';

function startBot() {
  return fetch('http://194.58.122.82/bot/start',{
    method: 'get',
  }).then((resp)=>{
    return resp.json();
  }).then((data) =>{
    return data.message
  })
}

const initialState = {
  botMessage: ''
}

export const nulandBot = createReducer(initialState, {
  [ActionTypes.START](state, action) {
    let botMessage = startBot();
    console.log(botMessage);
    return {
      botMessage: botMessage
    };
  }
});
