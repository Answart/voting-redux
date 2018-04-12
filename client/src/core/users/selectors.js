
export function getUsers(state) {
  return state.users;
};

export function getAuthedUser(state) {
  return state.users.authedUser.user;
};

export function getCurrentUser(state) {
  const authedUser = state.users.authedUser.user;
  return (!!authedUser ? authedUser : { name: 'public', cuid: 'public' });
};

export function getToken(state) {
  return state.users.token;
};
