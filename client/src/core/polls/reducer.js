import {
  RESET_POLLS,
  GET_POLLS, GET_POLLS_SUCCESS, GET_POLLS_FAILURE,
  POST_POLL, POST_POLL_SUCCESS, POST_POLL_FAILURE
} from '../constants';
import { getUpdatedList, getFilteredList, getItemById } from '../helpers';


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
  let id, poll, polls;

  switch(action.type) {

    case RESET_POLLS:
      return {
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

    case GET_POLLS:
      return {
        all: {
          loading: true, error: null, polls: null
        }, filtered: {
          loading: true, error: null,
          message: 'Refreshing polls...',
          ...state.filtered
        }, ...state
      };
    case GET_POLLS_SUCCESS:
      polls = action.polls;
      const filters = state.filtered.filters;
      id = state.viewed.id;
      return {
        all: {
          loading: false, error: null, polls
        }, filtered: {
          loading: false, error: null, filters,
          message: 'Successfully refreshed polls.',
          polls: getFilteredList(polls, filters)
        }, active: {
          loading: false, error: null, message: null, poll: null
        }, viewed: {
          loading: false, error: null, message: null, id,
          poll: getItemById(polls, id)
        }
      };
    case GET_POLLS_FAILURE:
      id = state.viewed.id;
      poll = !!id ? getItemById(state.all.polls, id) : null;
      const error = action.error;
      return {
        all: {
          loading: false, polls: null, error
        }, filtered: {
          loading: false, message: null, filters: null, polls: null, error
        }, active: {
          loading: false, error: null, message: null, poll: null
        }, viewed: {
          loading: false, message: null, id, poll,
          error: (!!poll ? 'Unable to find poll' : null)
        }
      };

    case POST_POLL:
      return {
        active: {
          loading: true, error: null, poll: null,
          message: 'Creating poll...'
        }, ...state
      };
    case POST_POLL_SUCCESS:
      poll = action.poll;
      polls = getUpdatedList(state.all.polls, poll);
      return {
        all: {
          loading: false, error: null,
          polls
        }, filtered: {
          loading: false, error: null, message: null,
          filters: state.filtered.filters,
          polls: getFilteredList(polls, state.filtered.filters)
        },
        active: {
          loading: false, error: null, message: null, poll: null
        },
        viewed: {
          loading: false, error: null,
          message: action.message,
          id: poll.cuid,
          poll
        }
      };
    case POST_POLL_FAILURE:
      return {
        active: {
          loading: false, message: null, poll: null,
          error: action.error
        }, ...state
      };


    default:
      return state;
  }
};
