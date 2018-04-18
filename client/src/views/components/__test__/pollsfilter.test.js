import React from 'react';
import { Link } from 'react-router-dom';
import {
  mountWithRouterConnected, asyncFlush,
  fillInput, clickButton
} from '../../../utils/__test__';
import PollsFilter from '../pollsfilter';

const mockFn = jest.fn();
const filters = [{
  label: 'User',
  key: 'user_name',
  value: 'Alexandra'
}];
const pollColumnData = [
  {id:0, key:'open', label:'Status', numeric:false, colSpan:10 },
  {id:1, key:'votes', label:'Votes', numeric:false, colSpan:10 },
  {id:2, key:'title', label:'Title', numeric:false, colSpan:40 },
  {id:3, key:'user_name', label:'User', numeric:false, colSpan:20 },
  {id:4, key:'date_created', label:'Date', numeric:false, colSpan:20 }
];
const props = {
  pollColumnData,
  filters,
  loadFilteredPolls: mockFn,
};
pollColumnData.pop();
const filterDropDownList = [ ...pollColumnData ];


describe('<PollsFilter />', () => {
  let wrapper, cmpnt, state,
    keyField, valueField,
    historyPushSpy, loadFilteredPollsSpy;

  beforeAll(async () => {
    loadFilteredPollsSpy = jest.spyOn(props, 'loadFilteredPolls');
    wrapper = mountWithRouterConnected(<PollsFilter {...props} />);
    wrapper.find('MemoryRouter').instance().history.push = mockFn;
    historyPushSpy = jest.spyOn(wrapper.find('MemoryRouter').instance().history, 'push');
    wrapper.update();
    await wrapper.find(PollsFilter).instance().componentDidMount();
    cmpnt = wrapper.find('PollsFilter');
    await asyncFlush();
    keyField = cmpnt.find('TextField#filter-key');
    valueField = cmpnt.find('TextField#filter-value');
  });
  beforeEach(() => state = wrapper.find('PollsFilter').instance().state);
  afterEach(() => jest.clearAllMocks());

  it('renders properly', () => {
    expect(cmpnt).toHaveLength(1);
    expect(cmpnt.prop('pollColumnData')).toEqual(pollColumnData);
    expect(cmpnt.prop('filters')).toEqual(filters);
    expect(typeof cmpnt.prop('loadFilteredPolls')).toBe('function');
    expect(typeof cmpnt.instance().handleFilterPolls).toBe('function');
    expect(typeof cmpnt.instance().handleSetState).toBe('function');
    expect(typeof cmpnt.instance().handleAddFilter).toBe('function');
    expect(typeof cmpnt.instance().handleRemoveFilter).toBe('function');
    expect(typeof cmpnt.instance().handleFilterChange).toBe('function');
    expect(cmpnt.instance().state).toEqual({
      filterDropDownList,
      filters,
      label: '',
      key: '',
      value: '',
      keyInvalid: false,
      valueInvalid: false,
    });
    expect(mountToJson(cmpnt)).toMatchSnapshot();
  });

  describe('Filter Key Field', () => {
    it('renders properly', () => {
      expect(keyField).toHaveLength(1);
      expect(keyField.prop('label')).toBe('Filter by:');
      expect(keyField.prop('error')).toBe(false);
      expect(keyField.prop('disabled')).toBe(false);
      expect(typeof keyField.prop('onChange')).toBe('function');
      expect(keyField.prop('helperText')).toBe('');
    });
    it('changes state "label" and "key" on field change', () => {
      expect(cmpnt.find('TextField#filter-value').prop('disabled')).toBe(true);
      expect(state.key).toBe('');
      fillInput(wrapper, 'filter-key', { target: { value: 'title' }, nativeEvent: { target: { innerText: 'Title' }}});
      expect(wrapper.find('PollsFilter').instance().state.key).toBe('title');
      expect(wrapper.find('PollsFilter').instance().state.label).toBe('Title');
      expect(wrapper.find('TextField#filter-value').prop('disabled')).toBe(false);
      expect(wrapper.find('Btn').prop('disabled')).toBe(true);
    });
  });

  describe('Filter Value Field', () => {
    it('renders properly', () => {
      expect(valueField).toHaveLength(1);
      expect(valueField.prop('label')).toBe('Value:');
      expect(valueField.prop('error')).toBe(false);
      expect(valueField.prop('disabled')).toBe(true);
      expect(typeof valueField.prop('onChange')).toBe('function');
      expect(valueField.prop('helperText')).toBe('');
    });
    it('changes state "value" on field change', () => {
      expect(wrapper.find('Btn').prop('disabled')).toBe(true);
      expect(state.value).toBe('');
      fillInput(wrapper, 'filter-key', { target: { value: 'title' }, nativeEvent: { target: { innerText: 'Title' }}});
      fillInput(wrapper, 'filter-value', { target: { value: 'Random Title' }});
      const newState = wrapper.find('PollsFilter').instance().state;
      expect(newState.key).toBe('title');
      expect(newState.label).toBe('Title');
      expect(newState.value).toBe('Random Title');
      expect(wrapper.find('Btn').prop('disabled')).toBe(false);
    });
  });

  it('"Add Filter" click calls loadFilteredPolls()', () => {
    expect(loadFilteredPollsSpy).not.toHaveBeenCalled();
    fillInput(wrapper, 'filter-key', { target: { value: 'title' }, nativeEvent: { target: { innerText: 'Title' }}});
    fillInput(wrapper, 'filter-value', { target: { value: 'Random Title' }});
    const button = wrapper.find('Btn');
    expect(button.prop('disabled')).toBe(false);
    expect(button.prop('text')).toBe('Add Filter');
    expect(button.prop('size')).toBe('small');
    expect(typeof button.prop('onClick')).toBe('function');
    clickButton(button);
    wrapper.update();
    expect(loadFilteredPollsSpy).toHaveBeenCalled();
    expect(loadFilteredPollsSpy).toHaveBeenCalledTimes(1);
    const newFilters = [
      { label: 'User', key: 'user_name', value: 'Alexandra' },
      { label: 'Title', key: 'title', value: 'Random Title' }
    ];
    expect(loadFilteredPollsSpy).toHaveBeenCalledWith(newFilters);
    expect(wrapper.find('PollsFilter').instance().state.filters).toEqual(newFilters);
  });

  describe('Chips', () => {
    let exampleChip;
    beforeAll(() => {
      fillInput(wrapper, 'filter-key', { target: { value: 'title' }, nativeEvent: { target: { innerText: 'Title' }}});
      fillInput(wrapper, 'filter-value', { target: { value: 'Random Title' }});
      clickButton(wrapper.find('Btn'));
      wrapper.update();
      exampleChip = wrapper.find('Chip#chip-user_name');
    });

    it('renders properly', () => {
      expect(state.filters).toEqual([
        { label: 'User', key: 'user_name', value: 'Alexandra' },
        { label: 'Title', key: 'title', value: 'Random Title' }
      ]);
      expect(wrapper.find('Chip')).toHaveLength(2);
      expect(exampleChip.prop('label')).toEqual(`User: Alexandra`);
      expect(typeof exampleChip.prop('onDelete')).toEqual('function');
    });
    it('resets entire state with updated "filters" on click', async () => {
      expect(loadFilteredPollsSpy).not.toHaveBeenCalled();
      exampleChip.prop('onDelete')();
      expect(loadFilteredPollsSpy).toHaveBeenCalled();
      expect(loadFilteredPollsSpy).toHaveBeenCalledTimes(1);
      expect(loadFilteredPollsSpy).toHaveBeenCalledWith([{ label: 'Title', key: 'title', value: 'Random Title' }]);
      const state2 = wrapper.find('PollsFilter').instance().state;
      expect(state2).toEqual({
        filterDropDownList,
        filters: [{ label: 'Title', key: 'title', value: 'Random Title' }],
        label: '',
        key: '',
        value: '',
        keyInvalid: false,
        valueInvalid: false
      }
    );
    });
  });
});
