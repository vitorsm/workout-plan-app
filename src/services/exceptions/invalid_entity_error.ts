import { GenericError } from './generic_error';

class InvalidEntityError extends Error implements GenericError {
  title: string;

  descriptions: string[];

  constructor(entityName: string, fields: string[]) {
    const title = `Can't persist ${entityName}`;
    super(title);

    this.title = title;
    this.descriptions = fields;
  }
}

export default InvalidEntityError;
