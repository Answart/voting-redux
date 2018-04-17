import { call, put, fork, select, takeLatest } from 'redux-saga/effects';
import { SubmissionError, reset } from 'redux-form';
import { cloneableGenerator } from 'redux-saga/utils';
// Import compoenents
import history from '../../history';
import {
  getActivePoll, getViewedPoll,
  pollActions, pollReducer,
  getPollsApi, postPollApi, updatePollApi, updatePollVoteApi, deletePollApi
} from '../../polls';
import { getAuthedUser } from '../../users';
import {
  watchGetPolls,
  watchPostPoll, watchPostPollSuccess,
  watchUpdatePollStatus, watchUpdatePollVote, watchUpdatePollSuccess,
  watchDeletePoll,
  getPolls, postPoll, postPollSuccess, updatePollStatus, updatePollVote, updatePollSuccess, deletePoll
} from '../../polls/sagas';
import {
  GET_POLLS, GET_POLLS_SUCCESS, GET_POLLS_FAILURE,
  POST_POLL, POST_POLL_SUCCESS, POST_POLL_FAILURE,
  UPDATE_POLL_STATUS, UPDATE_POLL_VOTE,
  UPDATE_POLL_SUCCESS, UPDATE_POLL_FAILURE,
  DELETE_POLL, DELETE_POLL_SUCCESS, DELETE_POLL_FAILURE
} from '../../constants';
import { requestOpts, requestApi } from '../../helpers';



describe('pollSagas', () => {

  describe('watchers', () => {

    it('watchGetPolls() calls takeLatest on GET_POLLS action', () => {
      const gen = watchGetPolls();
      expect(gen.next().value).toEqual(takeLatest(GET_POLLS, getPolls));
      expect(gen.next()).toEqual({ done: true, value: undefined });
    });
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
    it('watchUpdatePollStatus() calls takeLatest on UPDATE_POLL_STATUS action', () => {
      const gen = watchUpdatePollStatus();
      expect(gen.next().value).toEqual(takeLatest(UPDATE_POLL_STATUS, updatePollStatus));
      expect(gen.next()).toEqual({ done: true, value: undefined });
    });
    it('watchUpdatePollVote() calls takeLatest on UPDATE_POLL_VOTE action', () => {
      const gen = watchUpdatePollVote();
      expect(gen.next().value).toEqual(takeLatest(UPDATE_POLL_VOTE, updatePollVote));
      expect(gen.next()).toEqual({ done: true, value: undefined });
    });
    it('watchUpdatePollSuccess() calls takeLatest on UPDATE_POLL_SUCCESS action', () => {
      const gen = watchUpdatePollSuccess();
      expect(gen.next().value).toEqual(takeLatest(UPDATE_POLL_SUCCESS, updatePollSuccess));
      expect(gen.next()).toEqual({ done: true, value: undefined });
    });
    it('watchDeletePoll() calls takeLatest on DELETE_POLL action', () => {
      const gen = watchDeletePoll();
      expect(gen.next().value).toEqual(takeLatest(DELETE_POLL, deletePoll));
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

    describe('get polls flow', () => {
      let getPollsAction, clone;
      beforeAll(() => getPollsAction = pollActions.getPolls());
      beforeEach(() => {
        const gen = cloneableGenerator(getPolls)(getPollsAction);
        clone = gen.clone();
      });

      it('completes successfully on success', () => {
        expect(clone.next().value).toEqual(call(getPollsApi));
        expect(clone.next().value).toEqual(put({
          type: GET_POLLS_SUCCESS, polls: []
        }));
        expect(clone.next().done).toEqual(true);
      });
      it('throws successfully on failure', () => {
        clone.next();
        const error = 'Error creating poll.';
        expect(clone.throw(error).value)
          .toEqual(put({ type: GET_POLLS_FAILURE, error }));
        expect(clone.next().done).toEqual(true);
      });
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
        expect(clone.next().value).toEqual(call(postPollApi, { title: poll.title, choices: poll.choices, user_id: 'public', user_name: 'public' }));
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

    describe('update poll status flow', () => {
      let updatePollStatusAction, clone;
      beforeAll(() => updatePollStatusAction = pollActions.updatePollStatus());
      beforeEach(() => {
        const gen = cloneableGenerator(updatePollStatus)(updatePollStatusAction);
        clone = gen.clone();
      });
      it('completes successfully on success', () => {
        expect(clone.next().value).toEqual(select(getViewedPoll));
        // clone.next();
        expect(clone.next().value).toEqual(call(updatePollApi, '12345', { open: true }));
        expect(clone.next().value).toEqual(put({
          type: UPDATE_POLL_SUCCESS,
          message: 'success',
          poll: {
            cuid: '12345',
            open: true
          }
        }));
        expect(clone.next().done).toEqual(true);
      });
      it('throws successfully on failure', () => {
        clone.next();
        const error = 'Error updating poll.';
        expect(clone.throw(error).value)
          .toEqual(put({ type: UPDATE_POLL_FAILURE, error }));
        expect(clone.next().done).toEqual(true);
      });
    });

    describe('update poll vote flow', () => {
      let updatePollVoteAction, clone;
      beforeAll(() => updatePollVoteAction = pollActions.updatePollVote( { choice: 'React' }, promises));
      beforeEach(() => {
        const gen = cloneableGenerator(updatePollVote)(updatePollVoteAction);
        clone = gen.clone();
      });
      it('completes successfully on success', () => {

        expect(clone.next().value).toEqual(select(getAuthedUser));
        expect(clone.next().value).toEqual(select(getActivePoll));
        expect(clone.next().value).toEqual(call(updatePollVoteApi, '12345', { open: true }));
        expect(clone.next().value).toEqual(put({
          type: UPDATE_POLL_SUCCESS,
          message: 'success',
          poll: {
            cuid: '12345',
            open: true
          }
        }));
        expect(clone.next().value).toEqual(put(reset('votePoll')));
        expect(clone.next().value).toEqual(call(promises.resolve));
        expect(clone.next().done).toEqual(true);
      });
      it('throws successfully on failure', () => {
        clone.next();
        const error = 'Error updating poll.';
        expect(clone.throw(error).value)
          .toEqual(put({ type: UPDATE_POLL_FAILURE, error }));
        expect(clone.next().value)
          .toEqual(call(promises.reject, (new SubmissionError(error))));
        expect(clone.next().done).toEqual(true);
      });
    });

    describe('delete poll flow', () => {
      let deletePollAction, clone;
      beforeAll(() => deletePollAction = pollActions.deletePoll('12345'));
      beforeEach(() => {
        const gen = cloneableGenerator(deletePoll)(deletePollAction);
        clone = gen.clone();
      });

      it('completes successfully on success', () => {
        expect(clone.next().value).toEqual(call(deletePollApi, '12345'));
        expect(clone.next().value).toEqual(put({
          type: DELETE_POLL_SUCCESS, message: 'Poll deleted.'
        }));
        expect(gen.next().value).toEqual(history.push('/account'));
        expect(clone.next().done).toEqual(true);
      });
      it('throws successfully on failure', () => {
        clone.next();
        const error = 'Error creating poll.';
        expect(clone.throw(error).value)
          .toEqual(put({ type: DELETE_POLL_FAILURE, error }));
        expect(clone.next().done).toEqual(true);
      });
    });

  });
});
