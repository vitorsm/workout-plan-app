import { GenericError } from './generic_error';

class NetworkError extends Error implements GenericError {
  title: string;

  descriptions: string[];

  constructor() {
    const title = 'Can\'t connect with server';
    super(title);

    this.title = title;
    this.descriptions = ['Check your network connection'];
  }
}

export default NetworkError;
