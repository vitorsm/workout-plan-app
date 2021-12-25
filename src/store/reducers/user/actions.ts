import { TokenData } from '../../../models/token_data';
import { User } from '../../../models/user';
import { UserTypes } from './types';

export const setTokenData = (tokenData: TokenData) => ({
  type: UserTypes.SET_AUTHENTICATE,
  payload: tokenData,
});

export const setCreatedUser = (user: User) => ({
  type: UserTypes.SET_CREATED,
  payload: user,
});
