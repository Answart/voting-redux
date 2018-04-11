
export const INITIAL_STATE = {
  all: {
    loading: false, error: null, polls: null
  },
  filtered: {
    loading: false, error: null, message: null, filters: null, polls: null
  },
  active: {
    loading: false, error: null, message: null, poll: null
  },
  viewed: {
    loading: false, error: null, message: null, id: null, poll: null
  }
};


export function pollReducer(state = INITIAL_STATE, action) {
  if (!action || !action.type) action = { type: '' }

  switch(action.type) {

    default:
      return state;

  }
};
