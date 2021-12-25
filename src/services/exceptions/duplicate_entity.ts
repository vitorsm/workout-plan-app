import { GenericError } from './generic_error';

class DuplicateEntity extends Error implements GenericError {
  title: string;

  descriptions: string[];

  constructor(entityName: string, entityId: string) {
    const title = `${entityName} ${entityId} is duplicate`;
    super(title);

    this.title = title;
    this.descriptions = [];
  }
}

export default DuplicateEntity;
