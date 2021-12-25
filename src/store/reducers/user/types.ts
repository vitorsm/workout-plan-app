import { TokenData } from '../../../models/token_data';
import { User } from '../../../models/user';

export enum UserTypes {
  SET_AUTHENTICATE = '@user/SET_AUTHENTICATE',
  SET_CREATED = '@user/SET_CREATED'
}

export interface UserState {
  readonly tokenData?: TokenData;
  readonly createdUser?: User;
}
