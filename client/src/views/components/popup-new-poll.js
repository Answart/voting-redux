import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { reduxForm, Field, formValueSelector } from 'redux-form';
// Import material-ui
import Dialog, { DialogTitle, DialogContent, DialogActions } from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import Btn from './btn';

const selector = formValueSelector('newPoll');


class NewPollPopup extends React.Component {
  handleClosePopup = () => {
    const { reset, closeNewPollPopup } = this.props;
    reset();
    closeNewPollPopup();
  }
  renderTextField = ({ input, label, meta: { touched, error, warning }, ...choices }) => (
    <div className='form-input'>
      <TextField
        label={label}
        error={!!touched && !!error}
        fullWidth
        {...choices}
        {...input}
        helperText={(!!touched && !!error) ? error : (choices.helperText || '')}
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

  render() {
    const {
      newPollPopupOpen,
      invalid, pristine, submitting, handleSubmit
    } = this.props;
    return (
      <Dialog id='popup-new-poll' className='popup-wrapper'
        open={newPollPopupOpen}
        onClose={this.handleClosePopup}
      >
        <DialogTitle>
          Create a poll
        </DialogTitle>

        <DialogContent
          style={{ width:450, paddingBottom:10 }}
        >
          <form className='form'
            id='new-poll-form'
            onSubmit={handleSubmit}
            style={{ width:'100%' }}
          >
            <Field
              ref='title'
              id='title'
              type='text'
              name='title'
              label='Title'
              placeholder='Best game of 2017'
              component={this.renderTextField}
            />
            <Field
              ref='choices'
              id='choices'
              type='text'
              name='choices'
              label='Choices'
              placeholder='Subnautica, Monster Hunter World, PUBG'
              helperText='Separate choices by comma'
              component={this.renderTextField}
            />
          </form>
        </DialogContent>

        <DialogActions>
          <Btn
            id='cancel'
            size='small'
            variant='flat'
            text='Cancel'
            onClick={this.handleClosePopup}
          />
          blah
          <Btn
            id='submit'
            size='small'
            variant='flat'
            text='Create'
            type='submit'
            form='new-poll-form'
            disabled={(invalid || pristine || submitting)}
          />
        </DialogActions>
      </Dialog>
    );
  }
};

NewPollPopup.propTypes = {
  newPollPopupOpen: PropTypes.bool.isRequired,
  closeNewPollPopup: PropTypes.func.isRequired
}

NewPollPopup = reduxForm({
  form: 'newPoll',
  fields: ['title', 'choices'],
  destroyOnUnmount: true,
  persistentSubmitErrors: true,
  touchOnChange: true,
  validate: (values, props) => {
    const errors = {};
    const title = values.title;
    const choices = values.choices;
    if (!title || title.trim() === '') {
      errors.title = '* Required';
    }
    if (!choices || choices.trim() === '') {
      errors.choices = '* Required';
    } else {
      const formatedChoices = choices.split(',')
      .map(choice => choice.trim())
      .filter(e =>  e.replace(/(\r\n|\n|\r)/gm,''));
      if (formatedChoices.length <= 1) {
        errors.choices = '* At least 2 choices required';
      }
    }
    return errors;
  },
  onSubmit: (values, dispatch, props) => new Promise((resolve, reject) => {
    // dummy submit until poll reducer built
    return resolve();
  }),
  onSubmitSuccess: (result, dispatch, props) => props.closeNewPollPopup()
})(NewPollPopup);

export default connect(null, null)(NewPollPopup);
