import { pollActions, pollReducer } from '../../polls';
import { getUpdatedList, getFilteredList, getItemById, getMessage } from '../../helpers';
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
        ...pendingState, active: {
          loading: true, error: null, poll: null,
          message: 'Creating poll...'
        }
      });
    });
    it('_FAILURE returns state with active poll having an error', () => {
      var error = 'Failed to delete poll.';
      expect(pollReducer(pendingState, { type: POST_POLL_FAILURE, error })).toEqual({
        ...pendingState, active: {
          loading: false, message: null, poll: null,
          error
        }
      });
    });
    it('_SUCCESS returns state with all, filtered, active, and viwed polls updated with new poll', () => {
      const message = 'Successfully deleted poll.';
      const totalPolls = getUpdatedList(pendingState.all.polls, poll);
      expect(pollReducer(pendingState, { type: POST_POLL_SUCCESS, poll, message })).toEqual({
        ...pendingState,
        all: {
          ...pendingState.all,
          polls: totalPolls
        }, filtered: {
          ...pendingState.filtered,
          loading: false, error: null,
          polls: getFilteredList(totalPolls, pendingState.filtered.filters)
        },
        active: {
          ...pendingState.active,
          loading: false, message: null, error: null, poll: null
        },
        viewed: {
          ...pendingState.viewed,
          loading: false, error: null,
          message,
          id: poll.cuid,
          poll
        }
      });
    });
  });

});
