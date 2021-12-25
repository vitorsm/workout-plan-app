import { GenericError } from '../../../services/exceptions/generic_error';
import { ErrorTypes } from './types';

export const setGenericError = (genericError: GenericError) => ({
  type: ErrorTypes.GENERIC_ERROR,
  payload: genericError,
});
