import _ from 'lodash';
import { SIGN_IN, SIGN_IN_API, AUTHENTICATED, UNAUTHENTICATED } from './constants';
import { PENDING, FULFILLED, REJECTED, lastFetchValidCheck } from 'store/lib';

let initialState = {
  isLoading: true,
  authenticated: false,
  error: false,
};

let lastFetchValid;

const moduleReducer = (state = initialState, action) => {
  switch (action.type) {
    case `${SIGN_IN}${PENDING}`:
      return {
        ...state,
        isLoading: true,
        error: false,
      };

    case `${SIGN_IN}${FULFILLED}`:
      return {
        ...state,
        isLoading: false,
      };

    case `${SIGN_IN}${REJECTED}`:
      return {
        ...state,
        error: true,
      };
    case `${AUTHENTICATED}`:
      return {
        ...state,
        authenticated: true,
        isLoading: false,
      };
    case `${UNAUTHENTICATED}`:
      return {
        ...state,
        authenticated: false,
        isLoading: false,
      };

    default:
      return state;
  }
};

export default moduleReducer;
