import { all } from 'redux-saga/effects';
import { userSagaWatchers } from './users';
import { pollSagas } from './polls';


export default function* sagas() {
  yield all([
    ...userSagaWatchers,
    ...pollSagas
  ]);
};
