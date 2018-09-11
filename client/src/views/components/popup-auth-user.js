import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { reduxForm, Field, change, blur, untouch } from 'redux-form';
// Import material-ui
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import AppBar from '@material-ui/core/AppBar';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
// Import components
import Btn from './btn';


class AuthUserPopup extends React.Component {
  constructor(props) {
    super(props);
    this.state = { tabValue: 0 }
  }
  componentDidMount = () => this.handleAuthTypeChange(0);
  handleChangeTabValue = () => {
    const tabValue = this.state.tabValue === 1 ? 0 : 1;
    this.setState({ tabValue });
    this.handleAuthTypeChange(tabValue)
  };
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
  handleAuthTypeChange(tab) {
    const authType = tab === 1 ? 'register' : 'login';
    this.props.dispatch(change('authUser', 'authType', authType));
  }

  render() {
    const {
      authUserPopupOpen,
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
        value={(typeof input.value === 'string') ? input.value : ''}
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
  closeAuthUserPopup: PropTypes.func.isRequired,
  authUser: PropTypes.func.isRequired,
  logoutUser: PropTypes.func.isRequired,
  authProvidedUser: PropTypes.func.isRequired,
  authedUserState: PropTypes.shape({
    loading: PropTypes.bool.isRequired,
    message: PropTypes.string,
    error: PropTypes.string,
    user: PropTypes.object
  }).isRequired,
}

AuthUserPopup = reduxForm({
  form: 'authUser',
  fields: ['authType', 'email', 'name', 'password'],
  touchOnChange: true,
  validate: (values, props) => {
    const errors = {};
    const authType = values.authType;
    const name = values.name;
    const password = values.password;
    const email = values.email;

    if (authType === 'register') {
      if (!email || (!!email && (typeof email !== 'string' || email.trim() === ''))) {
        errors.email = '* Required';
      } else if (!(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email))) {
        errors.email = 'Invalid email address';
      }
    }
    if (!name || (!!name && (typeof name !== 'string' || name.trim() === ''))) {
      errors.name = '* Required';
    } else if ((authType === 'register') && !(/^\S{6,20}$/.test(name.trim()))) {
      errors.name = '* Must be between 6 to 20 characters';
    }
    if (!password || (!!password && (typeof password !== 'string' || password.trim() === ''))) {
      errors.password = '* Required';
    } else if (authType === 'register') {
      if (!(/^\S{6,20}$/i.test(password.trim()))) {
        errors.password = '* Must be between 6 to 20 characters';
      } else if (!(/(?=.[a-z])(?=.*[A-Z])/i.test(password))) {
        errors.password = '* Must contain at least one lowercase and uppercase letter.';
      } else if (!(/^((?=.*\d)(?=.*[a-zA-Z])[a-zA-Z0-9!@#$%&*]{6,20})$/i.test(password))) {
        errors.password = '* Must contain at least one numeric digit and a special character.';
      };
    }

    return errors;
  },
  onSubmit: (values, dispatch, props) => new Promise((resolve, reject) => props.authUser({ ...values }, { resolve, reject })),
  onSubmitSuccess: (result, dispatch, props) => props.closeAuthUserPopup()
})(AuthUserPopup);

export default connect(
  state => ({
    authedUserState: state.users.authedUser
  }), null)(AuthUserPopup);
