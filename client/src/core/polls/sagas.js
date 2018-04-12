import { call, put, fork, select, takeLatest } from 'redux-saga/effects';
import { SubmissionError, reset } from 'redux-form';
// Import compoenents
import history from '../history';
import { getAuthedUser } from '../users';
import {
  getViewedId,
  postPollApi
} from '../polls';
import {
  POST_POLL, POST_POLL_SUCCESS, POST_POLL_FAILURE
} from '../constants';


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
  const viewedId = yield select(getViewedId);
  yield history.push(`/poll/${viewedId}`);
};


//=====================================
//  WATCHERS
//-------------------------------------

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
  fork(watchPostPoll),
  fork(watchPostPollSuccess),
];
