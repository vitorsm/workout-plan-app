import { User } from '../models/user';
import APIClient from './api_client';
import InvalidCredentialsError from './exceptions/invalid_credentials_error';
import NetworkError from './exceptions/network_error';
import ServerError from './exceptions/server_error';

export default class UserAPIClient extends APIClient {
  async createUser(user: User) {
    let response = null;

    try {
      response = await this.post('/v1/user', user);
    } catch (error) {
      APIClient.handleAxiosException(error);
    }

    return response ? response.data : null;
  }

  async authenticate(login: string, password: string) {
    const credentials = {
      username: login,
      password,
    };

    try {
      const response = await this.post('/v1/auth/authenticate', credentials);
      return response.data;
    } catch (error: any) {
      const responseStatus = error.toJSON().status;
      const responseData = error.response ? error.response.data : null;

      if (!responseStatus) {
        throw new NetworkError();
      }

      if (responseStatus === 401) {
        throw new InvalidCredentialsError(login);
      }

      const errorMessage = responseData.message ? responseData.message : 'Error when try to authenticate';
      throw new ServerError(errorMessage);
    }
  }
}
