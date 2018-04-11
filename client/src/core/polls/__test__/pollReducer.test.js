import { pollActions, pollReducer } from '../../polls';


describe('userReducer', () => {
  let initialState;
  beforeEach(() => initialState = {
    all: {
      loading: false, error: null, polls: null
    },
    filtered: {
      loading: false, error: null, message: null, filters: null, polls: null
    },
    active: {
      loading: false, error: null, message: null, poll: null
    },
    viewed: {
      loading: false, error: null, message: null, id: null, poll: null
    }
  });

  describe('default', () => {
    it('returns initial state', () => {
      expect(pollReducer()).toEqual(initialState);
    });
  });

});
