import {
  AUTH_USER,
  RESET_AUTHED_USER
} from '../constants';


export const userActions = {

  authUser: (authType, { name, email, password }, { resolve, reject }) => ({
    type: AUTH_USER,
    authType,
    name,
    email,
    password,
    resolve,
    reject
  }),

  logoutUser: () => ({
    type: RESET_AUTHED_USER
  })

};


export const userRequestActions = {
  authUser: userActions.authUser,
  logoutUser: userActions.logoutUser
};
