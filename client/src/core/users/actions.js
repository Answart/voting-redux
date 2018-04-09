import {
  AUTH_USER
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
  })

};


export const userRequestActions = {
  authUser: userActions.authUser
};
