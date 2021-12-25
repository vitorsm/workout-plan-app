import AsyncStorage from '@react-native-async-storage/async-storage';
import Axios, { AxiosRequestConfig } from 'axios';
import DuplicateEntity from './exceptions/duplicate_entity';
import InvalidEntityError from './exceptions/invalid_entity_error';
import NetworkError from './exceptions/network_error';

const serverURL = 'http://192.168.100.48:5000/';

export default class APIClient {
  apiAddress: string;

  constructor(apiAddress: string = serverURL) {
    this.apiAddress = apiAddress;
  }

  post = (
    endpoint: string,
    data: any,
    config?: AxiosRequestConfig,
  ) => {
    const address = this.getAddress(endpoint);
    const response = Axios.post(address, data, APIClient.getAxiosConfig(config));

    return response;
  };

  put(
    endpoint: string,
    data: any,
    config?: AxiosRequestConfig,
  ) {
    const address = this.getAddress(endpoint);
    const response = Axios.put(address, data, APIClient.getAxiosConfig(config));

    return response;
  }

  get(
    endpoint: string,
    config?: AxiosRequestConfig,
  ) {
    const address = this.getAddress(endpoint);
    return Axios.get(address, APIClient.getAxiosConfig(config));
  }

  delete(
    endpoint: string,
    config?: AxiosRequestConfig,
  ) {
    const address = this.getAddress(endpoint);
    return Axios.delete(address, APIClient.getAxiosConfig(config));
  }

  getAddress(endpoint: string): string {
    return this.apiAddress + endpoint;
  }

  static async getDefaultHeader() {
    const token = await AsyncStorage.getItem('token');

    return {
      Authorization: `JWT ${token}`,
      'Content-Type': 'Application/json',
    };
  }

  static getAxiosConfig(config?: AxiosRequestConfig): AxiosRequestConfig {
    if (config) {
      return config;
    }

    return {
      headers: this.getDefaultHeader(),
    };
  }

  static handleAxiosException(error: any) {
    const responseStatus = error.toJSON ? error.toJSON().status : 0;
    const responseData = error.response ? error.response.data : null;

    if (!responseStatus) {
      throw new NetworkError();
    }

    const { message } = responseData;

    if (responseStatus === 409) {
      APIClient.handleDuplicateEntity(message);
    } else if (responseStatus === 400) {
      APIClient.handleBadRequestEntity(message);
    }

    throw new Error('Error when try to authenticate');
  }

  static handleDuplicateEntity(message: string) {
    const splitMessage = message.split(' ');

    if (splitMessage.length === 1) {
      throw new DuplicateEntity('', '');
    }

    const entityName = splitMessage[1];
    const entityId = splitMessage[splitMessage.length - 1];

    throw new DuplicateEntity(entityName, entityId);
  }

  static handleBadRequestEntity(message: string) {
    let splitMessage = message.split(' ');

    if (splitMessage.length === 1) {
      throw new InvalidEntityError('', []);
    }

    const entityName = splitMessage[1];
    splitMessage = message.split(': ');

    if (splitMessage.length === 1) {
      throw new InvalidEntityError(entityName, []);
    }

    splitMessage = message.split('[');

    if (splitMessage.length === 1) {
      throw new InvalidEntityError(entityName, []);
    }

    splitMessage = splitMessage[1].split(', ');

    const fields = splitMessage.map((item) => item.substring(1, item.length - 1));
    const lastItem = fields[fields.length - 1];
    fields[fields.length - 1] = lastItem.substring(0, lastItem.length - 1);

    throw new InvalidEntityError(entityName, fields);
  }
}
