import { fromJS, List } from 'immutable';
import * as ACTIONS from '../constants';

const initialState = fromJS({
  items: [],
  renderCreate: false,
  renderEdit: false,
  selectedItemId: '',
});

const getItemIndex = (state, entity, itemId) => state.get(entity).findIndex(item => item.get('id') === itemId);

const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTIONS.STORE_ADDED_ITEM: {
      return state.update('items', items => items.unshift(action.payload));
    }

    case ACTIONS.STORE_UPDATED_ITEM: {
      const itemIndex = getItemIndex(state, 'items', action.id);
      return state.updateIn(['items', itemIndex], item => item.merge(action.payload));
    }

    case ACTIONS.REMOVED_ITEM: {
      const itemIndex = getItemIndex(state, 'items', action.id);
      if (state.get('selectedItemId') === action.id) {
        return state.deleteIn(['items', itemIndex]).set('renderEdit', false).set('selectedItemId', '');
      }
      return state.deleteIn(['items', itemIndex]);
    }

    case ACTIONS.SET_SELECTED_ITEM_ID: {
      return state.set('selectedItemId', action.id);
    }

    case ACTIONS.SET_RENDER_CREATE: {
      return state.set('renderCreate', action.payload);
    }

    case ACTIONS.SET_RENDER_EDIT: {
      return state.set('renderEdit', action.payload);
    }

    case ACTIONS.OPEN_CREATE_PANEL: {
      return state.set('renderCreate', true).set('renderEdit', false).set('selectedItemId', '');
    }

    case ACTIONS.OPEN_EDIT_PANEL: {
      return state.set('renderCreate', false).set('renderEdit', true).set('selectedItemId', action.id);
    }

    case ACTIONS.CLOSE_PANEL: {
      return state.set('renderCreate', false).set('renderEdit', false).set('selectedItemId', '');
    }

    case ACTIONS.CLEAR_LIST: {
      return state.set('items', new List([])).set('renderEdit', false).set('selectedItemId', '');
    }

    case ACTIONS.TOGGLE_ALL: {
      return state.update('items', items => items.map(item => item.set('isCompleted', action.bool)));
    }

    case ACTIONS.STORE_RETRIEVED_ITEMS: {
      return state.set('items', fromJS(action.payload));
    }

    default:
      return state;
  }
};

export default appReducer;
