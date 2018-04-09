import {
  AUTH_USER, AUTH_USER_SUCCESS, AUTH_USER_FAILURE,
  RESET_AUTHED_USER,
  DELETE_USER, DELETE_USER_SUCCESS, DELETE_USER_FAILURE
} from '../constants';

export const initialState = {
  authedUser: {
    loading: false,
    error: null,
    message: null,
    token: null,
    user: null
  }
};

export function userReducer(state = initialState, action) {
  if (!action || !action.type) action = { type: '' }

  switch (action.type) {

    case (AUTH_USER || DELETE_USER):
      return {
        authedUser: {
          ...state.authedUser,
          loading: true, error: null, message: null
        }
      };

    case (AUTH_USER_FAILURE || DELETE_USER_FAILURE):
      return {
        authedUser: {
          loading: false,
          error: action.error.message,
          ...state.authedUser,
        }
      };

    case AUTH_USER_SUCCESS:
      return {
        authedUser: {
          error: null,
          loading: false,
          message: action.message,
          token: action.user.token,
          user: action.user
        }
      };

    case RESET_AUTHED_USER:
      return {
        authedUser: {
          loading: false, error: null, message: null, token: null, user: null
        }
      };

    case DELETE_USER_SUCCESS:
      return {
        authedUser: {
          ...state.authedUser,
          loading: false, token: null, user: null,
          message: action.message,
        }
      };

    default:
      return state;
  }
}
