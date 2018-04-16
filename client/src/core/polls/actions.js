import {
  RESET_POLLS, RESET_ACTIVE_POLL, RESET_VIEWED_POLL,
  GET_POLLS,
  POST_POLL,
  UPDATE_POLL_STATUS,
  DELETE_POLL,
  LOAD_FILTERED_POLLS, LOAD_ACTIVE_POLL, LOAD_VIEWED_POLL
} from '../constants';


export const pollActions = {

  resetPolls: () => ({
    type: RESET_POLLS
  }),

  resetActivePoll: () => ({
    type: RESET_ACTIVE_POLL
  }),

  resetViewedPoll: () => ({
    type: RESET_VIEWED_POLL
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

  updatePollStatus: () => ({
    type: UPDATE_POLL_STATUS
  }),

  deletePoll: id => ({
    type: DELETE_POLL,
    id
  }),

  loadFilteredPolls: (filters = null) => ({
    type: LOAD_FILTERED_POLLS,
    filters
  }),

  loadActivePoll: id => ({
    type: LOAD_ACTIVE_POLL,
    id
  }),

  loadViewedPoll: id => ({
    type: LOAD_VIEWED_POLL,
    id
  })

};

export const pollRequestActions = {
  resetPolls: pollActions.resetPolls,
  resetActivePoll: pollActions.resetActivePoll,
  resetViewedPoll: pollActions.resetViewedPoll,
  getPolls: pollActions.getPolls,
  postPoll: pollActions.postPoll,
  updatePollStatus: pollActions.updatePollStatus,
  deletePoll: pollActions.deletePoll,
  loadFilteredPolls: pollActions.loadFilteredPolls,
  loadActivePoll: pollActions.loadActivePoll,
  loadViewedPoll: pollActions.loadViewedPoll
};
