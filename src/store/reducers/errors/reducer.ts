import { Reducer } from 'redux';
import { ErrorState, ErrorTypes } from './types';

const INITIAL_STATE: ErrorState = {
  error: undefined,
};

const reducer: Reducer<ErrorState> = (state = INITIAL_STATE, action) => {
  console.log('call error reducer', action);
  switch (action.type) {
    case ErrorTypes.GENERIC_ERROR:
      console.log('call error reducer', action);
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
