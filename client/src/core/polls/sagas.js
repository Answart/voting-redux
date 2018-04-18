import { call, put, fork, select, takeLatest } from 'redux-saga/effects';
import { SubmissionError, reset } from 'redux-form';
import history from '../history';
import { getAuthedUser } from '../users';
import {
  pollRequestActions,
  getActivePoll, getViewedPoll, getViewedId,
  getPollsApi, postPollApi, updatePollApi, updatePollVoteApi, deletePollApi
} from '../polls';
import {
  GET_POLLS,
  POST_POLL, POST_POLL_SUCCESS,
  UPDATE_POLL_STATUS, UPDATE_POLL_VOTE,
  UPDATE_POLL_SUCCESS,
  DELETE_POLL
} from '../constants';


//=====================================================
//  SAGAS

export function* getPollsSaga() {
  try {
    const response = yield call(getPollsApi);
    yield put(pollRequestActions.getFulfilled({
      polls: response.polls
    }));
  } catch (error) {
    yield put(pollRequestActions.getFailed(error));
  }
};

export function* postPollSaga(action) {
  const { title, choices, resolve, reject } = action.payload;
  try {
    let authedUser = yield select(getAuthedUser);
    const user = (!!authedUser ? authedUser : { name: 'public', cuid: 'public' });
    const response = yield call(postPollApi, {
      title,
      choices,
      user_id: user.cuid,
      user_name: user.name
    });
    yield put(pollRequestActions.postFulfilled({
      poll: response.poll,
      message: response.message
    }));
    yield put(reset('newPoll'));
    yield call(resolve);
  } catch (error) {
    yield put(pollRequestActions.postFailed(error));
    yield call(reject, (new SubmissionError(error)));
  }
};

export function* postPollSuccessSaga() {
  const viewedId = yield select(getViewedId);
  yield history.push(`/poll/${viewedId}`);
};

export function* updatePollStatusSaga() {
  try {
    const viewedPoll = yield select(getViewedPoll);
    if (!viewedPoll) {
      throw new Error('Unable to update poll.');
    };
    const response = yield call(updatePollApi,
      viewedPoll.cuid,
      { open: (viewedPoll.open ? false : true) }
    );
    yield put(pollRequestActions.updateFulfilled({
      poll: response.poll,
      message: response.message
    }));
  } catch(error) {
    yield put(pollRequestActions.updateFailed(error));
  }
};

export function* updatePollVoteSaga(action) {
  const { choice, resolve, reject } = action.payload;
  try {
    const authedUser = yield select(getAuthedUser);
    const user = (!!authedUser ? authedUser : { name: 'public', cuid: 'public' });
    const activePoll = yield select(getActivePoll);
    const response = yield call(updatePollVoteApi,
      activePoll.cuid,
      {
        voterId: user.cuid,
        choicesLabel: choice
      }
    );
    yield put(pollRequestActions.updateFulfilled({
      poll: response.poll,
      message: response.message
    }));
    yield put(reset('votePoll'));
    yield call(resolve);
  } catch(error) {
    yield put(pollRequestActions.updateFailed(error));
    yield call(reject, (new SubmissionError(error)));
  }
};

export function* updatePollSuccessSaga() {
  const viewedPollId = yield select(getViewedId);
  if (!!viewedPollId) {
    yield history.push(`/poll/${viewedPollId}`);
  }
};

export function* deletePollSaga(action) {
  const { id } = action.payload;
  try {
    const response = yield call(deletePollApi, id);
    yield put(pollRequestActions.deleteFulfilled({
      id,
      message: response.message
    }));
    yield history.push(`/account`);
  } catch(error) {
    yield put(pollRequestActions.deleteFailed(error));
  }
};


//=====================================================
//  WATCHERS

export function* watchGetPollsSaga() {
  yield takeLatest(GET_POLLS, getPollsSaga);
};

export function* watchPostPollSaga() {
  yield takeLatest(POST_POLL, postPollSaga);
};

export function* watchPostPollSuccessSaga() {
  yield takeLatest(POST_POLL_SUCCESS, postPollSuccessSaga);
};

export function* watchUpdatePollStatusSaga() {
  yield takeLatest(UPDATE_POLL_STATUS, updatePollStatusSaga);
};

export function* watchUpdatePollVoteSaga() {
  yield takeLatest(UPDATE_POLL_VOTE, updatePollVoteSaga);
};

export function* watchUpdatePollSuccessSaga() {
  yield takeLatest(UPDATE_POLL_SUCCESS, updatePollSuccessSaga);
};

export function* watchDeletePollSaga() {
  yield takeLatest(DELETE_POLL, deletePollSaga);
};


//=====================================================
//  WATCHERS AND SAGAS

export const pollSagas = {
  watchGetPollsSaga,
  watchPostPollSaga,
  watchPostPollSuccessSaga,
  watchUpdatePollStatusSaga,
  watchUpdatePollVoteSaga,
  watchUpdatePollSuccessSaga,
  watchDeletePollSaga,
  getPollsSaga,
  postPollSaga,
  postPollSuccessSaga,
  updatePollStatusSaga,
  updatePollVoteSaga,
  updatePollSuccessSaga,
  deletePollSaga
};


//=====================================================
//  FORKED SAGA WATCHERS

export const pollSagaWatchers = [
  fork(watchGetPollsSaga),
  fork(watchPostPollSaga),
  fork(watchPostPollSuccessSaga),
  fork(watchUpdatePollStatusSaga),
  fork(watchUpdatePollVoteSaga),
  fork(watchUpdatePollSuccessSaga),
  fork(watchDeletePollSaga)
];
