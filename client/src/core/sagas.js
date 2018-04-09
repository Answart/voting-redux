import { all } from 'redux-saga/effects';
import { userSagas } from './users';


export default function* sagas() {
  yield all([
    ...userSagas
  ]);
}
