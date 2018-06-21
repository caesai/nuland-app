import * as AuthActions from './auth';
import * as NavActions from './auth';
import * as PopupActions from './popup';
import * as BotActions from './bot';

export const ActionCreators = Object.assign({}, AuthActions, NavActions, BotActions);
