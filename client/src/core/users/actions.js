import {
  AUTH_USER, AUTH_USER_SUCCESS, AUTH_USER_FAILURE,
  RESET_AUTHED_USER,
  DELETE_USER, DELETE_USER_SUCCESS, DELETE_USER_FAILURE
} from '../constants';


export const userActions = {

  authUser: ({ authType, name, email, password }, { resolve, reject }) => ({
    type: AUTH_USER,
    payload: {
      authType,
      name,
      email,
      password,
      resolve,
      reject
    }
  }),

  authUserSuccess: ({ user, message }) => ({
    type: AUTH_USER_SUCCESS,
    payload: {
      user,
      message
    }
  }),

  authUserFailure: error => ({
    type: AUTH_USER_FAILURE,
    payload: {
      error
    }
  }),

  logoutUser: () => ({
    type: RESET_AUTHED_USER
  }),

  deleteUser: () => ({
    type: DELETE_USER
  }),

  deleteUserSuccess: ({ message }) => ({
    type: DELETE_USER_SUCCESS,
    payload: {
      message
    }
  }),

  deleteUserFailure: error => ({
    type: DELETE_USER_FAILURE,
    payload: {
      error
    }
  })

};


export const userRequestActions = {
  authPending: userActions.authUser,
  authFulfilled: userActions.authUserSuccess,
  authFailed: userActions.authUserFailure,

  deletePending: userActions.deleteUser,
  deleteFulfilled: userActions.deleteUserSuccess,
  deleteFailed: userActions.deleteUserFailure,
};
