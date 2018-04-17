import { call, put, fork, select, takeLatest } from 'redux-saga/effects';
import { SubmissionError, reset } from 'redux-form';
// Import compoenents
import history from '../history';
import { getAuthedUser } from '../users';
import {
  getActivePoll, getViewedPoll, getViewedId,
  getPollsApi, postPollApi, updatePollApi, updatePollVoteApi, deletePollApi
} from '../polls';
import {
  GET_POLLS, GET_POLLS_SUCCESS, GET_POLLS_FAILURE,
  POST_POLL, POST_POLL_SUCCESS, POST_POLL_FAILURE,
  UPDATE_POLL_STATUS, UPDATE_POLL_VOTE,
  UPDATE_POLL_SUCCESS, UPDATE_POLL_FAILURE,
  DELETE_POLL, DELETE_POLL_SUCCESS, DELETE_POLL_FAILURE
} from '../constants';


export function* getPollsSaga() {
  try {
    const response = yield call(getPollsApi);
    yield put({ type: GET_POLLS_SUCCESS, polls: response.polls });
  } catch (error) {
    yield put({ type: GET_POLLS_FAILURE, error });
  }
};

export function* postPollSaga(action) {
  const { title, choices, resolve, reject } = action;
  try {
    let authedUser = yield select(getAuthedUser);
    const user = (!!authedUser ? authedUser : { name: 'public', cuid: 'public' });
    const response = yield call(postPollApi, { title, choices, user_id: user.cuid, user_name: user.name });
    yield put({ type: POST_POLL_SUCCESS, poll: response.poll, message: response.message });
    yield put(reset('newPoll'));
    yield call(resolve);
  } catch (error) {
    yield put({ type: POST_POLL_FAILURE, error });
    yield call(reject, (new SubmissionError(error)));
  }
};
export function* postPollSuccessSaga() {
  const viewedId = yield select(getViewedId);
  yield history.push(`/poll/${viewedId}`);
};

export function* updatePollStatusSaga(action) {
  try {
    const viewedPoll = yield select(getViewedPoll);
    if (!viewedPoll) {
      throw new Error('Unable to update poll.');
    };
    const response = yield call(updatePollApi, viewedPoll.cuid, { open: (viewedPoll.open ? false : true) });
    yield put({ type: UPDATE_POLL_SUCCESS, poll: response.poll, message: response.message });
  } catch(error) {
    yield put({ type: UPDATE_POLL_FAILURE, error });
  }
};
export function* updatePollVoteSaga(action) {
  const { choice, resolve, reject } = action;
  try {
    const authedUser = yield select(getAuthedUser);
    const user = (!!authedUser ? authedUser : { name: 'public', cuid: 'public' });
    const activePoll = yield select(getActivePoll);
    const response = yield call(updatePollVoteApi, activePoll.cuid, { voterId: user.cuid, choicesLabel: choice });
    yield put({ type: UPDATE_POLL_SUCCESS, poll: response.poll, message: response.message });
    yield put(reset('votePoll'));
    yield call(resolve);
  } catch(error) {
    yield put({ type: UPDATE_POLL_FAILURE, error });
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
  const { id } = action;
  try {
    const response = yield call(deletePollApi, id);
    yield put({ type: DELETE_POLL_SUCCESS, message: response.message });
    yield history.push(`/account`);
  } catch(error) {
    yield put({ type: DELETE_POLL_FAILURE, error });
  }
};


//=====================================
//  WATCHERS
//-------------------------------------

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


//=====================================
//  SAGAS

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


//=====================================
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
