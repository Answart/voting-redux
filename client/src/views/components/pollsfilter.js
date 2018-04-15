import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// Import material-ui
import Grid from 'material-ui/Grid';
import Chip from 'material-ui/Chip';
import TextField from 'material-ui/TextField';
import { MenuItem } from 'material-ui/Menu';
// Import components
import Btn from './btn';


class PollsFilter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filterDropDownList: null,
      filters: null,
      label: '',
      key: '',
      value: '',
      keyInvalid: false,
      valueInvalid: false,
    }
    this.handleFilterPolls = this.handleFilterPolls.bind(this);
    this.handleSetState = this.handleSetState.bind(this);
    this.handleAddFilter = this.handleAddFilter.bind(this);
    this.handleRemoveFilter = this.handleRemoveFilter.bind(this);
    this.handleFilterChange = this.handleFilterChange.bind(this);
  }
  componentWillMount = () => {
    const { filters, pollColumnData } = this.props;
    const filterDropDownList = pollColumnData.filter(item => item.key !== 'date_created');
    this.setState({ filters, filterDropDownList });
    // this.handleSetState(filters);
    // this.handleFilterPolls();
  }

  handleFilterPolls = () => {
    const { loadFilteredPolls } = this.props;
    const { filters } = this.state;
    loadFilteredPolls(filters);
  };

  handleSetState = (filters = null, newFilter = null) => {
    if (!!newFilter) {
      (!!filters && filters.length > 0) ? filters.push(newFilter) : (filters = [newFilter]);
    }
    this.setState({
      filters,
      label: '',
      key: '',
      value: '',
      keyInvalid: false,
      valueInvalid: false
    }, () => this.handleFilterPolls());
  }

  handleFilterChange = name => event => {
    if (name === 'key') {
      const key = event.target.value;
      const label = event.nativeEvent.target.innerText;
      this.setState({ key, label });
    } else {
      this.setState({ [name]: event.target.value });
    }
  };
  handleAddFilter = () => {
    const { label, key, value, filters } = this.state;
    if (!!filters && filters.find(filter => filter.key === key)) {
      this.setState({ keyInvalid: true })
    } else if (!value.length) {
      this.setState({ valueInvalid: true })
    } else {
      let newVal = value.trim();
      if (key === 'votes') {
        newVal = Number(newVal);
      } else if (key === 'open') {
        newVal = Boolean(newVal.toLowerCase() === 'open');
      }
      this.handleSetState(filters, { label, key, value: newVal });
    }
  };
  handleRemoveFilter = filter => event => {
    const { filters } = this.state;
    const updatedFilters = [...filters];
    const toDelete = updatedFilters.indexOf(filter);
    updatedFilters.splice(toDelete, 1);
    this.handleSetState(updatedFilters);
  };

  render() {
    const {
      key, value,
      keyInvalid, valueInvalid,
      filters,
      filterDropDownList
    } = this.state;
    return (
      <Grid container
        direction='row'
        justify='center'
        alignItems='flex-start'
      >
        {/* Filter Form Area */}
        <Grid item xs={12} sm={3}>
          <TextField
            id='filter-key'
            label='Filter by:'
            value={key}
            error={keyInvalid}
            disabled={!!value && value.length > 0}
            onChange={this.handleFilterChange('key')}
            helperText={keyInvalid ? '* Filter already made' : ''}
            InputLabelProps={{ shrink: true }}
            style={{ display:'flex', margin:5, paddingTop:3 }}
            margin='normal'
            select
          >
            <MenuItem value=''> -- </MenuItem>
            {filterDropDownList.map(item => {
              return (
                <MenuItem key={item.id} value={item.key}>
                  {item.label}
                </MenuItem>
              )
            })}
          </TextField>
        </Grid>
        <Grid item xs={12} sm={7}>
          <TextField
            id='filter-value'
            label='Value:'
            type={(!!key && key === 'votes') ? 'number' : 'text'}
            value={value}
            error={valueInvalid}
            disabled={!key}
            helperText={(!!key && key === 'open') ? `Filter for 'open' or 'closed' polls` : ''}
            onChange={this.handleFilterChange('value')}
            InputLabelProps={{ shrink: true }}
            style={{ display:'flex', margin:5 }}
          />
        </Grid>
        <Grid item xs={12} sm={2}
          style={{ textAlign:'center' }}
        >
          <Btn
            size='small'
            text='Add Filter'
            disabled={this.props.pollsLoading || !key || !value}
            onClick={this.handleAddFilter.bind()}
            style={{ marginBottom:10 }}
          />
        </Grid>
        {/* Filter Chips Area */}
        {!!filters && filters.length > 0 && (
          <Grid item xs={12} sm={10}
            style={{ display:'flex', justifyContent:'center', flexWrap:'wrap', padding:5 }}
          >
            {filters.map(filter => {
              return (
                <Chip
                  id={`chip-${filter.key}`}
                  key={filter.key}
                  avatar={null}
                  label={`${filter.label}: ${filter.value}`}
                  onDelete={this.handleRemoveFilter(filter)}
                  style={{ margin:'1px 6px 6px 6px' }}
                />
              )
            })}
          </Grid>
        )}
      </Grid>
    )
  }
};

PollsFilter.propTypes = {
  pollColumnData: PropTypes.array.isRequired,
  filters: PropTypes.array,
  pollsLoading: PropTypes.bool,
  loadFilteredPolls: PropTypes.func.isRequired
}

export default connect(null, null)(PollsFilter);
