import {
  POST_POLL
} from '../constants';


export const pollActions = {

  postPoll: ({ title, choices }, { resolve, reject }) => ({
    type: POST_POLL,
    title,
    choices,
    resolve,
    reject
  })

};

export const pollRequestActions = {
  postPoll: pollActions.postPoll
};
