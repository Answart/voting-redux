
export function getPolls(state) {
  return state.polls;
};

export function getAllPolls(state) {
  return state.polls.all.polls;
};

export function getFilteredPolls(state) {
  return state.polls.filtered.polls;
};

export function getActivePoll(state) {
  return state.polls.active.poll;
};

export function getViewedPoll(state) {
  return state.polls.viewed.poll;
};

export function getViewedId(state) {
  return state.polls.viewed.id;
};
