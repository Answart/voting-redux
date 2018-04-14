import { APP_URL } from '../constants';
import { requestOpts, requestApi } from '../helpers';


export function getPollsApi() {
  return requestApi(`${APP_URL}/api/polls/all`, requestOpts('GET'));
};

export function postPollApi(title, choices, user_id, user_name) {
  const body = { title, choices, user_id, user_name };
  return requestApi(`${APP_URL}/api/poll/create`, requestOpts('POST', body));
};
