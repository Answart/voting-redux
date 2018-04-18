import React from 'react';
import {
  mountWithRouterConnected, asyncFlush,
  setValue, getInput, fillFormInput,
  submitButton, clickButton
} from '../../../utils/__test__/test.helper';
// Import components
import AuthUserPopup from '../popup-auth-user';

const mockFn = jest.fn();
const cmpntProps = {
  reset: mockFn,
  handleSubmit: mockFn,
  authUserPopupOpen: true,
  closeAuthUserPopup: mockFn,
  authUser: mockFn,
  logoutUser: mockFn,
  authProvidedUser: mockFn
};


describe('<AuthUserPopup />', () => {
  let wrapper, store,
    resetSpy, closeAuthUserPopupSpy, handleSubmitSpy;

  beforeAll(async () => {
    resetSpy = jest.spyOn(cmpntProps, 'reset');
    closeAuthUserPopupSpy = jest.spyOn(cmpntProps, 'closeAuthUserPopup');
    handleSubmitSpy = jest.spyOn(cmpntProps, 'handleSubmit');
    wrapper = mountWithRouterConnected(<AuthUserPopup {...cmpntProps} />);
    await wrapper.find(AuthUserPopup).instance().componentDidMount();
    store = wrapper.instance().store;
  });
  afterEach(async () => {
    jest.clearAllMocks()
    store.clearActions();
    await asyncFlush();
  });

  it('renders properly', () => {
    const cmpnt = wrapper.find('AuthUserPopup');
    expect(cmpnt).toBeDefined();
    expect(cmpnt.prop('authUserPopupOpen')).toBe(true);
    expect(cmpnt.prop('closeAuthUserPopup')).toBeDefined();
    expect(cmpnt.instance().handleClosePopup).toBeDefined();
    expect(cmpnt.instance().handleProviderAuth).toBeDefined();
    expect(cmpnt.instance().handleChangeTabValue).toBeDefined();
    expect(cmpnt.prop('invalid')).toBe(false);
    expect(cmpnt.prop('pristine')).toBe(true);
    expect(cmpnt.prop('submitting')).toBe(false);
    expect(cmpnt.prop('reset')).toBeDefined();
    expect(store.getActions()).toEqual([
      {
      //   type: '@@redux-form/INITIALIZE',
      //   meta: { form: 'authUser',
      //     keepDirty: false,
      //     updateUnregisteredFields: false },
      //   payload: { title: '', choices: '' }
        type: '@@redux-form/UPDATE_SYNC_ERRORS',
        meta: { form: 'authUser' },
        payload: { error: undefined, syncErrors: { name: '* Required', password: '* Required' }}
      }, {
        meta: { field: 'authType', form: 'authUser' },
        type: '@@redux-form/CHANGE',
        payload: 'login'
      }, {
        type: '@@redux-form/UPDATE_SYNC_ERRORS',
        meta: { form: 'authUser' },
        payload: { error: undefined, syncErrors: { name: '* Required', password: '* Required' }}
      }, {
        type: '@@redux-form/REGISTER_FIELD',
        meta: { form: 'authUser' },
        payload: { name: 'email', type: 'Field' }
      }, {
        type: '@@redux-form/REGISTER_FIELD',
        meta: { form: 'authUser' },
        payload: { name: 'name', type: 'Field' }
      }, {
        type: '@@redux-form/REGISTER_FIELD',
        meta: { form: 'authUser' },
        payload: { name: 'password', type: 'Field' }
      }, {
        meta: { field: 'name', form: 'authUser' },
        type: '@@redux-form/FOCUS'
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
    it('onClose() resets form/closes popup', () => {
      dialog.prop('onClose')();
      expect(resetSpy).toHaveBeenCalled();
      expect(resetSpy).toHaveBeenCalledTimes(1);
      expect(closeAuthUserPopupSpy).toHaveBeenCalled();
      expect(closeAuthUserPopupSpy).toHaveBeenCalledTimes(1);
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
      clickButton(wrapper, 'cancel');
      expect(resetSpy).toHaveBeenCalled();
      expect(resetSpy).toHaveBeenCalledTimes(1);
      expect(closeAuthUserPopupSpy).toHaveBeenCalled();
      expect(closeAuthUserPopupSpy).toHaveBeenCalledTimes(1);
    });
  });
  describe('"Sign Up" button', () => {
    let dialogButton;
    beforeEach(() => dialogButton = wrapper.find('Btn#submit').find('button'));

    it('renders properly', () => {
      expect(dialogButton.get(0)).toBeDefined();
      expect(dialogButton.prop('disabled')).toBe(true);
      expect(dialogButton.prop('type')).toBe('submit');
      expect(dialogButton.prop('form')).toBe('auth-user-form');
      expect(dialogButton.text()).toBe('Log in');
    });

    it('sends submit actions to redux & closes popup on successful submit', async () => {
      expect(handleSubmitSpy).not.toHaveBeenCalled();
      expect(resetSpy).not.toHaveBeenCalled();
      expect(closeAuthUserPopupSpy).not.toHaveBeenCalled();
      wrapper.find('form').prop('onSubmit')();
      const actions = wrapper.instance().store.getActions();
      // length is 0 while no poll post action yet made (reset in submit action has been mocked)
      expect(actions).toEqual([]);
      expect(handleSubmitSpy).toHaveBeenCalled();
      expect(handleSubmitSpy).toHaveBeenCalledTimes(1);
      expect(resetSpy).toHaveBeenCalled();
      expect(resetSpy).toHaveBeenCalledTimes(1);
      expect(closeAuthUserPopupSpy).toHaveBeenCalled();
      expect(closeAuthUserPopupSpy).toHaveBeenCalledTimes(1);
    });
    it('does not send actions to redux or close popup on submit error', async () => {
      expect(closeAuthUserPopupSpy).not.toHaveBeenCalled();
      submitButton(wrapper, 'submit');
      wrapper.update();
      await asyncFlush();
      expect(closeAuthUserPopupSpy).not.toHaveBeenCalled();
    });
  });

  describe('form', () => {
    let form;
    beforeEach( () => form = wrapper.find('form.form'));

    it('renders properly', () => {
      expect(form.prop('id')).toBe('auth-user-form');
      expect(form.prop('onSubmit')).toBeDefined();
      expect(typeof form.prop('onSubmit')).toBe('function');
    });

    describe('email Field', () => {
      let connectedTitleField, emailField, emailInput;
      beforeEach(async () => {
        connectedTitleField = form.find('ConnectedField#email');
        emailField = connectedTitleField.find('TextField#email');
        emailInput = emailField.find('input#email');
        store.clearActions();
        await asyncFlush();
      });

      it('renders properly', () => {
        expect(connectedTitleField).toBeDefined();
        expect(connectedTitleField.prop('dirty')).toBe(false);
        expect(connectedTitleField.prop('pristine')).toBe(true);
        expect(emailField).toBeDefined();
        expect(emailField.text()).toBe('Email');
        expect(emailField.prop('error')).toBe(false);
        expect(emailField.prop('value')).toBe('');
        expect(emailField.prop('disabled')).toBe(true);
        expect(emailInput).toBeDefined();
        expect(emailInput.prop('value')).toBe('');
        expect(emailInput.prop('disabled')).toBe(true);
      });
      it('updates redux form "authUser" on input change', async () => {
        fillFormInput(wrapper, 'email', 'sample@gmail.com');
        wrapper.update();
        await asyncFlush();
        const actions = wrapper.instance().store.getActions();
        expect(actions).toEqual([{
          type: '@@redux-form/CHANGE',
          meta: { field: 'email', form: 'authUser', persistentSubmitErrors: false, touch: true },
          payload: 'sample@gmail.com'
        }]);
      });
    });

    describe('name Field', () => {
      let connectedTitleField, nameField, nameInput;
      beforeEach(async () => {
        connectedTitleField = form.find('ConnectedField#name');
        nameField = connectedTitleField.find('TextField#name');
        nameInput = nameField.find('input#name');
        store.clearActions();
        await asyncFlush();
      });

      it('renders properly', () => {
        expect(connectedTitleField).toBeDefined();
        expect(connectedTitleField.prop('dirty')).toBe(false);
        expect(connectedTitleField.prop('pristine')).toBe(true);
        expect(nameField).toBeDefined();
        expect(nameField.text()).toBe('Username');
        expect(nameField.prop('error')).toBe(false);
        expect(nameField.prop('value')).toBe('');
        expect(nameInput).toBeDefined();
        expect(nameInput.prop('value')).toBe('');
      });
      it('updates redux form "authUser" on input change', async () => {
        fillFormInput(wrapper, 'name', 'Alexandra');
        wrapper.update();
        await asyncFlush();
        const actions = wrapper.instance().store.getActions();
        expect(actions).toEqual([{
          type: '@@redux-form/CHANGE',
          meta: { field: 'name', form: 'authUser', persistentSubmitErrors: false, touch: true },
          payload: 'Alexandra'
        }]);
      });
    });

    describe('password Field', () => {
      let connectedChoicesField, passwordField, passwordInput;
      beforeEach(async () => {
        connectedChoicesField = form.find('ConnectedField#password');
        passwordField = connectedChoicesField.find('TextField#password');
        passwordInput = passwordField.find('input#password');
        store.clearActions();
        await asyncFlush();
      });

      it('renders properly', () => {
        expect(connectedChoicesField).toBeDefined();
        expect(connectedChoicesField.prop('dirty')).toBe(false);
        expect(connectedChoicesField.prop('pristine')).toBe(true);
        expect(passwordField).toBeDefined();
        expect(passwordField.prop('error')).toBe(false);
        expect(passwordField.prop('value')).toBe('');
        expect(passwordField.prop('type')).toBe('password');
        expect(passwordInput).toBeDefined();
        expect(passwordInput.prop('value')).toBe('');
      });
      it('updates redux form "authUser" on input change', async () => {
        fillFormInput(wrapper, 'password', '12345');
        wrapper.update();
        await asyncFlush();
        const actions = wrapper.instance().store.getActions();
        expect(actions).toEqual([{
          type: '@@redux-form/CHANGE',
          meta: { field: 'password', form: 'authUser', persistentSubmitErrors: false, touch: true },
          payload: '12345'
        }]);
      });
    });
  });
});
