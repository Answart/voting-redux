import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
// Import material-ui
import Paper from 'material-ui/Paper';
import Table, {
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
} from 'material-ui/Table';
import Tooltip from 'material-ui/Tooltip';
import Icon from './icon';
import Btn from './btn';


class PollsList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      order: 'asc',
      orderBy: 'date',
      data: [],
      page: 0,
      rowsPerPage: 8
    }
  };
  componentWillMount = () => this.handleSetData(this.props.polls);
  componentWillReceiveProps = (nextProps) => this.handleSetData(nextProps.polls);

  handleChangePage = (event, page) => {
    if (!!event && !!event.preventDefault) event.preventDefault();
    if (Number(page) || page === 0) this.setState({ page });
  };
  handleChangeRowsPerPage = event => this.setState({ rowsPerPage: event.target.value });
  handleSetData = (polls, givenOrder = null, givenOrderBy = null) => {
    const order = !!givenOrder ? givenOrder : this.state.order;
    const orderBy = !!givenOrderBy ? givenOrderBy : this.state.orderBy;
    if (!!polls) {
      const data =
        order === 'desc'
          ? polls.sort((a, b) => (b[orderBy] < a[orderBy] ? -1 : 1))
          : polls.sort((a, b) => (a[orderBy] < b[orderBy] ? -1 : 1));
      this.setState({ data, order, orderBy });
    }
  };
  handleRequestSort = (event, property) => {
    const orderBy = property;
    let order = 'desc';
    if (this.state.orderBy === property && this.state.order === 'desc') {
      order = 'asc';
    }
    this.handleSetData(this.state.data, order, orderBy);
  };

  parseTime = (timeStr) => {
    let timeObj = new Date(timeStr);
    return `${timeObj.getMonth() + 1}/${timeObj.getDate()}/${timeObj.getUTCFullYear()}`;
  };

  render() {
    const { polls, openVotePollPopup, pollColumnData } = this.props;
    const { data, order, orderBy, rowsPerPage, page } = this.state;
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);
    return (
      <Paper>
        <Table>
          <EnhancedTableHead
            polls={polls}
            order={order}
            orderBy={orderBy}
            onRequestSort={this.handleRequestSort}
            pollColumnData={pollColumnData}
          />
          <TableBody>
            {data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(n => {
              return (
                <TableRow id={`pl-body-${n.cuid}`} key={n.cuid} tabIndex={-1} hover>
                  <TableCell id='status' className='table-cell'>
                    <Icon
                      type={n.open ? 'open' : 'close'}
                      color={n.open ? 'green' : 'red'}
                      style={{ marginLeft:15 }}
                      label={n.open ? 'Open' : 'Closed'}
                    />
                  </TableCell>
                  <TableCell id='votes' className='table-cell'>
                    <Btn
                      variant='fab'
                      text={`${n.votes}`}
                      style={{ width:'80%', height:'100%' }}
                      onClick={openVotePollPopup.bind(null, n.cuid)}
                      disabled={!n.open || !this.props.authed}
                      title={(!this.props.authed ? 'Must be logged in' : (!n.open ? 'Poll closed' : 'Click to vote'))}
                    />
                  </TableCell>
                  <TableCell id='title' className='table-cell'>
                    <Link to={`/poll/${n.cuid}`} style={{ color:'#5d5d5d' }}>{n.title}</Link>
                  </TableCell>
                  <TableCell id='user' className='table-cell'>
                    <Link to={`/poll/${n.cuid}`} style={{ color:'#5d5d5d' }}>{n.user_name}</Link>
                  </TableCell>
                  <TableCell id='date' className='table-cell'>
                    <Link to={`/poll/${n.cuid}`} style={{ color:'#5d5d5d' }}>{this.parseTime(n.date_created)}</Link>
                  </TableCell>
                </TableRow>
              );
            })}
            {emptyRows > 0 && (
              <TableRow style={{ height: 40 * emptyRows }}>
                <TableCell colSpan={6} />
              </TableRow>
            )}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                colSpan={6}
                count={data.length}
                rowsPerPage={rowsPerPage}
                page={page}
                backIconButtonProps={{ 'aria-label':'Previous Page' }}
                nextIconButtonProps={{ 'aria-label':'Next Page' }}
                onChangePage={this.handleChangePage}
                onChangeRowsPerPage={this.handleChangeRowsPerPage}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </Paper>
    )
  }
};


class EnhancedTableHead extends React.Component {
  createSortHandler = property => event => {
    this.props.onRequestSort(event, property);
  };

  render() {
    const { order, orderBy, pollColumnData } = this.props;
    return (
      <TableHead>
        <TableRow>
          {pollColumnData.map(column => {
            return (
              <TableCell className='table-header'
                id={`header-${column.id}`}
                key={column.id}
                sortDirection={orderBy === column.key ? order : false}
                style={{ width:`${column.colSpan}%`}}
              >
                <Tooltip
                  title='Sort'
                  placement={column.numeric ? 'bottom-end' : 'bottom-start'}
                  enterDelay={300}
                >
                  <TableSortLabel className='section-header'
                    active={orderBy === column.key}
                    direction={order}
                    onClick={this.createSortHandler(column.key)}
                  >
                    {column.label}
                  </TableSortLabel>
                </Tooltip>
              </TableCell>
            );
          }, this)}
        </TableRow>
      </TableHead>
    );
  }
}

PollsList.propTypes = {
  pollColumnData: PropTypes.array.isRequired,
  polls: PropTypes.array.isRequired,
  loadActivePoll: PropTypes.func.isRequired,
  openVotePollPopup: PropTypes.func.isRequired,
  authed: PropTypes.bool.isRequired
}

export default connect(null, null)(PollsList);
