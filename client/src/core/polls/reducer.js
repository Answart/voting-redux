import {
  RESET_POLLS,
  GET_POLLS, GET_POLLS_SUCCESS, GET_POLLS_FAILURE,
  POST_POLL, POST_POLL_SUCCESS, POST_POLL_FAILURE,
  UPDATE_POLL_STATUS,
  UPDATE_POLL_SUCCESS, UPDATE_POLL_FAILURE,
  DELETE_POLL, DELETE_POLL_SUCCESS, DELETE_POLL_FAILURE,
  LOAD_VIEWED_POLL
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

    case UPDATE_POLL_STATUS:
      return {
        viewed: {
          loading: true, error: null,
          message: 'Updating poll...',
          id: state.viewed.id,
          poll: state.viewed.poll
        }, ...state
      };
    case UPDATE_POLL_SUCCESS:
      poll = action.poll;
      return {
        all: {
          loading: false, error: null,
          polls: getUpdatedList(state.all.polls, poll)
        }, filtered: {
          loading: false, error: null,
          message: action.message,
          filters: state.filtered.filters,
          polls: getUpdatedList(state.filtered.polls, poll, state.filtered.filters)
        }, active: {
          loading: false, message: null, error: null, poll: null
        }, viewed: {
          loading: false, error: null, poll,
          message: action.message,
          id: poll.cuid
        }
      };
    case UPDATE_POLL_FAILURE:
      return {
        active: {
          loading: false, message: null,
          error: action.error,
          poll: state.active.poll
        }, viewed: {
          loading: false, message: null,
          error: action.error,
          id: state.viewed.id,
          poll: state.viewed.poll
        }, ...state
      };

    case DELETE_POLL:
      return {
        viewed: {
          loading: true, error: null, message: null,
          id: state.viewed.id,
          poll: state.viewed.poll
        }, ...state
      };
    case DELETE_POLL_SUCCESS:
      const allPolls = (state.all.polls || []).filter(poll => poll.cuid !== action.id);
      const filteredPolls = (state.filtered.polls || []).filter(poll => poll.cuid !== action.id);
      return {
        all: {
          loading: false, error: null,
          polls: allPolls
        }, filtered: {
          loading: false, error: null,
          message: action.message,
          filters: state.filtered.filters,
          polls: filteredPolls
        }, active: {
          loading: false, message: null, error: null, poll: null
        }, viewed: {
          loading: false, message: null, error: null, id: null, poll: null
        }
      };
    case DELETE_POLL_FAILURE:
      return {
        viewed: {
          loading: false,
          error: action.error.message,
          ...state.viewed
        }, ...state
      };

    case LOAD_VIEWED_POLL:
      id = !!action.id ? action.id : state.viewed.id;
      poll = (!!id && !!state.viewed.poll && (id === state.viewed.poll.cuid))
        ? state.viewed.poll
        : getItemById(state.all.polls, id);
      return {
         ...state, viewed: {
          loading: false, error: null,
          message: (!!poll ? state.viewed.message : 'No poll found'),
          id,
          poll
        }
      };

    default:
      return state;
  }
};
