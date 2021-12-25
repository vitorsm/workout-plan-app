import { GenericError } from './generic_error';

class ServerError extends Error implements GenericError {
  title: string;

  descriptions: string[];

  constructor(description: string) {
    const title = 'Server error';
    super(title);

    this.title = title;
    this.descriptions = ['An unexpected error occurred on server side', description];
  }
}

export default ServerError;
