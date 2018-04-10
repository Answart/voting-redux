

export function authUserApi(authType, name, email, password) {
  // api call made here
  return { user: { token: '12345', name, email }, message: 'heyo' };
};
