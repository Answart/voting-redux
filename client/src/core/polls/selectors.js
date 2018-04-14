
export function getStatePolls(state) {
  return state.polls;
};

export function getStateAllPolls(state) {
  return state.polls.all.polls;
};

export function getStateFilteredPolls(state) {
  return state.polls.filtered.polls;
};

export function getStateActivePoll(state) {
  return state.polls.active.poll;
};

export function getStateViewedPoll(state) {
  return state.polls.viewed.poll;
};

export function getStateViewedId(state) {
  return state.polls.viewed.id;
};
