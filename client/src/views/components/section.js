import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
// Import material-ui
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
// Import components
import Icon from './icon';


class Section extends Component {
  render() {
    const { title, list, className } = this.props;
    return (
      <div className={!!className ? `${className} section` : 'section'}
      >
        {/* Header */}
        <Typography className='section-header underline'
          variant='subheading'
          color='inherit'
        >{title}</Typography>

        {/* List */}
        <List className='scrollable-list'
          dense={true}
        >
          {list.map(item => (
            <ListItem id={`list-${list.indexOf(item)}`} key={`list-${list.indexOf(item)}`} className={`li-styling ${item.invisible ? 'invisible' : ''}`}>

              {!!item.iconType && !item.invisible && (
                <ListItemIcon>
                  <Icon
                    label={!!item.iconAction ? item.primary : ''}
                    type={item.iconType}
                    color={item.iconColor}
                    action={item.iconAction}
                    disabled={item.iconDisabled}
                    disabledLabel={item.iconDisabledLabel || ''}
                  />
                </ListItemIcon>
              )}

              {!!item.primary && !item.invisible && (
                <ListItemText
                  primary={item.primary}
                  secondary={item.secondary}
                />
              )}

              {(!!item.secondaryAction || !!item.secondaryActionLink) && !item.invisible && (
                <IconButton
                  component={!!item.secondaryActionLink ? Link : null}
                  to={item.secondaryActionLink}
                  onClick={item.secondaryAction}
                >
                  <KeyboardArrowRightIcon className='arrow-link'
                    color='primary'
                  />
                </IconButton>
              )}
            </ListItem>
          ))}
        </List>
      </div>
    )
  }
}

Section.propTypes = {
  title: PropTypes.string.isRequired,
  list: PropTypes.array.isRequired,
  className: PropTypes.string
}

export default connect(null, null)(Section);
