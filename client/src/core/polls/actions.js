import {
  GET_POLLS,
  POST_POLL
} from '../constants';


export const pollActions = {

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
  getPolls: pollActions.getPolls,
  postPoll: pollActions.postPoll
};
