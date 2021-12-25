import { combineReducers } from 'redux';
import { RootStateOrAny } from 'react-redux';
import { userReducer } from './user';
import { errorsReducer } from './errors';
import { UserState } from './user/types';
import { ErrorState } from './errors/types';

export interface RootGlobalState extends RootStateOrAny {
    userReducer: UserState;
    errorsReducer: ErrorState;
  }

export default combineReducers<RootGlobalState>({
  userReducer,
  errorsReducer,
});
