import { pollActions, pollReducer } from '../../polls';
import { getUpdatedList, getFilteredList, getItemById } from '../../helpers';
import {
  RESET_POLLS,
  GET_POLLS, GET_POLLS_SUCCESS, GET_POLLS_FAILURE,
  POST_POLL, POST_POLL_SUCCESS, POST_POLL_FAILURE,
  LOAD_VIEWED_POLL
} from '../../constants';

const poll = {
  cuid: '12345',
  name: 'Best Spaniel Breed'
}

describe('pollReducer', () => {
  let initialState;
  beforeEach(() => initialState = {
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
  });

  describe('default', () => {
    it('returns initial state', () => {
      expect(pollReducer()).toEqual(initialState);
    });
  });

  describe('RESET_POLLS', () => {
    it('returns initial state', () => {
      const dirtyState = pollReducer(initialState, { type: POST_POLL_FAILURE, error: 'Failed' })
      expect(pollReducer(dirtyState, { type: RESET_POLLS })).toEqual(initialState);
    });
  });


  describe('GET_POLLS', () => {
    let pendingState;
    beforeAll(() => pendingState = pollReducer(initialState, { type: GET_POLLS }));

    it('returns the state with all/filtered polls having the loading flag', () => {
      expect(pendingState).toEqual({
        all: {
          loading: true, error: null, polls: null
        }, filtered: {
          loading: true, error: null,
          message: 'Refreshing polls...',
          ...pendingState.filtered
        }, ...pendingState
      });
    });
    it('_FAILURE returns state with all polls being null', () => {
      var error = 'Polls refresh encounted an error.';
      expect(pollReducer(pendingState, { type: GET_POLLS_FAILURE, error })).toEqual({
        all: {
          loading: false, polls: null, error
        }, filtered: {
          loading: false, message: null, filters: null, polls: null, error
        }, active: {
          loading: false, error: null, message: null, poll: null
        }, viewed: {
          loading: false, message: null, id: null, poll: null,
          error: (!!pendingState.viewed.poll ? 'Unable to find poll' : null)
        }
      });
    });
    it('_SUCCESS returns state with all, filtered, active, and viwed polls updated with new polls', () => {
      const totalPolls = getUpdatedList(pendingState.all.polls, poll);
      const filters = pendingState.filtered.filters;
      const polls = [
      ];
      const id = pendingState.viewed.id;
      expect(pollReducer(pendingState, { type: GET_POLLS_SUCCESS, polls })).toEqual({
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
      });
    });
  });

  describe('POST_POLL', () => {
    let pendingState;
    beforeAll(() => pendingState = pollReducer(initialState, { type: POST_POLL }));

    it('returns the state with active poll having the loading flag', () => {
      expect(pendingState).toEqual({
        active: {
          loading: true, error: null, poll: null,
          message: 'Creating poll...'
        }, ...pendingState
      });
    });
    it('_FAILURE returns state with active poll having an error', () => {
      var error = 'Failed to create poll.';
      expect(pollReducer(pendingState, { type: POST_POLL_FAILURE, error })).toEqual({
        active: {
          loading: false, message: null, poll: null,
          error
        }, ...pendingState
      });
    });
    it('_SUCCESS returns state with all, filtered, active, and viwed polls updated with new poll', () => {
      const message = 'Successfully created poll.';
      const totalPolls = getUpdatedList(pendingState.all.polls, poll);
      expect(pollReducer(pendingState, { type: POST_POLL_SUCCESS, poll, message })).toEqual({
        all: {
          loading: false, error: null,
          polls: totalPolls,
        }, filtered: {
          loading: false, error: null, message: null,
          filters: pendingState.filtered.filters,
          polls: getFilteredList(totalPolls, pendingState.filtered.filters)
        },
        active: {
          loading: false, error: null, message: null, poll: null
        },
        viewed: {
          loading: false, error: null,
          id: poll.cuid,
          poll,
          message
        }
      });
    });
  });

  describe('LOAD_VIEWED_POLL', () => {
    let pendingState, id, polls, poll;
    beforeAll(() => {
      id = '12345';
      polls = [{
        cuid: '12345',
        name: 'Best Spaniel Breed'
      }];
      pendingState = pollReducer(initialState, { type: GET_POLLS_SUCCESS, polls });
      poll = (!!id && !!pendingState.viewed.poll && (id === pendingState.viewed.poll.cuid))
        ? pendingState.viewed.poll
        : getItemById(pendingState.all.polls, id);
    });
    it('returns state with viewed poll ', () => {
      expect(pollReducer(pendingState, { type: LOAD_VIEWED_POLL, id })).toEqual({
         ...pendingState, viewed: {
          loading: false, error: null,
          message: (!!poll ? pendingState.viewed.message : 'No poll found'),
          id,
          poll
        }
      });
    });
  });

});
