import { pollActions } from '../../polls';
import {
  POST_POLL
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

  describe('postPoll()', () => {
    it('returns an object with the type POST_POLL', () => {
      expect(pollActions.postPoll({ ...values }, { ...promises })).toEqual({
        type: POST_POLL,
        ...values,
        ...promises
      });
    });
  });

});
