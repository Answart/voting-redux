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
  switch (action.type) {

    default:
      return state;
  }
}
