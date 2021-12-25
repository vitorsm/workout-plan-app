import AsyncStorage from '@react-native-async-storage/async-storage';
import { Dispatch } from 'react';
import { User } from '../../../models/user';
import UserAPIClient from '../../../services/user_api_client';
import * as userActions from './actions';
import * as errorActions from '../errors/actions';

export const authenticate = (login: string, password: string) => async (dispath: Dispatch<any>) => {
  try {
    const tokenData = await new UserAPIClient().authenticate(login, password);

    AsyncStorage.setItem('token', tokenData.access_token);
    dispath(userActions.setTokenData(tokenData));
  } catch (error: any) {
    dispath(errorActions.setGenericError(error));
  }
};

export const createUser = (user: User) => async (dispath: Dispatch<any>) => {
  try {
    const createdUser = await new UserAPIClient().createUser(user);
    dispath(userActions.setCreatedUser(createdUser));
  } catch (error: any) {
    dispath(errorActions.setGenericError(error));
  }
};
