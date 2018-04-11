import { call, put, fork, select, takeLatest } from 'redux-saga/effects';
import { SubmissionError, reset } from 'redux-form';
import { cloneableGenerator } from 'redux-saga/utils';
// Import compoenents
import history from '../../history';
import { pollActions, pollReducer, pollSagas } from '../../polls';


describe('pollSagas', () => {

  describe('watchers', () => {});

  describe('watched sagas', () => {});

});
