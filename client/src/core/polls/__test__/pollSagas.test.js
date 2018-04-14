import { call, put, fork, select, takeLatest } from 'redux-saga/effects';
import { SubmissionError, reset } from 'redux-form';
import { cloneableGenerator } from 'redux-saga/utils';
// Import compoenents
import history from '../../history';
import { pollActions, pollReducer, postPollApi } from '../../polls';
import { getAuthedUser } from '../../users';
import {
  watchPostPoll, watchPostPollSuccess,
  postPoll, postPollSuccess
} from '../../polls/sagas';
import {
  POST_POLL, POST_POLL_SUCCESS, POST_POLL_FAILURE
} from '../../constants';
import { requestOpts, requestApi } from '../../helpers';



describe('pollSagas', () => {

  describe('watchers', () => {

    it('watchPostPoll() calls takeLatest on POST_POLL action', () => {
      const gen = watchPostPoll();
      expect(gen.next().value).toEqual(takeLatest(POST_POLL, postPoll));
      expect(gen.next()).toEqual({ done: true, value: undefined });
    });
    it('watchPostPollSuccess() calls takeLatest on POST_POLL_SUCCESS action', () => {
      const gen = watchPostPollSuccess();
      expect(gen.next().value).toEqual(takeLatest(POST_POLL_SUCCESS, postPollSuccess));
      expect(gen.next()).toEqual({ done: true, value: undefined });
    });
  });

  describe('watched sagas', () => {
    let poll, promises;
    beforeAll(() => {
      let resolveIt, rejectIt;
      var grabPromises = new Promise(function(resolve, reject) {
        resolveIt = resolve;
        rejectIt = reject;
      });
      promises = { resolve: resolveIt, reject: rejectIt };
      poll = {
        title: 'Best Spaniel Breed',
        choices: 'Cocker Spaniel, Springer Spaniel'
       };
    });

    describe('post poll flow', () => {
      let postPollAction, clone;
      beforeAll(() => postPollAction = pollActions.postPoll(poll, promises));
      beforeEach(() => {
        const gen = cloneableGenerator(postPoll)(postPollAction);
        clone = gen.clone();
      });

      it('completes successfully on success', () => {
        expect(clone.next().value).toEqual(select(getAuthedUser));
        expect(clone.next().value).toEqual(call(postPollApi, poll.title, poll.choices, 'public', 'public'));
        expect(clone.next().value).toEqual(put({
          type: POST_POLL_SUCCESS,
          poll,
          message: 'success'
        }));
        expect(clone.next().value).toEqual(put(reset('newPoll')));
        expect(clone.next().value).toEqual(call(promises.resolve));
        expect(clone.next().done).toEqual(true);
      });
      it('throws successfully on failure', () => {
        clone.next();
        const error = 'Error creating poll.';
        expect(clone.throw(error).value)
          .toEqual(put({ type: POST_POLL_FAILURE, error }));
        expect(clone.next().value)
          .toEqual(call(promises.reject, (new SubmissionError(error))));
        expect(clone.next().done).toEqual(true);
      });
    });


  });

});
