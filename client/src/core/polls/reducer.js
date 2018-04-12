import {
  POST_POLL, POST_POLL_SUCCESS, POST_POLL_FAILURE
} from '../constants';
import { getUpdatedList, getFilteredList } from '../helpers';


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

    case POST_POLL:
      return {
        ...state, active: {
          loading: true, error: null, poll: null,
          message: 'Creating poll...'
        }
      };
    case POST_POLL_SUCCESS:
      const poll = action.poll;
      const polls = getUpdatedList(state.all.polls, poll);
      return {
        ...state,
        all: {
          ...state.all,
          polls
        }, filtered: {
          ...state.filtered,
          loading: false, error: null,
          polls: getFilteredList(polls, state.filtered.filters)
        },
        active: {
          ...state.active,
          loading: false, message: null
        },
        viewed: {
          ...state.viewed,
          loading: false, error: null,
          message: action.message,
          id: poll.cuid,
          poll
        }
      };
    case POST_POLL_FAILURE:
      return {
        ...state, active: {
          ...state.active,
          loading: false, message: null,
          error: action.error
        }
      };


    default:
      return state;

  }
};
