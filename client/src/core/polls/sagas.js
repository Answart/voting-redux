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


export function* getPolls() {
  try {
    const response = yield call(getPollsApi);
    yield put({ type: GET_POLLS_SUCCESS, polls: response.polls });
  } catch (error) {
    yield put({ type: GET_POLLS_FAILURE, error });
  }
};

export function* postPoll(action) {
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
export function* postPollSuccess() {
  const viewedId = yield select(getViewedId);
  yield history.push(`/poll/${viewedId}`);
};

export function* updatePollStatus(action) {
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
export function* updatePollVote(action) {
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
export function* updatePollSuccess() {
  const viewedPollId = yield select(getViewedId);
  if (!!viewedPollId) {
    yield history.push(`/poll/${viewedPollId}`);
  }
};

export function* deletePoll(action) {
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

export function* watchGetPolls() {
  yield takeLatest(GET_POLLS, getPolls);
};
export function* watchPostPoll() {
  yield takeLatest(POST_POLL, postPoll);
};
export function* watchPostPollSuccess() {
  yield takeLatest(POST_POLL_SUCCESS, postPollSuccess);
};
export function* watchUpdatePollStatus() {
  yield takeLatest(UPDATE_POLL_STATUS, updatePollStatus);
};
export function* watchUpdatePollVote() {
  yield takeLatest(UPDATE_POLL_VOTE, updatePollVote);
};
export function* watchUpdatePollSuccess() {
  yield takeLatest(UPDATE_POLL_SUCCESS, updatePollSuccess);
};
export function* watchDeletePoll() {
  yield takeLatest(DELETE_POLL, deletePoll);
};


//=====================================
//  ROOT
//-------------------------------------

export const pollSagas = [
  fork(watchGetPolls),
  fork(watchPostPoll),
  fork(watchPostPollSuccess),
  fork(watchUpdatePollStatus),
  fork(watchUpdatePollVote),
  fork(watchUpdatePollSuccess),
  fork(watchDeletePoll)
];
