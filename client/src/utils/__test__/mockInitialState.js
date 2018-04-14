import { pollReducer } from '../../core/polls';
import { userReducer } from '../../core/users';
import { reducer as form } from 'redux-form';


// ======================================================
// INITIAL STATES

const usersInitialState = {
  authedUser: {
    loading: false,
    error: null,
    message: null,
    token: null,
    user: null
  }
};
const pollsInitialState = {
  all: {
    loading: false, error: null, polls: null
  },
  filtered: {
    loading: false, error: null, message: null, filters: null, polls: null
  },
  active: {
    loading: false, error: null, message: null, poll: null
  },
  viewed: {
    loading: false, error: null, message: null, id: null, poll: null
  }
};


// ======================================================
// MOCK SCENARIOS

const users = userReducer(usersInitialState, { type: 'AUTH_USER_SUCCESS', message: 'Yay', user: {
  name: 'alexandra',
  cuid: '12345',
  activity: [],
  token: '54321'
}});

const allPolls = [{
    cuid: '1',
    title: 'random title',
    user_name: 'name1',
    votes: 10,
    open: true,
    date_created: '2018-04-06T04:34:25.183Z',
    choices: [
      { id: 0, label: 'red', vote: 4 },
      { id: 1, label: 'blue', vote: 6 }
    ]
  }, {
    cuid: '2',
    title: 'random title2',
    user_name: 'name2',
    votes: 30,
    open: false,
    date_created: '2018-04-06T04:34:01.247Z',
    choices: [
      { id: 0, label: 'red2', vote: 14 },
      { id: 1, label: 'blue2', vote: 16 }
    ]
  }, {
    cuid: '3',
    title: 'random title3',
    user_name: 'name3',
    votes: 30,
    open: false,
    date_created: '2018-04-06T04:34:01.247Z',
    choices: [
      { id: 0, label: 'red3', vote: 14 },
      { id: 1, label: 'blue3', vote: 16 }
    ]
  }, {
    cuid: '4',
    title: 'random title4',
    user_name: 'name4',
    votes: 30,
    open: false,
    date_created: '2018-04-06T04:34:01.247Z',
    choices: [
      { id: 0, label: 'red2', vote: 14 },
      { id: 1, label: 'blue2', vote: 16 }
    ]
  }, {
    cuid: '5',
    title: 'random title5',
    user_name: 'name5',
    votes: 30,
    open: false,
    date_created: '2018-04-06T04:34:01.247Z',
    choices: [
      { id: 0, label: 'red2', vote: 14 },
      { id: 1, label: 'blue2', vote: 16 }
    ]
  }, {
    cuid: '6',
    title: 'random title6',
    user_name: 'name6',
    votes: 30,
    open: false,
    date_created: '2018-04-06T04:34:01.247Z',
    choices: [
      { id: 0, label: 'red2', vote: 14 },
      { id: 1, label: 'blue2', vote: 16 }
    ]
  }, {
    cuid: '7',
    title: 'random title7',
    user_name: 'name7',
    votes: 30,
    open: false,
    date_created: '2018-04-06T04:34:01.247Z',
    choices: [
      { id: 0, label: 'red2', vote: 14 },
      { id: 1, label: 'blue2', vote: 16 }
    ]
  }, {
    cuid: '8',
    title: 'random title8',
    user_name: 'name8',
    votes: 30,
    open: false,
    date_created: '2018-04-06T04:34:01.247Z',
    choices: [
      { id: 0, label: 'red2', vote: 14 },
      { id: 1, label: 'blue2', vote: 16 }
    ]
  }, {
    cuid: '9',
    title: 'random title9',
    user_name: 'name9',
    votes: 30,
    open: false,
    date_created: '2018-04-06T04:34:01.247Z',
    choices: [
      { id: 0, label: 'red2', vote: 14 },
      { id: 1, label: 'blue2', vote: 16 }
    ]
  }, {
    cuid: '10',
    title: 'random title10',
    user_name: 'name10',
    votes: 30,
    open: false,
    date_created: '2018-04-06T04:34:01.247Z',
    choices: [
      { id: 0, label: 'red2', vote: 14 },
      { id: 1, label: 'blue2', vote: 16 }
    ]
  }
];
pollsInitialState.viewed.id = '2';
pollsInitialState.filtered.filters = [{
  label: 'User',
  key: 'user_name',
  value: 'name2'
}];
const polls = pollReducer(pollsInitialState, { type: 'GET_POLLS_SUCCESS', polls: allPolls });


// ======================================================
// MOCK STATES

export const mockInitialState = { form, users: usersInitialState, polls: pollsInitialState };
export const mockState = { form, users, polls };
