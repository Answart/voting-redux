import {
  RESET_POLLS,
  GET_POLLS,
  POST_POLL
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
  })

};

export const pollRequestActions = {
  resetPolls: pollActions.resetPolls,
  getPolls: pollActions.getPolls,
  postPoll: pollActions.postPoll
};
