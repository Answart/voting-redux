import { call, put, fork, select, takeLatest } from 'redux-saga/effects';
import { SubmissionError, reset } from 'redux-form';
import { cloneableGenerator } from 'redux-saga/utils';
// Import compoenents
import history from '../../history';
import { mockUser, mockPoll, mockPolls } from '../../../utils/__test__';
import { getAuthedUser } from '../../users';
import {
  getActivePoll, getViewedPoll,
  pollActions, pollReducer, pollSagas,
  getPollsApi, postPollApi, updatePollApi, updatePollVoteApi, deletePollApi
} from '../../polls';
import {
  GET_POLLS, GET_POLLS_SUCCESS, GET_POLLS_FAILURE,
  POST_POLL, POST_POLL_SUCCESS, POST_POLL_FAILURE,
  UPDATE_POLL_STATUS, UPDATE_POLL_VOTE,
  UPDATE_POLL_SUCCESS, UPDATE_POLL_FAILURE,
  DELETE_POLL, DELETE_POLL_SUCCESS, DELETE_POLL_FAILURE
} from '../../constants';


describe('pollSagas', () => {

  describe('watchers', () => {

    it('watchGetPollsSaga() calls takeLatest on GET_POLLS action', () => {
      const gen = cloneableGenerator(pollSagas.watchGetPollsSaga)();
      expect(gen.next().value).toEqual(
        takeLatest(GET_POLLS, pollSagas.getPollsSaga));
      expect(gen.next().done).toEqual(true);
    });
    it('watchPostPollSaga() calls takeLatest on POST_POLL action', () => {
      const gen = cloneableGenerator(pollSagas.watchPostPollSaga)();
      expect(gen.next().value).toEqual(
        takeLatest(POST_POLL, pollSagas.postPollSaga));
      expect(gen.next().done).toEqual(true);
    });
    it('watchPostPollSuccessSaga() calls takeLatest on POST_POLL_SUCCESS action', () => {
      const gen = cloneableGenerator(pollSagas.watchPostPollSuccessSaga)();
      expect(gen.next().value).toEqual(
        takeLatest(POST_POLL_SUCCESS, pollSagas.postPollSuccessSaga));
      expect(gen.next().done).toEqual(true);
    });
    it('watchUpdatePollStatusSaga() calls takeLatest on UPDATE_POLL_STATUS action', () => {
      const gen = cloneableGenerator(pollSagas.watchUpdatePollStatusSaga)();
      expect(gen.next().value).toEqual(
        takeLatest(UPDATE_POLL_STATUS, pollSagas.updatePollStatusSaga));
      expect(gen.next().done).toEqual(true);
    });
    it('watchUpdatePollVoteSaga() calls takeLatest on UPDATE_POLL_VOTE action', () => {
      const gen = cloneableGenerator(pollSagas.watchUpdatePollVoteSaga)();
      expect(gen.next().value).toEqual(
        takeLatest(UPDATE_POLL_VOTE, pollSagas.updatePollVoteSaga));
      expect(gen.next().done).toEqual(true);
    });
    it('watchUpdatePollSuccess() calls takeLatest on UPDATE_POLL_SUCCESS action', () => {
      const gen = cloneableGenerator(pollSagas.watchUpdatePollSuccessSaga)();
      expect(gen.next().value).toEqual(
        takeLatest(UPDATE_POLL_SUCCESS, pollSagas.updatePollSuccessSaga));
      expect(gen.next().done).toEqual(true);
    });
    it('watchDeletePollSaga() calls takeLatest on DELETE_POLL action', () => {
      const gen = cloneableGenerator(pollSagas.watchDeletePollSaga)();
      expect(gen.next().value).toEqual(
        takeLatest(DELETE_POLL, pollSagas.deletePollSaga));
      expect(gen.next().done).toEqual(true);
    });
  });

  describe('watched sagas', () => {
    let promises;
    beforeAll(() => {
      promises = {};
      var grabPromises = new Promise(function(resolve, reject) {
        promises.resolve = resolve;
        promises.reject = reject;
      });
    });

    describe('get polls flow', () => {
      let getPollsAction, clone;
      beforeAll(() => getPollsAction = pollActions.getPolls());
      beforeEach(() => clone = (cloneableGenerator(pollSagas.getPollsSaga)(getPollsAction)).clone());

      it('completes successfully on success', () => {
        expect(clone.next().value).toEqual(
          call(getPollsApi));
        expect(clone.next({ polls: mockPolls }).value).toEqual(
          put({
          type: GET_POLLS_SUCCESS, polls: mockPolls
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
      beforeAll(() => postPollAction = pollActions.postPoll(mockPoll, promises));
      beforeEach(() => clone = (cloneableGenerator(pollSagas.postPollSaga)(postPollAction)).clone());

      it('completes successfully on success', () => {
        expect(clone.next().value).toEqual(
          select(getAuthedUser));
        expect(clone.next({ ...mockUser }).value).toEqual(
          call(postPollApi, { title: mockPoll.title, choices: mockPoll.choices, user_id: mockUser.cuid, user_name: mockUser.name }));
        expect(clone.next({ poll: mockPoll, message: 'success' }).value).toEqual(
          put({
            type: POST_POLL_SUCCESS,
            poll: mockPoll,
            message: 'success'
          }));
        expect(clone.next().value).toEqual(
          put(reset('newPoll')));
        expect(clone.next().value).toEqual(
          call(promises.resolve));
        expect(clone.next().done).toEqual(true);
      });
      it('throws successfully on failure', () => {
        clone.next();
        const error = 'Error creating poll.';
        expect(clone.throw(error).value).toEqual(
          put({ type: POST_POLL_FAILURE, error }));
        expect(clone.next().value).toEqual(
          call(promises.reject, (new SubmissionError(error))));
        expect(clone.next().done).toEqual(true);
      });
    });

    describe('update poll status flow', () => {
      let updatePollStatusAction, clone;
      beforeAll(() => updatePollStatusAction = pollActions.updatePollStatus());
      beforeEach(() => clone = (cloneableGenerator(pollSagas.updatePollStatusSaga)(updatePollStatusAction)).clone());

      it('completes successfully on success', () => {
        expect(clone.next().value).toEqual(
          select(getViewedPoll));
        expect(clone.next({ ...mockPoll }).value).toEqual(
          call(updatePollApi, mockPoll.cuid, { open: (mockPoll.open ? false : true) }));
        expect(clone.next({ poll: mockPoll, message: 'success' }).value).toEqual(
          put({
            type: UPDATE_POLL_SUCCESS,
            message: 'success',
            poll: {
              open: false,
              ...mockPoll
            }
          }));
        expect(clone.next().done).toEqual(true);
      });
      it('throws successfully on failure', () => {
        clone.next();
        const error = 'Error updating poll.';
        expect(clone.throw(error).value).toEqual(
          put({ type: UPDATE_POLL_FAILURE, error }));
        expect(clone.next().done).toEqual(true);
      });
    });

    describe('update poll vote flow', () => {
      let updatePollVoteAction, clone;
      beforeAll(() => updatePollVoteAction = pollActions.updatePollVote( { choice: mockPoll.choices[0].label }, promises));
      beforeEach(() => clone = (cloneableGenerator(pollSagas.updatePollVoteSaga)(updatePollVoteAction)).clone());

      it('completes successfully on success', () => {
        expect(clone.next().value).toEqual(
          select(getAuthedUser));
        expect(clone.next({ ...mockUser }).value).toEqual(
          select(getActivePoll));
        expect(clone.next({ ...mockPoll }).value).toEqual(
          call(updatePollVoteApi, mockPoll.cuid, { voterId: mockUser.cuid, choicesLabel: mockPoll.choices[0].label }));
        expect(clone.next({ poll: mockPoll, message: 'success' }).value).toEqual(
          put({
            type: UPDATE_POLL_SUCCESS,
            message: 'success',
            poll: mockPoll
          }));
        expect(clone.next().value).toEqual(
          put(reset('votePoll')));
        expect(clone.next().value).toEqual(
          call(promises.resolve));
        expect(clone.next().done).toEqual(true);
      });
      it('throws successfully on failure', () => {
        clone.next();
        const error = 'Error updating poll.';
        expect(clone.throw(error).value).toEqual(
          put({ type: UPDATE_POLL_FAILURE, error }));
        expect(clone.next().value).toEqual(
          call(promises.reject, (new SubmissionError(error))));
        expect(clone.next().done).toEqual(true);
      });
    });

    describe('delete poll flow', () => {
      let deletePollAction, clone;
      beforeAll(() => deletePollAction = pollActions.deletePoll(mockPoll.cuid));
      beforeEach(() => clone = (cloneableGenerator(pollSagas.deletePollSaga)(deletePollAction)).clone());

      it('completes successfully on success', () => {
        expect(clone.next().value).toEqual(
          call(deletePollApi, mockPoll.cuid));
        const message = 'Poll deleted.';
        expect(clone.next({ message }).value).toEqual(
          put({
            type: DELETE_POLL_SUCCESS, message
          }));
        expect(clone.next().value).toEqual(
          history.push('/account'));
        expect(clone.next().done).toEqual(true);
      });
      it('throws successfully on failure', () => {
        clone.next();
        const error = 'Error creating poll.';
        expect(clone.throw(error).value).toEqual(
          put({ type: DELETE_POLL_FAILURE, error }));
        expect(clone.next().done).toEqual(true);
      });
    });
  });
});
