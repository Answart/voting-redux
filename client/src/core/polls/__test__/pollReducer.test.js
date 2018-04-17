import { pollReducer } from '../../polls';
import { getUpdatedList, getFilteredList, getItemsWithoutId, getItemById } from '../../helpers';
import { mockUser, mockPoll, mockPolls } from '../../../utils/__test__';
import {
  RESET_POLLS, RESET_ACTIVE_POLL, RESET_VIEWED_POLL,
  GET_POLLS, GET_POLLS_SUCCESS, GET_POLLS_FAILURE,
  POST_POLL, POST_POLL_SUCCESS, POST_POLL_FAILURE,
  UPDATE_POLL_STATUS, UPDATE_POLL_VOTE,
  UPDATE_POLL_SUCCESS, UPDATE_POLL_FAILURE,
  DELETE_POLL, DELETE_POLL_SUCCESS, DELETE_POLL_FAILURE,
  LOAD_FILTERED_POLLS, LOAD_ACTIVE_POLL, LOAD_VIEWED_POLL
} from '../../constants';

const poll = mockPoll;


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


  describe('RESET_ACTIVE_POLL', () => {

    it('returns initial state for active', () => {
      let dirtyState = {
        all: {
          loading: false, error: null, polls: null
        },
        filtered: {
          loading: false, error: null, message: null, filters: null, polls: null
        },
        active: {
          loading: true,
          error: 'some error',
          message: 'some message',
          id: poll.cuid,
          poll: poll
        },
        viewed: {
          loading: false, error: null, message: null, id: null, poll: null
        }
      };
      expect(pollReducer(dirtyState, { type: RESET_ACTIVE_POLL })).toEqual(initialState);
    });
  });


  describe('RESET_VIEWED_POLL', () => {

    it('returns initial state for viewed', () => {
      let dirtyState = {
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
          loading: true,
          error: 'some error',
          message: 'some message',
          id: poll.cuid,
          poll
        }
      };
      expect(pollReducer(dirtyState, { type: RESET_VIEWED_POLL })).toEqual(initialState);
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
      expect(pollReducer(pendingState, { type: GET_POLLS_FAILURE, payload: { error }})).toEqual({
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
      expect(pollReducer(pendingState, { type: GET_POLLS_SUCCESS, payload: { polls }})).toEqual({
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
      expect(pollReducer(pendingState, { type: POST_POLL_FAILURE, payload: { error }})).toEqual({
        active: {
          loading: false, message: null, poll: null,
          error
        }, ...pendingState
      });
    });

    it('_SUCCESS returns state with all, filtered, active, and viwed polls updated with new poll', () => {
      const message = 'Successfully created poll.';
      const totalPolls = getUpdatedList(pendingState.all.polls, poll);
      expect(pollReducer(pendingState, { type: POST_POLL_SUCCESS, payload: { poll: mockPoll, message }})).toEqual({
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
          loading: false, error: null, message, poll,
          id: poll.cuid
        }
      });
    });
  });


  describe('UPDATE_POLL_STATUS', () => {
    let pendingState;
    beforeAll(() => pendingState = pollReducer(initialState, { type: UPDATE_POLL_STATUS }));

    it('returns the state with viewed poll having the loading flag', () => {
      expect(pendingState).toEqual({
        viewed: {
          loading: true, error: null,
          message: 'Updating poll...',
          id: pendingState.viewed.id,
          poll: pendingState.viewed.poll
        }, ...pendingState
      });
    });

    it('_FAILURE returns state with active/viewed poll having an error', () => {
      var error = 'Failed to update poll.';
      expect(pollReducer(pendingState, { type: UPDATE_POLL_FAILURE, payload: { error }})).toEqual({
        active: {
          loading: false, message: null,
          error: 'Unable to update poll',
          poll: pendingState.active.poll
        }, viewed: {
          loading: false, message: null,
          error: 'Unable to update poll',
          id: pendingState.viewed.id,
          poll: pendingState.viewed.poll
        }, ...pendingState
      });
    });

    it('_SUCCESS returns state with all, filtered, active, and viwed polls updated with polls new status', () => {
      const message = 'Successfully updated poll.';
      expect(pollReducer(pendingState, { type: UPDATE_POLL_SUCCESS, payload: { poll, message }})).toEqual({
        all: {
          loading: false, error: null,
          polls: getUpdatedList(pendingState.all.polls, poll)
        }, filtered: {
          loading: false, error: null, message,
          filters: pendingState.filtered.filters,
          polls: getUpdatedList(pendingState.filtered.polls, poll, pendingState.filtered.filters)
        },
        active: {
          loading: false, message: null, error: null, poll: null
        },
        viewed: {
          loading: false, error: null, message, poll,
          id: poll.cuid
        }
      });
    });
  });


  describe('UPDATE_POLL_VOTE', () => {
    let pendingState;
    beforeAll(() => pendingState = pollReducer(initialState, { type: UPDATE_POLL_VOTE, payload: { choice: 'React' }}));

    it('returns the state with active poll having the loading flag', () => {
      expect(pendingState).toEqual({
        active: {
          loading: true, error: null, poll: null,
          message: 'Updating poll...'
        }, ...pendingState
      });
    });

    it('_FAILURE returns state with active/viewed poll having an error', () => {
      var error = 'Failed to update poll.';
      expect(pollReducer(pendingState, { type: UPDATE_POLL_FAILURE, payload: { error }})).toEqual({
        active: {
          loading: false, message: null,
          error: 'Unable to update poll',
          poll: pendingState.active.poll
        }, viewed: {
          loading: false, message: null,
          error: 'Unable to update poll',
          id: pendingState.viewed.id,
          poll: pendingState.viewed.poll
        }, ...pendingState
      });
    });

    it('_SUCCESS returns state with all, filtered, active, and viwed polls updated with polls new status', () => {
      const message = 'Successfully updated poll.';
      expect(pollReducer(pendingState, { type: UPDATE_POLL_SUCCESS, payload: { poll, message }})).toEqual({
        all: {
          loading: false, error: null,
          polls: getUpdatedList(pendingState.all.polls, poll)
        }, filtered: {
          loading: false, error: null, message,
          filters: pendingState.filtered.filters,
          polls: getUpdatedList(pendingState.filtered.polls, poll, pendingState.filtered.filters)
        },
        active: {
          loading: false, message: null, error: null, poll: null
        },
        viewed: {
          loading: false, error: null, message, poll,
          id: poll.cuid
        }
      });
    });
  });


  describe('DELETE_POLL', () => {
    let pendingState, id;
    beforeAll(() => {
      id = poll.cuid;
      pendingState = pollReducer(initialState, { type: DELETE_POLL, payload: { id }})
    });

    it('returns the state with viewed poll having the loading flag', () => {
      expect(pendingState).toEqual({
        viewed: {
          loading: true, error: null, message: null,
          id: pendingState.viewed.id,
          poll: pendingState.viewed.poll
        }, ...pendingState
      });
    });

    it('_FAILURE returns state with active poll having an error', () => {
      var error = 'Failed to delete poll.';
      expect(pollReducer(pendingState, { type: DELETE_POLL_FAILURE, payload: { error }})).toEqual({
        viewed: {
          loading: false, message: null, error,
          id: pendingState.viewed.id,
          poll: pendingState.viewed.poll
        }, ...pendingState
      });
    });

    it('_SUCCESS returns state with all, filtered, active, and viwed polls updated with removed poll', () => {
      const message = 'Poll successfully deleted.'
      const allPolls = getItemsWithoutId(pendingState.all.polls, id);
      const filteredPolls = getItemsWithoutId(pendingState.filtered.polls, id);
      expect(pollReducer(pendingState, { type: DELETE_POLL_SUCCESS, message })).toEqual({
        all: {
          loading: false, error: null,
          polls: allPolls
        }, filtered: {
          loading: false, error: null, message,
          filters: pendingState.filtered.filters,
          polls: filteredPolls
        }, active: {
          loading: false, message: null, error: null, poll: null
        }, viewed: {
          loading: false, message: null, error: null, id: null, poll: null
        }
      });
    });
  });

  describe('LOAD_FILTERED_POLLS', () => {
    let pendingState, polls;
    beforeAll(() => {
      polls = [poll];
      pendingState = pollReducer(initialState, { type: GET_POLLS_SUCCESS, payload: { polls }});
    });

    it('returns state with filtered polls', () => {
      const filters = [{
        label: 'User',
        key: 'title',
        value: 'Best Spaniel Breed'
      }];
      expect(pollReducer(pendingState, { type: LOAD_FILTERED_POLLS, payload: { filters }})).toEqual({
         ...pendingState, filtered: {
          loading: false, error: null, filters, polls,
          message: ((!!polls && polls.length > 0) ? pendingState.filtered.message : 'No polls found'),
        }
      });
    });
  });


  describe('LOAD_ACTIVE_POLL', () => {
    let pendingState, id, polls, poll;
    beforeAll(() => {
      id = mockPoll.cuid;
      polls = [mockPoll];
      pendingState = pollReducer(initialState, { type: GET_POLLS_SUCCESS, payload: { polls }});
      poll = (!!id && !!pendingState.active.poll && (id === pendingState.active.poll.cuid))
        ? pendingState.active.poll
        : getItemById(pendingState.all.polls, id);
    });

    it('returns state with viewed poll ', () => {
      expect(pollReducer(pendingState, { type: LOAD_ACTIVE_POLL, payload: { id }})).toEqual({
         ...pendingState, active: {
          loading: false, error: null, poll,
          message: (!!poll ? pendingState.active.message : 'No poll found')
        }
      });
    });
  });


  describe('LOAD_VIEWED_POLL', () => {
    let pendingState, id, polls, poll;
    beforeAll(() => {
      id = mockPoll.cuid;
      polls = [mockPoll];
      pendingState = pollReducer(initialState, { type: GET_POLLS_SUCCESS, payload: { polls }});
      poll = (!!id && !!pendingState.viewed.poll && (id === pendingState.viewed.poll.cuid))
        ? pendingState.viewed.poll
        : getItemById(pendingState.all.polls, id);
    });

    it('returns state with viewed poll ', () => {
      expect(pollReducer(pendingState, { type: LOAD_VIEWED_POLL, payload: { id }})).toEqual({
         ...pendingState, viewed: {
          loading: false, error: null, id, poll,
          message: (!!poll ? pendingState.viewed.message : 'No poll found')
        }
      });
    });
  });
});
