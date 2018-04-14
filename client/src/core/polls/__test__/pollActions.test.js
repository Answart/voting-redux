import { pollActions } from '../../polls';
import {
  RESET_POLLS,
  GET_POLLS,
  POST_POLL,
  DELETE_POLL,
  LOAD_VIEWED_POLL
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

  describe('deletePoll()', () => {
    it('returns an object with the type DELETE_POLL', () => {
      expect(pollActions.deletePoll('12345')).toEqual({
        type: DELETE_POLL,
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
