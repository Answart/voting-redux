import { pollReducer } from '../../core/polls';
import { userReducer } from '../../core/users';
import { reducer as form } from 'redux-form';


// ======================================================
// STATES

export const mockUser = {
  cuid: '987654321',
  name: 'Alexandra',
  email: 'alex@gmail.com',
  password: '12345',
  activity: [],
  token: 'secret'
};

export const mockUsersInitialState = {
  authedUser: {
    loading: false,
    error: null,
    message: null,
    token: null,
    user: null
  }
};

export const mockPollsInitialState = {
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

export const mockPoll = {
  cuid: '123456789',
  user_id: mockUser.cuid,
  user_name: mockUser.name,
  votes: 10,
  open: true,
  date_created: '2018-04-06T04:34:25.183Z',
  date_updated: '2018-04-06T04:34:25.183Z',
  title: 'Best Spaniel Breed',
  choices: [
    { id: 0, label: 'Springer Spaniel', vote: 4 },
    { id: 1, label: 'Cocker Spaniel', vote: 6 }
  ]
};
export const mockPolls = [{
    cuid: '123456789',
    user_name: 'Alexandra',
    votes: 10,
    open: true,
    date_created: '2018-04-06T04:34:25.183Z',
    date_updated: '2018-04-06T04:34:25.183Z',
    title: 'Best Spaniel Breed',
    choices: [
      { id: 0, label: 'Springer Spaniel', vote: 4 },
      { id: 1, label: 'Cocker Spaniel', vote: 6 }
    ]
  }, {
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


// ======================================================
// MOCK SCENARIOS

const mockUsersAuthed = userReducer(mockUsersInitialState, { type: 'AUTH_USER_SUCCESS', payload: { message: 'Yay', user: mockUser }});
mockPollsInitialState.viewed.id = '2';
mockPollsInitialState.filtered.filters = [{
  label: 'User',
  key: 'user_name',
  value: 'name2'
}];
const mockPollsFetched = pollReducer(mockPollsInitialState, { type: 'GET_POLLS_SUCCESS', payload: { polls: mockPolls }});


// ======================================================
// MOCK REDUCER STATES

export const mockInitialState = { form, users: mockUsersInitialState, polls: mockPollsInitialState };
export const mockState = { form, users: mockUsersAuthed, polls: mockPollsFetched };
