import { List } from 'immutable';

export const getAllItems = state => state.getIn(['app', 'items'], new List([]));

export const getItem = (state, id) => state.getIn(['app', 'items'], new List([])).find(item => item.get('id') === id);

export const getSelectedItemId = state => state.getIn(['app', 'selectedItemId']);

export const getSelectedItem = state =>
  state.getIn(['app', 'items'], new List([])).find(item => item.get('id') === getSelectedItemId(state));

export const getRenderCreate = state => state.getIn(['app', 'renderCreate'], false);

export const getRenderEdit = state => state.getIn(['app', 'renderEdit'], false);
