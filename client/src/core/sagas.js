import { all } from 'redux-saga/effects';
import { userSagas } from './users';
import { pollSagas } from './polls';


export default function* sagas() {
  yield all([
    ...userSagas,
    ...pollSagas
  ]);
}
