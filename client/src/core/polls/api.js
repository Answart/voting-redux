import { APP_URL } from '../constants';
import { requestOpts, requestApi } from '../helpers';


export function getPollsApi() {
  return requestApi(`${APP_URL}/api/polls/all`, requestOpts('GET'));
};

export function postPollApi(title, choices, user_id, user_name) {
  const body = { title, choices, user_id, user_name };
  return requestApi(`${APP_URL}/api/poll/create`, requestOpts('POST', body));
};

export function updatePollApi(pollId, body) {
  return requestApi(`${APP_URL}/api/poll/${pollId}/update`, requestOpts('PUT', body));
};

export function updatePollVoteApi(pollId, body) {
  return requestApi(`${APP_URL}/api/poll/${pollId}/vote`, requestOpts('PUT', body));
};

export function deletePollApi(pollId) {
  return requestApi(`${APP_URL}/api/poll/${pollId}/delete`, requestOpts('DELETE'));
};
