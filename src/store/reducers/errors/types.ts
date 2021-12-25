import { GenericError } from '../../../services/exceptions/generic_error';

export enum ErrorTypes {
    GENERIC_ERROR = '@error/GENERIC_ERROR'
}

export interface ErrorState {
    error: GenericError | undefined
}
