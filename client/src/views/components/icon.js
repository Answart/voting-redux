import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
// Import material-ui
import Tooltip from 'material-ui/Tooltip';
import CircleCheckIcon from 'material-ui-icons/CheckCircle';
import CircleXIcon from 'material-ui-icons/HighlightOff';
import ClosePollIcon from 'material-ui-icons/LockOutline';
import OpenPollIcon from 'material-ui-icons/LockOpen';
import AccountCircleIcon from 'material-ui-icons/AccountCircle';
import TouchIcon from 'material-ui-icons/TouchApp';
import EqualizerIcon from 'material-ui-icons/Equalizer';
import AddIcon from 'material-ui-icons/AddCircle';
import AddOutlineIcon from 'material-ui-icons/AddCircleOutline';
import WrenchIcon from 'material-ui-icons/Build';
import ListIcon from 'material-ui-icons/List';
import TrashIcon from 'material-ui-icons/Delete';


const Icon = (props) => {
  const { type, color, action, to, label, disabled, style } = props;
  const title = `${disabled ? 'Must be logged in' : (!!label ? label : '')}`;
  const className = `account-icon ${disabled ? 'grey' : color}-color ${(!!action || !!to) ? 'pointer' : ''}`;
  const nodeProps = { className };
  if (!!action) {
    nodeProps.onClick = action;
  };
  if (!!style) {
    nodeProps.style = style;
  };
  if (!!to) {
    nodeProps.to = to;
    nodeProps.component = {Link};
  };
  if (disabled || disabled === false) {
    nodeProps.disabled = disabled;
  };
  return (
    <Tooltip id='tooltip-icon' title={title}>
      <div>
        {type === 'status' && color === 'green' && (
          <CircleCheckIcon {...nodeProps} />
        )}
        {type === 'status' && color === 'orange' && (
          <CircleXIcon {...nodeProps} />
        )}

        {type === 'close' && (
          <ClosePollIcon {...nodeProps} />
        )}
        {type === 'open' && (
          <OpenPollIcon {...nodeProps} />
        )}

        {type === 'user' && (
          <AccountCircleIcon {...nodeProps} />
        )}

        {type === 'voted' && (
          <TouchIcon {...nodeProps} />
        )}
        {type === 'vote' && (
          <EqualizerIcon {...nodeProps} className={`rotate-90 account-icon ${color}-color`} />
        )}

        {type === 'add' && color === 'green' && (
          <AddIcon {...nodeProps} />
        )}
        {type === 'added' && color === 'green' && (
          <AddOutlineIcon {...nodeProps} />
        )}

        {type === 'poll' && color === 'orange' && (
          <WrenchIcon {...nodeProps} />
        )}

        {type === 'list' && (
          <ListIcon {...nodeProps} />
        )}

        {type === 'trash' && color === 'red' && (
          <TrashIcon {...nodeProps} />
        )}
    </div>
    </Tooltip>
  )
}

Icon.propTypes = {
  type: PropTypes.string.isRequired,
  color: PropTypes.string,
  action: PropTypes.func,
  to: PropTypes.string,
  label: PropTypes.string,
  disabled: PropTypes.bool,
  style: PropTypes.object
};

export default Icon;
