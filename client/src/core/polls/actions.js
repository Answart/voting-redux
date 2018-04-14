import {
  RESET_POLLS,
  GET_POLLS,
  POST_POLL,
  DELETE_POLL,
  LOAD_VIEWED_POLL
} from '../constants';


export const pollActions = {

  resetPolls: () => ({
    type: RESET_POLLS
  }),

  getPolls: () => ({
    type: GET_POLLS
  }),

  postPoll: ({ title, choices }, { resolve, reject }) => ({
    type: POST_POLL,
    title,
    choices,
    resolve,
    reject
  }),

  deletePoll: id => ({
    type: DELETE_POLL,
    id
  }),

  loadViewedPoll: id => ({
    type: LOAD_VIEWED_POLL,
    id
  })

};

export const pollRequestActions = {
  resetPolls: pollActions.resetPolls,
  getPolls: pollActions.getPolls,
  postPoll: pollActions.postPoll,
  deletePoll: pollActions.deletePoll,
  loadViewedPoll: pollActions.loadViewedPoll
};
