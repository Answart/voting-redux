import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
// Import material-ui
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import Tooltip from 'material-ui/Tooltip';

const Btn = (props) => {
  const {
    span,
    style,
    size,
    color,
    variant,
    form,
    type,
    className,
    disabled,
    to,
    onClick,
    text,
    title,
  } = props;
  const givenClass = !!className ? className : '';
  const givenVariant = !!variant ? variant : 'raised';
  const givenColor = !!color ? color : 'primary';
  const givenSize = !!size ? size : 'medium';
  const givenStyle = !!style ? style : {};
  const givenDisabled = disabled ? disabled : false;
  const defaultClass = !variant ? 'raised' : variant;
  const givenTitle = !!title ? title : '';
  return (
    <Tooltip id='tooltip-icon' title={givenTitle}>
      <Typography
        component={ !!span && span ? 'span' : 'div' }
        style={ !!span && span ? { display:'inline-block' } : {} }
      >
        {!!onClick && (
          <Button
            variant={givenVariant}
            color={givenColor}
            size={givenSize}
            className={givenClass}
            style={givenStyle}
            disabled={givenDisabled}
            onClick={onClick}
          >
            {text}
          </Button>
        )}
        {!!to && (
          <Button
            variant={givenVariant}
            color={givenColor}
            size={givenSize}
            className={`${givenClass} ${defaultClass}`}
            style={givenStyle}
            disabled={givenDisabled}
            component={Link}
            to={to}
          >
            {text}
          </Button>
        )}
        {!!form && (
          <Button
            variant={givenVariant}
            color={givenColor}
            size={givenSize}
            className={givenClass}
            style={givenStyle}
            disabled={givenDisabled}
            form={form}
            type={!!type ? type : ''}
          >
            {text}
          </Button>
        )}
      </Typography>
    </Tooltip>
  )
}

Btn.propTypes = {
  span: PropTypes.bool,
  style: PropTypes.object,
  size: PropTypes.string,
  color: PropTypes.string,
  variant: PropTypes.string,
  form: PropTypes.string,
  type: PropTypes.string,
  text: PropTypes.string.isRequired,
  className: PropTypes.string,
  to: PropTypes.string,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
  title: PropTypes.string,
};

export default Btn;
