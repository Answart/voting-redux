import { call, put, fork, select, takeLatest } from 'redux-saga/effects';
import { SubmissionError, reset } from 'redux-form';
// Import compoenents
import history from '../history';
import { getAuthedUser } from '../users';
import {
  getStateViewedId,
  getPollsApi, postPollApi
} from '../polls';
import {
  GET_POLLS, GET_POLLS_SUCCESS, GET_POLLS_FAILURE,
  POST_POLL, POST_POLL_SUCCESS, POST_POLL_FAILURE
} from '../constants';


export function* getPolls() {
  try {
    const polls = yield call(getPollsApi);
    yield put({ type: GET_POLLS_SUCCESS, polls });
  } catch (error) {
    yield put({ type: GET_POLLS_FAILURE, error });
  }
};

export function* postPoll(action) {
  const { title, choices, resolve, reject } = action;
  try {
    let authedUser = yield select(getAuthedUser);
    const user = (!!authedUser ? authedUser : { name: 'public', cuid: 'public' });
    const response = yield call(postPollApi, title, choices, user.cuid, user.name);
    yield put({ type: POST_POLL_SUCCESS, poll: response.poll, message: response.message });
    yield put(reset('newPoll'));
    yield call(resolve);
  } catch (error) {
    yield put({ type: POST_POLL_FAILURE, error });
    yield call(reject, (new SubmissionError(error)));
  }
};
export function* postPollSuccess() {
  const viewedId = yield select(getStateViewedId);
  yield history.push(`/poll/${viewedId}`);
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


//=====================================
//  ROOT
//-------------------------------------

export const pollSagas = [
  fork(watchGetPolls),
  fork(watchPostPoll),
  fork(watchPostPollSuccess),
];
