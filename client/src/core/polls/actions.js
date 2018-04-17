import {
  RESET_POLLS, RESET_ACTIVE_POLL, RESET_VIEWED_POLL,
  GET_POLLS, GET_POLLS_SUCCESS, GET_POLLS_FAILURE,
  POST_POLL, POST_POLL_SUCCESS, POST_POLL_FAILURE,
  UPDATE_POLL_STATUS, UPDATE_POLL_VOTE,
  UPDATE_POLL_SUCCESS, UPDATE_POLL_FAILURE,
  DELETE_POLL, DELETE_POLL_SUCCESS, DELETE_POLL_FAILURE,
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

  getPollsSuccess: ({ polls }) => ({
    type: GET_POLLS_SUCCESS,
    payload: {
      polls
    }
  }),

  getPollsFailure: error => ({
    type: GET_POLLS_FAILURE,
    payload: {
      error
    }
  }),

  postPoll: ({ title, choices }, { resolve, reject }) => ({
    type: POST_POLL,
    payload: {
      title,
      choices,
      resolve,
      reject
    }
  }),

  postPollSuccess: ({ poll, message }) => ({
    type: POST_POLL_SUCCESS,
    payload: {
      poll,
      message
    }
  }),

  postPollFailure: error => ({
    type: POST_POLL_FAILURE,
    payload: {
      error
    }
  }),

  updatePollStatus: () => ({
    type: UPDATE_POLL_STATUS
  }),

  updatePollVote: ({ choice }, { resolve, reject }) => ({
    type: UPDATE_POLL_VOTE,
    payload: {
      choice,
      resolve,
      reject
    }
  }),

  updatePollSuccess: ({ poll, message }) => ({
    type: UPDATE_POLL_SUCCESS,
    payload: {
      poll,
      message
    }
  }),

  updatePollFailure: error => ({
    type: UPDATE_POLL_FAILURE,
    payload: {
      error
    }
  }),

  deletePoll: id => ({
    type: DELETE_POLL,
    payload: {
      id
    }
  }),

  deletePollSuccess: ({ id, message }) => ({
    type: DELETE_POLL_SUCCESS,
    payload: {
      id,
      message
    }
  }),

  deletePollFailure: error => ({
    type: DELETE_POLL_FAILURE,
    payload: {
      error
    }
  }),

  loadFilteredPolls: (filters = null) => ({
    type: LOAD_FILTERED_POLLS,
    payload: {
      filters
    }
  }),

  loadActivePoll: id => ({
    type: LOAD_ACTIVE_POLL,
    payload: {
      id
    }
  }),

  loadViewedPoll: id => ({
    type: LOAD_VIEWED_POLL,
    payload: {
      id
    }
  })

};

export const pollRequestActions = {
  getPending: pollActions.getPolls,
  getFulfilled: pollActions.getPollsSuccess,
  getFailed: pollActions.getPollsFailure,

  postPending: pollActions.postPoll,
  postFulfilled: pollActions.postPollSuccess,
  postFailed: pollActions.postPollFailure,

  updateStatusPending: pollActions.updatePollStatus,
  updateVotePending: pollActions.updatePollVote,
  updateFulfilled: pollActions.updatePollSuccess,
  updateFailed: pollActions.updatePollFailure,

  deletePending: pollActions.deletePoll,
  deleteFulfilled: pollActions.deletePollSuccess,
  deleteFailed: pollActions.deletePollFailure
};
