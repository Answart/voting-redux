import { pollActions } from '../../polls';
import {
  RESET_POLLS, RESET_ACTIVE_POLL, RESET_VIEWED_POLL,
  GET_POLLS,
  POST_POLL,
  UPDATE_POLL_STATUS, UPDATE_POLL_VOTE,
  DELETE_POLL,
  LOAD_FILTERED_POLLS, LOAD_ACTIVE_POLL, LOAD_VIEWED_POLL
} from '../../constants';

let resolveIt, rejectIt;
var promise1 = new Promise(function(resolve, reject) {
  resolveIt = resolve;
  rejectIt = reject;
});
const promises = { resolve: resolveIt, reject: rejectIt };
const values = {
  title: 'Best Spaniel Breed',
  choices: 'Springer Spaniel, Cocker Spaniel'
}

describe('pollActions', () => {

  describe('resetPolls()', () => {
    it('returns the initial state with the type RESET_POLLS', () => {
      expect(pollActions.resetPolls()).toEqual({ type: RESET_POLLS });
    });
  });

  describe('resetActivePoll()', () => {
    it('returns the initial state for active with the type RESET_ACTIVE_POLL', () => {
      expect(pollActions.resetActivePoll()).toEqual({ type: RESET_ACTIVE_POLL });
    });
  });

  describe('resetViewedPoll()', () => {
    it('returns the initial state for viewed with the type RESET_VIEWED_POLL', () => {
      expect(pollActions.resetViewedPoll()).toEqual({ type: RESET_VIEWED_POLL });
    });
  });

  describe('getPolls()', () => {
    it('returns an object with the type POST_POLL', () => {
      expect(pollActions.getPolls()).toEqual({ type: GET_POLLS });
    });
  });

  describe('postPoll()', () => {
    it('returns an object with the type POST_POLL', () => {
      expect(pollActions.postPoll({ ...values }, { ...promises })).toEqual({
        type: POST_POLL,
        ...values,
        ...promises
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
        choice: 'React',
        ...promises
      });
    });
  });

  describe('deletePoll()', () => {
    it('returns an object with the type DELETE_POLL', () => {
      expect(pollActions.deletePoll('12345')).toEqual({
        type: DELETE_POLL,
        id: '12345'
      });
    });
  });

  describe('loadFilteredPolls()', () => {
    it('returns an object with the type LOAD_FILTERED_POLLS', () => {
      const filters = [{
        label: 'User',
        key: 'user_name',
        value: 'alexandra'
      }];
      expect(pollActions.loadFilteredPolls(filters)).toEqual({
        type: LOAD_FILTERED_POLLS,
        filters
      });
    });
  });

  describe('loadActivePoll()', () => {
    it('returns an object with the type LOAD_ACTIVE_POLL', () => {
      expect(pollActions.loadActivePoll('12345')).toEqual({
        type: LOAD_ACTIVE_POLL,
        id: '12345'
      });
    });
  });

  describe('loadViewedPoll()', () => {
    it('returns an object with the type LOAD_VIEWED_POLL', () => {
      expect(pollActions.loadViewedPoll('12345')).toEqual({
        type: LOAD_VIEWED_POLL,
        id: '12345'
      });
    });
  });

});
