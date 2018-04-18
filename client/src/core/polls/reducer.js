import {
  RESET_POLLS, RESET_ACTIVE_POLL, RESET_VIEWED_POLL,
  GET_POLLS, GET_POLLS_SUCCESS, GET_POLLS_FAILURE,
  POST_POLL, POST_POLL_SUCCESS, POST_POLL_FAILURE,
  UPDATE_POLL_STATUS, UPDATE_POLL_VOTE,
  UPDATE_POLL_SUCCESS, UPDATE_POLL_FAILURE,
  DELETE_POLL, DELETE_POLL_SUCCESS, DELETE_POLL_FAILURE,
  LOAD_FILTERED_POLLS, LOAD_ACTIVE_POLL, LOAD_VIEWED_POLL
} from '../constants';
import { getListWithItem, getFilteredList, getItemsWithoutId, getItemById } from '../helpers';


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


export function pollReducer(state = INITIAL_STATE, action = {}) {
  let payload, id, filters, poll, polls, error, message;

  if (!action.type) action.type = '';
  if (!action.payload) action.payload = {};
  payload = action.payload;

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

    case RESET_ACTIVE_POLL:
      return {
        ...state, active: {
          loading: false, error: null, message: null, poll: null
        }
      };

    case RESET_VIEWED_POLL:
      return {
        ...state, viewed:{
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
      polls = payload.polls || null;
      filters = state.filtered.filters;
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
      error = payload.error || 'An error occured';
      return {
        all: {
          loading: false, polls: null, error
        }, filtered: {
          loading: false, message: null, filters: null, polls: null, error
        }, active: {
          loading: false, error: null, message: null, poll: null
        }, viewed: {
          loading: false, message: null, id, poll,
          error: (!!poll ? error : null)
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
      poll = payload.poll || null;
      message = payload.message || null;
      polls = getListWithItem(state.all.polls, poll);
      filters = state.filtered.filters;
      return {
        all: {
          loading: false, error: null, polls
        }, filtered: {
          loading: false, error: null, message: null, filters,
          polls: getFilteredList(polls, filters)
        },
        active: {
          loading: false, error: null, message: null, poll: null
        },
        viewed: {
          loading: false, error: null, message, poll,
          id: poll.cuid,
        }
      };
    case POST_POLL_FAILURE:
      error = payload.error || 'An error occured';
      return {
        active: {
          loading: false, message: null, poll: null, error
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
    case UPDATE_POLL_VOTE:
      return {
        active: {
          loading: true, error: null, poll: null,
          message: 'Updating poll...'
        }, ...state
      };
    case UPDATE_POLL_SUCCESS:
      poll = payload.poll || null;
      message = payload.message || null;
      return {
        all: {
          loading: false, error: null,
          polls: getListWithItem(state.all.polls, poll)
        }, filtered: {
          loading: false, error: null, message,
          filters: state.filtered.filters,
          polls: getListWithItem(state.filtered.polls, poll, state.filtered.filters)
        }, active: {
          loading: false, message: null, error: null, poll: null
        }, viewed: {
          loading: false, error: null, poll, message,
          id: poll.cuid
        }
      };
    case UPDATE_POLL_FAILURE:
      error = payload.error || 'An error occured';
      return {
        active: {
          loading: false, message: null, error,
          poll: state.active.poll
        }, viewed: {
          loading: false, message: null, error,
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
      message = payload.message || null;
      const allPolls = getItemsWithoutId(state.all.polls, payload.id);
      const filteredPolls = getItemsWithoutId(state.filtered.polls, payload.id);
      return {
        all: {
          loading: false, error: null,
          polls: allPolls
        }, filtered: {
          loading: false, error: null, message,
          filters: state.filtered.filters,
          polls: filteredPolls
        }, active: {
          loading: false, message: null, error: null, poll: null
        }, viewed: {
          loading: false, message: null, error: null, id: null, poll: null
        }
      };
    case DELETE_POLL_FAILURE:
      error = payload.error || 'An error occured';
      return {
        viewed: {
          loading: false, error,
          ...state.viewed
        }, ...state
      };

    case LOAD_FILTERED_POLLS:
      filters = !!payload.filters.length ? payload.filters : null;
      polls = getFilteredList(state.all.polls, filters);
      message = (!!polls && polls.length > 0) ? state.filtered.message : 'No polls found';
      return {
        ...state, filtered: {
          loading: false, error: null, message, polls, filters
        }
      };

    case LOAD_ACTIVE_POLL:
      poll = getItemById(state.all.polls, payload.id);
      message = !!poll ? state.active.message : 'No poll found';
      return {
        ...state, active: {
          loading: false, error: null, poll, message
        }
      };

    case LOAD_VIEWED_POLL:
      id = !!payload.id ? payload.id : state.viewed.id;
      poll = (!!id && !!state.viewed.poll && (id === state.viewed.poll.cuid))
        ? state.viewed.poll
        : getItemById(state.all.polls, id);
      message = !!poll ? state.viewed.message : 'No poll found';
      return {
         ...state, viewed: {
          loading: false, error: null, id, poll, message
        }
      };

    default:
      return state;
  }
};
