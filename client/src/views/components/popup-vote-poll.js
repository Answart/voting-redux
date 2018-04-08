import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
// Import material-ui
import Dialog, {
  DialogActions, DialogContent, DialogContentText, DialogTitle
} from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import { MenuItem } from 'material-ui/Menu';
// Import components
import Btn from './btn';


class VotePollPopup extends React.Component {
  handleClosePopup = () => {
    const { reset, closeVotePollPopup } = this.props;
    reset();
    closeVotePollPopup();
  }
  renderTextField = ({ input, label, meta: { touched, error, warning }, ...choices }) => (
    <div className='form-input'>
      <TextField
        name='choice'
        label={label}
        error={!!touched && !!error}
        {...choices}
        {...input}
        helperText={(!!touched && !!error) ? error : choices.helperText}
        fullWidth
        select
        onBlur={e => e.preventDefault()}
      >
        {((!!this.props.activePollState && !!this.props.activePollState.poll) ? this.props.activePollState.poll.choices : []).map(choice => (
          <MenuItem key={choice.id} value={choice.label}>
            {choice.label}
          </MenuItem>
        ))}
      </TextField>
    </div>
  );

  render() {
    const {
      votePollPopupOpen,
      activePollState, authed,
      invalid, pristine, submitting, handleSubmit
    } = this.props;
    const poll = activePollState.poll;
    return (
      <Dialog id='popup-vote-poll' className='popup-wrapper'
        open={votePollPopupOpen}
        onClose={this.handleClosePopup}
      >
        {/* Poll title */}
        <DialogTitle>
          {!!poll ? poll.title : ''}
        </DialogTitle>

        {/* Poll Creator */}
        <DialogContentText>
          {`by ${!!poll ? poll.user_name : ''}`}
        </DialogContentText>

        {/* Poll Voting Area */}
        <DialogContent
          style={{ width:450 }}
        >
          <form className='form'
            id='vote-poll-form'
            onSubmit={handleSubmit}
            style={{ width:'100%' }}
          >
            <Field
              ref='choice'
              id='choice'
              type='text'
              name='choice'
              label='Select a choice'
              component={this.renderTextField}
            />
          </form>
        </DialogContent>

        {/* Buttons */}
        <DialogActions>
          <Btn
            id='cancel'
            size='small'
            variant='flat'
            text='Cancel'
            onClick={this.handleClosePopup}
          />
          <Btn
            id='submit'
            size='small'
            variant='flat'
            text='Vote'
            type='submit'
            form='vote-poll-form'
            disabled={(invalid || pristine || submitting || !authed)}
          />
        </DialogActions>
      </Dialog>
    );
  }
}

VotePollPopup.propTypes = {
  votePollPopupOpen: PropTypes.bool.isRequired,
  closeVotePollPopup: PropTypes.func.isRequired,
  activePollState: PropTypes.shape({
    poll: PropTypes.object
  }).isRequired
}

VotePollPopup = reduxForm({
  form: 'votePoll',
  fields: ['choice'],
  // destroyOnUnmount: true,
  persistentSubmitErrors: true,
  touchOnChange: true,
  validate: (values, props) => {
    const errors = {};
    const choice = values.choice;
    if (!choice || choice.trim() === '') errors.choice = '* Required';
    return errors;
  },
  onSubmit: (values, dispatch, props) => new Promise((resolve, reject) => {
    // dummy submit until poll reducer built
    console.log('submittttt');
    return resolve();
  }),
  onSubmitSuccess: (result, dispatch, props) => {
    console.log('success', props.closeVotePollPopup);
    props.closeVotePollPopup();
  }
})(VotePollPopup);

export default connect(null, null)(VotePollPopup);
