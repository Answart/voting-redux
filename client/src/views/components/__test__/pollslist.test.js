import React from 'react';
import { Link } from 'react-router-dom';
// Import components
import PollsList from '../pollslist';

const mockFn = jest.fn();
const polls = [{
    cuid: 1,
    title: 'random title',
    user_name: 'name1',
    votes: 10,
    open: true,
    date_created: '2018-04-06T04:34:25.183Z',
    choices: [
      { id: 0, label: 'red', vote: 4 },
      { id: 1, label: 'blue', vote: 6 }
    ]
  }, {
    cuid: 2,
    title: 'random title2',
    user_name: 'name2',
    votes: 30,
    open: false,
    date_created: '2018-04-06T04:34:01.247Z',
    choices: [
      { id: 0, label: 'red2', vote: 14 },
      { id: 1, label: 'blue2', vote: 16 }
    ]
}];
const pollColumnData = [
  {id:0, key:'open', label:'Status', numeric:false, colSpan:10 },
  {id:1, key:'votes', label:'Votes', numeric:false, colSpan:10 },
  {id:2, key:'title', label:'Title', numeric:false, colSpan:40 },
  {id:3, key:'user_name', label:'User', numeric:false, colSpan:20 },
  {id:4, key:'date_created', label:'Date', numeric:false, colSpan:20 }
]
const props = {
  pollColumnData,
  polls,
  loadActivePoll: mockFn,
  openVotePollPopup: mockFn,
  authed: true
};


describe('<PollsList />', () => {
  let wrapper, cmpnt, state,
    historyPushSpy, loadActivePollSpy, openVotePollPopupSpy;

  beforeAll(async () => {
    loadActivePollSpy = jest.spyOn(props, 'loadActivePoll');
    openVotePollPopupSpy = jest.spyOn(props, 'openVotePollPopup');
    wrapper = mountWithRouterConnected(<PollsList {...props} />);
    wrapper.find('MemoryRouter').instance().history.push = mockFn;
    historyPushSpy = jest.spyOn(wrapper.find('MemoryRouter').instance().history, 'push');
    wrapper.update();
    await wrapper.find(PollsList).instance().componentDidMount();
    cmpnt = wrapper.find('PollsList');
    await asyncFlush();
  });
  beforeEach(() => state = wrapper.find('PollsList').instance().state);
  afterEach(() => jest.clearAllMocks());

  it('renders properly', () => {
    expect(cmpnt).toHaveLength(1);
    expect(cmpnt.prop('pollColumnData')).toEqual(pollColumnData);
    expect(cmpnt.prop('polls')).toEqual(polls);
    expect(typeof cmpnt.prop('loadActivePoll')).toBe('function');
    expect(typeof cmpnt.prop('openVotePollPopup')).toBe('function');
    expect(cmpnt.prop('authed')).toBe(true);
    expect(typeof cmpnt.instance().handleChangePage).toBe('function');
    expect(typeof cmpnt.instance().handleChangeRowsPerPage).toBe('function');
    expect(typeof cmpnt.instance().handleSetData).toBe('function');
    expect(typeof cmpnt.instance().handleRequestSort).toBe('function');
    expect(typeof cmpnt.instance().parseTime).toBe('function');
    expect(cmpnt.instance().state).toEqual({
      order: 'asc',
      orderBy: 'date',
      data: polls,
      page: 0,
      rowsPerPage: 8
    });
    // expect(mountToJson(cmpnt)).toMatchSnapshot();
  });

  describe('EnhancedTableHead', () => {
    let tableHeader, headerCols, firstCol;
    beforeEach(() => {
      tableHeader = cmpnt.find('EnhancedTableHead');
      headerCols = tableHeader.find('TableCell');
      firstCol = headerCols.find('TableCell#header-0');
    });

    it('renders properly', () => {
      expect(tableHeader).toHaveLength(1);
      expect(typeof tableHeader.prop('polls')).toBe('object');
      expect(tableHeader.prop('order')).toBe('asc');
      expect(tableHeader.prop('orderBy')).toBe('date');
      expect(tableHeader.prop('pollColumnData')).toHaveLength(5);
      expect(typeof tableHeader.prop('onRequestSort')).toBe('function');
      expect(typeof tableHeader.instance().createSortHandler).toBe('function');
      expect(headerCols).toHaveLength(5);
    });

    it('contains Tooltip', () => {
      const tooltip = firstCol.find('Popper');
      expect(tooltip.prop('placement')).toBe('bottom-start');
      expect(tooltip.text()).toBe('Sort');
    });
    it('changes state "orderBy" and "order" on click', () => {
      expect(state.order).toBe('asc');
      const column = firstCol.find('TableSortLabel');
      click(column);
      const state2 = wrapper.find('PollsList').instance().state;
      expect(state2.orderBy).toBe('open');
      expect(state2.order).toBe('desc');
    });
  });

  describe('TableBody', () => {
    let exampleRow;
    beforeEach(() => exampleRow = cmpnt.find('TableBody').find('TableRow#pl-body-1'));

    it('renders properly', () => {
      expect(exampleRow).toBeDefined();
      expect(exampleRow.find('TableCell')).toHaveLength(5);
    });

    describe('status column', () => {
      let statusCol;
      beforeEach(() => statusCol = exampleRow.find('TableCell#status').find('Icon'));

      it('renders properly', () => {
        expect(statusCol).toHaveLength(1);
        expect(statusCol.prop('type')).toBe('open');
        expect(statusCol.prop('color')).toBe('green');
        expect(statusCol.prop('label')).toBe('Open');
      });
    });

    describe('votes column', () => {
      let votesCol;
      beforeEach(() => votesCol = exampleRow.find('TableCell#votes').find('Btn'));

      it('renders properly', () => {
        expect(votesCol.prop('variant')).toBe('fab');
        expect(votesCol.prop('text')).toBe('10');
        expect(typeof votesCol.prop('onClick')).toBe('function');
        expect(votesCol.prop('disabled')).toBe(false);
        expect(votesCol.prop('title')).toBe('Click to vote');
      });
      it('calls openVotePollPopup() on click', () => {
        expect(openVotePollPopupSpy).not.toHaveBeenCalled();
        votesCol.prop('onClick')()
        expect(openVotePollPopupSpy).toHaveBeenCalled();
        expect(openVotePollPopupSpy).toHaveBeenCalledTimes(1);
        expect(openVotePollPopupSpy).toHaveBeenCalledWith(undefined, 1);
      });
    });

    describe('title column', () => {
      let titleCol;
      beforeEach(() => titleCol = exampleRow.find('TableCell#title').find('Link'));

      it('renders properly', () => {
        expect(titleCol.prop('to')).toBe('/poll/1');
        expect(titleCol.text()).toBe('random title');
      });
      it('routes to specified poll on click', () => {
        expect(historyPushSpy).not.toHaveBeenCalled();
        clickLink(titleCol);
        expect(historyPushSpy).toHaveBeenCalled();
        expect(historyPushSpy).toHaveBeenCalledTimes(1);
        expect(historyPushSpy).toHaveBeenCalledWith('/poll/1');
      });
    });

    describe('user column', () => {
      let userCol;
      beforeEach(() => userCol = exampleRow.find('TableCell#user').find('Link'));

      it('renders properly', () => {
        expect(userCol.prop('to')).toBe('/poll/1');
        expect(userCol.text()).toBe('name1');
      });
      it('routes to specified poll on click', () => {
        expect(historyPushSpy).not.toHaveBeenCalled();
        clickLink(userCol);
        expect(historyPushSpy).toHaveBeenCalled();
        expect(historyPushSpy).toHaveBeenCalledTimes(1);
        expect(historyPushSpy).toHaveBeenCalledWith('/poll/1');
      });
    });

    describe('date column', () => {
      let dateCol;
      beforeEach(() => dateCol = exampleRow.find('TableCell#date').find('Link'));

      it('renders properly', () => {
        expect(dateCol.prop('to')).toBe('/poll/1');
        expect(dateCol.text()).toBe('4/5/2018');
      });
      it('routes to specified poll on click', () => {
        expect(historyPushSpy).not.toHaveBeenCalled();
        clickLink(dateCol);
        expect(historyPushSpy).toHaveBeenCalled();
        expect(historyPushSpy).toHaveBeenCalledTimes(1);
        expect(historyPushSpy).toHaveBeenCalledWith('/poll/1');
      });
    });
  });

  describe('TableFooter', () => {
    let tableFooter, tablePagination;
    beforeEach(() => {
      tableFooter = cmpnt.find('TableFooter');
      tablePagination = tableFooter.find('TablePagination');
    });
    it('renders properly', () => {
      expect(tableFooter).toHaveLength(1);
      expect(tablePagination).toHaveLength(1);
      expect(tablePagination.prop('colSpan')).toBe(6);
      expect(tablePagination.prop('count')).toBe(polls.length);
      expect(tablePagination.prop('rowsPerPage')).toBe(8);
      expect(tablePagination.prop('page')).toBe(0);
      expect(typeof tablePagination.prop('onChangePage')).toBe('function');
      expect(typeof tablePagination.prop('onChangeRowsPerPage')).toBe('function');
    });

    it('changes state "page" on onChangePage() call', () => {
      expect(state.page).toBe(0);
      tablePagination.prop('onChangePage')(null, 2);
      expect(wrapper.find('PollsList').instance().state.page).toBe(2);
    });
    it('changes state "rowsPerPage" on onChangeRowsPerPage() call', () => {
      expect(state.rowsPerPage).toBe(8);
      const event = { target: { value: 12 }};
      tablePagination.prop('onChangeRowsPerPage')(event);
      expect(wrapper.find('PollsList').instance().state.rowsPerPage).toBe(12);
    });
  });
});
