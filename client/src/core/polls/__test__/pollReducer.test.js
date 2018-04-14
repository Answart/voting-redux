import { pollActions, pollReducer } from '../../polls';
import { getUpdatedList, getFilteredList, getItemById } from '../../helpers';
import {
  POST_POLL, POST_POLL_SUCCESS, POST_POLL_FAILURE
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

});
