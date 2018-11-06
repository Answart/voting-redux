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

export function userReducer(state = initialState, action = {}) {
  let payload, user;

  if (!action.type) action.type = '';
  if (!action.payload) action.payload = {};
  payload = action.payload;

  // console.log('reducer', action);

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
          error: payload.error,
          ...state.authedUser
        }
      };

    case AUTH_USER_SUCCESS:
      user = payload.user || {};
      return {
        authedUser: {
          error: null,
          loading: false,
          message: payload.message,
          token: user.token,
          user
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
          message: payload.message
        }
      };

    default:
      return state;
  }
};
