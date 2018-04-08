import React from 'react';
// Import components
import VotePollPopup from '../popup-vote-poll';

const mockFn = jest.fn();
const props = {
  reset: mockFn,
  handleSubmit: mockFn,
  votePollPopupOpen: true,
  closeVotePollPopup: mockFn,
  activePollState: { poll: {
    title: 'Someones Poll',
    user_name: 'Somebody else',
    choices: [
      { id: 1, label: 'choice 1' },
      { id: 2, label: 'choice 2' }
    ]
  }}
};


describe('<VotePollPopup />', () => {
  let wrapper, store,
    closeVotePollPopupSpy, handleClosePopupSpy, resetSpy, handleSubmitSpy;

  beforeAll(async () => {
    closeVotePollPopupSpy = jest.spyOn(props, 'closeVotePollPopup');
    resetSpy = jest.spyOn(props, 'reset');
    handleSubmitSpy = jest.spyOn(props, 'handleSubmit');
    wrapper = mountWithRouterConnected(<VotePollPopup {...props} />);
    wrapper.update();
    await wrapper.find(VotePollPopup).instance().componentDidMount();
    store = wrapper.instance().store;
  });
  afterEach(async () => {
    jest.clearAllMocks()
    store.clearActions();
    await asyncFlush();
  });

  it('renders properly', () => {
    const cmpnt = wrapper.find('VotePollPopup');
    expect(cmpnt).toBeDefined();
    expect(cmpnt.prop('votePollPopupOpen')).toBe(true);
    expect(cmpnt.prop('closeVotePollPopup')).toBeDefined();
    expect(cmpnt.instance().handleClosePopup).toBeDefined();
    expect(cmpnt.prop('invalid')).toBe(false);
    expect(cmpnt.prop('pristine')).toBe(true);
    expect(cmpnt.prop('submitting')).toBe(false);
    expect(cmpnt.prop('reset')).toBeDefined();
    expect(store.getActions()).toEqual([
      {
      //   type: '@@redux-form/INITIALIZE',
      //   meta: { form: 'votePoll',
      //     keepDirty: false,
      //     updateUnregisteredFields: false },
      //   payload: { title: '', choices: '' }
      // }, {
        meta: { form: 'votePoll' },
        payload: { error: undefined, syncErrors: { choice: '* Required' }},
        type: '@@redux-form/UPDATE_SYNC_ERRORS',
      }, {
        type: '@@redux-form/UPDATE_SYNC_ERRORS',
        meta: { form: 'votePoll'},
        payload: { error: undefined, syncErrors: { choice: '* Required' }}
      }, {
        type: '@@redux-form/REGISTER_FIELD',
        meta: { form: 'votePoll' },
        payload: { name: 'choice', type: 'Field' }
      }
    ]);
  });

  describe('Dialog', () => {
    let dialog;
    beforeEach(() => dialog = wrapper.find('Dialog'));

    it('renders properly', () => {
      expect(dialog.prop('open')).toBe(true);
      expect(dialog.prop('onClose')).toBeDefined();
      expect(typeof dialog.prop('onClose')).toBe('function');
    });
    it('calls closeVotePollPopup() closed', () => {
      expect(closeVotePollPopupSpy).not.toHaveBeenCalled();
      dialog.prop('onClose')();
      expect(closeVotePollPopupSpy).toHaveBeenCalled();
      expect(closeVotePollPopupSpy).toHaveBeenCalledTimes(1);
    });
  });

  describe('Cancel button', () => {
    let dialogButton;
    beforeEach(async () => {
      dialogButton = wrapper.find('Btn#cancel').find('button');
      store.clearActions();
      await asyncFlush();
    });

    it('renders properly', () => {
      expect(dialogButton.get(0)).toBeDefined();
      expect(dialogButton.prop('onClick')).toBeDefined();
      expect(dialogButton.text()).toBe('Cancel');
    });
    it('resets form/closes popup on click', () => {
      click(dialogButton);
      expect(closeVotePollPopupSpy).toHaveBeenCalled()
      expect(closeVotePollPopupSpy).toHaveBeenCalledTimes(1);
    });
  });
  describe('Vote button', () => {
    let dialogButton;
    beforeEach(() => dialogButton = wrapper.find('Btn#submit').find('button'));

    it('renders properly', () => {
      expect(dialogButton.get(0)).toBeDefined();
      expect(dialogButton.prop('disabled')).toBe(true);
      expect(dialogButton.prop('type')).toBe('submit');
      expect(dialogButton.prop('form')).toBe('vote-poll-form');
      expect(dialogButton.text()).toBe('Vote');
    });
    it('sends submit actions to redux & closes popup on successful submit', async () => {
      expect(handleSubmitSpy).not.toHaveBeenCalled();
      expect(resetSpy).not.toHaveBeenCalled();
      expect(closeVotePollPopupSpy).not.toHaveBeenCalled();
      wrapper.find('form').prop('onSubmit')();
      const actions = wrapper.instance().store.getActions();
      // length is 0 while no poll post action yet made (reset in submit action has been mocked)
      expect(actions).toEqual([]);
      expect(handleSubmitSpy).toHaveBeenCalled();
      expect(handleSubmitSpy).toHaveBeenCalledTimes(1);
      expect(resetSpy).toHaveBeenCalled();
      expect(resetSpy).toHaveBeenCalledTimes(1);
      expect(closeVotePollPopupSpy).toHaveBeenCalled();
      expect(closeVotePollPopupSpy).toHaveBeenCalledTimes(1);
    });
    it('does not send actions to redux or close popup on submit error', async () => {
      expect(closeVotePollPopupSpy).not.toHaveBeenCalled();
      submitButton(wrapper, 'submit');
      wrapper.update();
      await asyncFlush();
      expect(closeVotePollPopupSpy).not.toHaveBeenCalled();
    });
  });

  describe('form', () => {
    let form;
    beforeEach( () => form = wrapper.find('form.form'));

    it('renders properly', () => {
      expect(form.prop('id')).toBe('vote-poll-form');
      expect(form.prop('onSubmit')).toBeDefined();
      expect(typeof form.prop('onSubmit')).toBe('function');
    });

    describe('choice Field', () => {
      let connectedChoicesField, choiceField, choiceInput;
      beforeEach(async () => {
        connectedChoicesField = form.find('ConnectedField#choice');
        choiceField = connectedChoicesField.find('TextField#choice');
        choiceInput = choiceField.find('input#choice');
        store.clearActions();
        await asyncFlush();
      });

      it('renders properly', () => {
        expect(connectedChoicesField).toBeDefined();
        expect(connectedChoicesField.prop('dirty')).toBe(false);
        expect(connectedChoicesField.prop('pristine')).toBe(true);
        expect(choiceField).toBeDefined();
        expect(choiceField.prop('error')).toBe(false);
        expect(choiceField.prop('value')).toBe('');
        expect(choiceInput).toBeDefined();
        expect(choiceInput.prop('value')).toBe('');
      });
      it('updates redux form "votePoll" on input change', async () => {
        fillFormInput(wrapper, 'choice', 'Cocker Spaniel, Springer Spaniel');
        wrapper.update();
        await asyncFlush();
        const actions = wrapper.instance().store.getActions();
        expect(actions).toEqual([{
          type: '@@redux-form/CHANGE',
          meta: { field: 'choice', form: 'votePoll', persistentSubmitErrors: true, touch: true },
          payload: 'Cocker Spaniel, Springer Spaniel'
        }]);
      });
    });
  });
});
