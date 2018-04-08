import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { reduxForm, Field, change, blur, untouch } from 'redux-form';
import { Link } from 'react-router-dom';
// Import material-ui
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText
} from 'material-ui/Dialog';
import Tabs, { Tab } from 'material-ui/Tabs';
import AppBar from 'material-ui/AppBar';
import TextField from 'material-ui/TextField';
import IconButton from 'material-ui/IconButton';
// Import components
import Btn from './btn';


class AuthUserPopup extends React.Component {
  constructor(props) {
    super(props);
    this.state = { tabValue: 0 }
  }
  handleChangeTabValue = () => this.setState({ tabValue: this.state.tabValue === 1 ? 0 : 1 });
  handleClosePopup = () => {
    const { reset, closeAuthUserPopup } = this.props;
    reset();
    closeAuthUserPopup();
  }
  handleProviderAuth = provider => event => {
    if (!!event && !!event.preventDefault) event.preventDefault();
    this.props.authProvidedUser(provider);
    this.handleClosePopup();
  };

  render() {
    const {
      authUserPopupOpen,
      tabValue,
      // changeAuthPopupTabValue,
      authedUserState,
      logoutUser,
      invalid, pristine, submitting, handleSubmit, dispatch
    } = this.props;
    let tabLabel = this.state.tabValue === 0 ? 'Log in' : 'Sign up';
    return (
      <Dialog id='popup-auth-user' className='popup-wrapper'
        open={authUserPopupOpen}
        onClose={this.handleClosePopup}
      >
        <DialogContent>
          {/* Social Media Auth Area */}
          <DialogContentText>Sign in with your social network account</DialogContentText>
          <div className='popup-icons'>
            <IconButton className='fa fa-facebook-square icon'
              // href="https://localhost:3000/api/auth/provider/facebook/"
              onClick={this.handleClosePopup}
            />
            <IconButton className='fa fa-google-plus-square icon'
              onClick={this.handleProviderAuth('google')}
            />
            <IconButton className='fa fa-twitter-square icon'
              onClick={this.handleProviderAuth('twitter')}
            />
            <IconButton className='fa fa-github-square icon'
              onClick={this.handleProviderAuth('github')}
            />
          </div>
          <DialogContentText>Or use your email</DialogContentText>
          {/* Tabs Area */}
          <SigninTab
            tabValue={this.state.tabValue}
            handleChangeTabValue={this.handleChangeTabValue}
            authedUser={authedUserState.user}
            handleClosePopup={this.handleClosePopup}
            logoutUser={logoutUser}
            handleSubmit={handleSubmit}
            dispatch={dispatch}
          />
        </DialogContent>
        <DialogActions>
          <Btn id='cancel'
            variant='flat'
            size='small'
            text='Cancel'
            onClick={this.handleClosePopup}
          />
          <Btn id='submit'
            variant='flat'
            size='small'
            text={tabLabel}
            type='submit'
            form='auth-user-form'
            disabled={(invalid || pristine || submitting)}
          />
        </DialogActions>
      </Dialog>
    );
  }
}

class SigninTab extends React.Component {
  renderTextField = ({ input, label, meta: { touched, error, warning }, ...choices }) => (
    <div className='form-input'>
      <TextField
        label={label}
        error={!!touched && !!error}
        fullWidth
        {...choices}
        {...input}
        helperText={(!!touched && !!error) ? error : choices.helperText}
        InputProps={{ classes: {
          input: 'form-input-dense'
        } }}
        InputLabelProps={{ shrink: true }}
        FormHelperTextProps={{ classes: {
          root: 'form-helper-text-dense'
        } }}
      />
    </div>
  );

  handleTabChange = () => {
    const { handleChangeTabValue, logoutUser, dispatch } = this.props
    handleChangeTabValue();
    logoutUser();
    dispatch(change('authUser', 'email', ''));
    dispatch(blur('authUser', 'validate', Math.random()));
    dispatch(untouch('authUser', 'email'));
  }

  render() {
    const { tabValue, handleSubmit } = this.props;
    return (
      <div>
        <AppBar className='auth-tab-bar' position='static'>
          <Tabs
            value={tabValue}
            onChange={this.handleTabChange}
            indicatorColor='primary'
            textColor='primary'
            centered
          >
            <Tab className='auth-tab' label='Log In' />
            <Tab className='auth-tab' label='Sign Up' />
          </Tabs>
        </AppBar>
        <form id='auth-user-form' className='form'
          onSubmit={handleSubmit}
          style={{ width:'100%' }}
        >
          <Field id='email'
            type='text'
            name='email'
            label='Email'
            autoComplete='email'
            component={this.renderTextField}
            disabled={tabValue === 1 ? false : true}
          />
          <Field id='name'
            type='text'
            name='name'
            label='Username'
            autoComplete='username'
            component={this.renderTextField}
            autoFocus={true}
          />
          <Field id='password'
            type='password'
            name='password'
            label='Password'
            autoComplete='current-password'
            component={this.renderTextField}
          />
        </form>
      </div>
    )
  }
}

AuthUserPopup.propTypes = {
  authUserPopupOpen: PropTypes.bool.isRequired,
  // authPopupTabValue: PropTypes.number.isRequired,
  // changeAuthPopupTabValue: PropTypes.func.isRequired,
  closeAuthUserPopup: PropTypes.func.isRequired,
  authUser: PropTypes.func.isRequired,
  logoutUser: PropTypes.func.isRequired,
  authProvidedUser: PropTypes.func.isRequired,
  authedUserState: PropTypes.shape({
    user: PropTypes.object
  }).isRequired
}

AuthUserPopup = reduxForm({
  form: 'authUser',
  fields: ['email', 'name', 'password'],
  destroyOnUnmount: true,
  persistentSubmitErrors: true,
  touchOnChange: true,
  validate: (values, props) => {
    const errors = {};
    const name = values.name;
    const password = values.password;
    const email = values.email;
    if (!name || name.trim() === '') errors.name = '* Required';

    if (!password || password.trim() === '') errors.password = '* Required';

    if (props.authPopupTabValue === 1) {
      if (!email || email.trim() === '') {
        errors.email = '* Required';
      } else if (!(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email))) {
        errors.email = 'Invalid email address';
      }
      if (!name || name.trim() === '') {
        errors.name = '* Required';
      } else if (!(/^\S{6,20}$/.test(name.trim()))) {
        errors.name = '* Must be between 6 to 20 characters';
      }
      if (!password || password.trim() === '') {
        errors.password = '* Required';
      } else {
        if (!(/^\S{6,20}$/i.test(password.trim()))) {
          errors.password = '* Must be between 6 to 20 characters';
        } else if (!(/(?=.[a-z])(?=.*[A-Z])/i.test(password))) {
          errors.password = '* Must contain at least one lowercase and uppercase letter.';
        } else if (!(/^((?=.*\d)(?=.*[a-zA-Z])[a-zA-Z0-9!@#$%&*]{6,20})$/i.test(password))) {
          errors.password = '* Must contain at least one numeric digit and a special character.';
        };
      }
    }
    return errors;
  },
  onSubmit: (values, dispatch, props) => new Promise((resolve, reject) => {
    const authType = props.authPopupTabValue === 0 ? 'login' : 'register';
    console.log('this', this);
    // dummy submit until poll reducer built
    return resolve();
  }),
  onSubmitSuccess: (result, dispatch, props) => props.closeAuthUserPopup()
})(AuthUserPopup);

export default connect(null, null)(AuthUserPopup);
