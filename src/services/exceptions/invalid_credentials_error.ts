import { GenericError } from './generic_error';

class InvalidCredentialsError extends Error implements GenericError {
  title: string;

  descriptions: string[];

  constructor(login: string) {
    const title = 'Invalid credentials';
    super(title);

    this.title = title;
    this.descriptions = [`The credentials for user ${login} is invalid`];
  }
}

export default InvalidCredentialsError;
