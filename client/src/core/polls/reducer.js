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
  let id, poll, polls;

  switch(action.type) {

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
