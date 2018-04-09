import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
// Import material-ui
import Typography from 'material-ui/Typography';
import Avatar from 'material-ui/Avatar';
import Paper from 'material-ui/Paper';
import IconButton from 'material-ui/IconButton';
import KeyboardArrowRightIcon from 'material-ui-icons/KeyboardArrowRight';
import List, { ListItem, ListItemAvatar, ListItemText } from 'material-ui/List';
// Import components
import Icon from './icon';


class ActivityList extends Component {
  parseTime = (timeStr) => {
    let timeObj = new Date(timeStr);
		return `${timeObj.getMonth() + 1}/${timeObj.getDate()}/${timeObj.getUTCFullYear()}`;
  };

  render() {
    const { title, list } = this.props;
    return (
      <div>
        <Typography className='section-header underline'
          variant='title'
          color='inherit'
        >{title}</Typography>

        {/* Activity List */}
        {!!list && list.length > 0 ? (
          <List className='scrollable-list'
            dense={true}
          >
            {list.map(activity => (
              <Paper className='paper'
                key={`paper-${activity.cuid}`}
              >
                <ListItem id={`activity-${list.indexOf(activity)}`}
                  key={`listitem-${activity.cuid}`}
                  style={{ padding:5 }}
                >
                  <ListItemAvatar>
                    <Avatar style={{ backgroundColor:'white' }}>
                      <Icon
                        type={activity.type}
                        color={activity.actionColor}
                      />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={activity.message}
                    secondary={this.parseTime(activity.date_created)}
                    // textDense
                    style={{ padding:0 }}
                  />
                  {!!activity.poll_id && (
                    <IconButton
                      aria-label='Go to poll'
                      component={Link}
                      to={`/poll/${activity.poll_id}`}
                    >
                      <KeyboardArrowRightIcon className='arrow-link'
                        color='primary'
                      />
                    </IconButton>
                  )}
                </ListItem>
              </Paper>
            ))}
          </List>
        ) : (
          <div>
            No Activity
          </div>
        )}
      </div>
    )
  }
}

ActivityList.propTypes = {
  title: PropTypes.string.isRequired,
  list: PropTypes.array.isRequired
}

export default connect(null, null)(ActivityList);
