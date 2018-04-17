import { pollActions } from '../../polls';
import { mockPoll, mockPolls } from '../../../utils/__test__';
import {
  RESET_POLLS, RESET_ACTIVE_POLL, RESET_VIEWED_POLL,
  GET_POLLS, GET_POLLS_SUCCESS, GET_POLLS_FAILURE,
  POST_POLL, POST_POLL_SUCCESS, POST_POLL_FAILURE,
  UPDATE_POLL_STATUS, UPDATE_POLL_VOTE,
  UPDATE_POLL_SUCCESS, UPDATE_POLL_FAILURE,
  DELETE_POLL, DELETE_POLL_SUCCESS, DELETE_POLL_FAILURE,
  LOAD_FILTERED_POLLS, LOAD_ACTIVE_POLL, LOAD_VIEWED_POLL
} from '../../constants';

let promises = {};
let promise1 = new Promise(function(resolve, reject) {
  promises.resolve = resolve;
  promises.reject = reject;
});
const values = {
  title: 'Best Spaniel Breed',
  choices: 'Springer Spaniel, Cocker Spaniel'
};


describe('pollActions', () => {

  describe('resetPolls()', () => {
    it('returns the initial state with the type RESET_POLLS', () => {
      expect(pollActions.resetPolls()).toEqual({
        type: RESET_POLLS });
    });
  });

  describe('resetActivePoll()', () => {
    it('returns the initial state for active with the type RESET_ACTIVE_POLL', () => {
      expect(pollActions.resetActivePoll()).toEqual({
        type: RESET_ACTIVE_POLL });
    });
  });

  describe('resetViewedPoll()', () => {
    it('returns the initial state for viewed with the type RESET_VIEWED_POLL', () => {
      expect(pollActions.resetViewedPoll()).toEqual({
        type: RESET_VIEWED_POLL });
    });
  });

  describe('getPolls()', () => {
    it('returns an object with the type GET_POLLS', () => {
      expect(pollActions.getPolls()).toEqual({
        type: GET_POLLS });
    });
  });

  describe('getPollsSuccess()', () => {
    it('returns an object with the type GET_POLLS_SUCCESS', () => {
      const polls = mockPolls;
      const message = 'Successfully posted poll.';
      expect(pollActions.getPollsSuccess({ polls, message })).toEqual({
        type: GET_POLLS_SUCCESS,
        payload: {
          polls
        }
      });
    });
  });

  describe('getPollsFailure()', () => {
    it('returns an object with the type GET_POLLS_FAILURE', () => {
      const error = 'Failed to post poll.';
      expect(pollActions.getPollsFailure(error)).toEqual({
        type: GET_POLLS_FAILURE,
        payload: {
          error
        }
      });
    });
  });

  describe('postPoll()', () => {
    it('returns an object with the type POST_POLL', () => {
      expect(pollActions.postPoll({ ...values }, { ...promises })).toEqual({
        type: POST_POLL,
        payload: {
          ...values,
          ...promises
        }
      });
    });
  });

  describe('postPollSuccess()', () => {
    it('returns an object with the type POST_POLL_SUCCESS', () => {
      const poll = mockPoll;
      const message = 'Successfully posted poll.';
      expect(pollActions.postPollSuccess({ poll, message })).toEqual({
        type: POST_POLL_SUCCESS,
        payload: {
          poll,
          message
        }
      });
    });
  });

  describe('postPollFailure()', () => {
    it('returns an object with the type POST_POLL_FAILURE', () => {
      const error = 'Failed to post poll.';
      expect(pollActions.postPollFailure(error)).toEqual({
        type: POST_POLL_FAILURE,
        payload: {
          error
        }
      });
    });
  });

  describe('updatePollStatus()', () => {
    it('returns an object with the type UPDATE_POLL_STATUS', () => {
      expect(pollActions.updatePollStatus()).toEqual({
        type: UPDATE_POLL_STATUS
      });
    });
  });

  describe('updatePollVote()', () => {
    it('returns an object with the type UPDATE_POLL_VOTE', () => {
      expect(pollActions.updatePollVote({ choice: 'React' }, { ...promises })).toEqual({
        type: UPDATE_POLL_VOTE,
        payload: {
          choice: 'React',
          ...promises
        }
      });
    });
  });

  describe('updatePollSuccess()', () => {
    it('returns an object with the type UPDATE_POLL_SUCCESS', () => {
      const poll = mockPoll;
      const message = 'Successfully updated poll.';
      expect(pollActions.updatePollSuccess({ poll, message })).toEqual({
        type: UPDATE_POLL_SUCCESS,
        payload: {
          poll,
          message
        }
      });
    });
  });

  describe('updatePollFailure()', () => {
    it('returns an object with the type UPDATE_POLL_FAILURE', () => {
      const error = 'Failed to update poll.';
      expect(pollActions.updatePollFailure(error)).toEqual({
        type: UPDATE_POLL_FAILURE,
        payload: {
          error
        }
      });
    });
  });

  describe('deletePoll()', () => {
    it('returns an object with the type DELETE_POLL', () => {
      const id = mockPoll.cuid;
      expect(pollActions.deletePoll(id)).toEqual({
        type: DELETE_POLL,
        payload: {
          id
        }
      });
    });
  });

  describe('deletePollSuccess()', () => {
    it('returns an object with the type DELETE_POLL_SUCCESS', () => {
      const id = mockPoll.cuid;
      const message = 'Successfully deleted poll.';
      expect(pollActions.deletePollSuccess({ id, message })).toEqual({
        type: DELETE_POLL_SUCCESS,
        payload: {
          id,
          message
        }
      });
    });
  });

  describe('deletePollFailure()', () => {
    it('returns an object with the type DELETE_POLL_FAILURE', () => {
      const error = 'Failed to delete poll.';
      expect(pollActions.deletePollFailure(error)).toEqual({
        type: DELETE_POLL_FAILURE,
        payload: {
          error
        }
      });
    });
  });

  describe('loadFilteredPolls()', () => {
    it('returns an object with the type LOAD_FILTERED_POLLS', () => {
      const filters = [{
        label: 'User',
        key: 'user_name',
        value: 'Alexandra'
      }];
      expect(pollActions.loadFilteredPolls(filters)).toEqual({
        type: LOAD_FILTERED_POLLS,
        payload: {
          filters
        }
      });
    });
  });

  describe('loadActivePoll()', () => {
    it('returns an object with the type LOAD_ACTIVE_POLL', () => {
      const id = mockPoll.cuid;
      expect(pollActions.loadActivePoll(id)).toEqual({
        type: LOAD_ACTIVE_POLL,
        payload: {
          id
        }
      });
    });
  });

  describe('loadViewedPoll()', () => {
    it('returns an object with the type LOAD_VIEWED_POLL', () => {
      expect(pollActions.loadViewedPoll('12345')).toEqual({
        type: LOAD_VIEWED_POLL,
        payload: {
          id: '12345'
        }
      });
    });
  });
});
