import { APP_URL } from '../constants';
import { requestOpts, requestApi } from '../helpers';


export function authUserApi(authType, name, email, password) {
  const body = { name, password };
  if (!!email) body.email = email;
  return requestApi(`${APP_URL}/api/${authType}`, requestOpts('POST', body));
};

export function deleteUserApi(userId) {
  return requestApi(`${APP_URL}/api/user/${userId}/delete`, requestOpts('DELETE'));
};
