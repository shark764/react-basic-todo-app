import * as ACTIONS from '../constants';

export const formSubmit = (action, payload) => {
  if (action === 'edit') {
    return updateItem(payload.get('id'), payload.toJS());
  }

  return addItem(payload.toJS());
};

export const addItem = payload => ({
  type: ACTIONS.ADD_ITEM,
  payload,
});

export const storeAddedItem = payload => ({
  type: ACTIONS.STORE_ADDED_ITEM,
  payload,
});

export const updateItem = (id, payload) => ({
  type: ACTIONS.UPDATE_ITEM,
  id,
  payload,
});

export const storeUpdatedItem = (id, payload) => ({
  type: ACTIONS.STORE_UPDATED_ITEM,
  id,
  payload,
});

export const removeItem = id => ({
  type: ACTIONS.REMOVE_ITEM,
  id,
});

export const removedItem = id => ({
  type: ACTIONS.REMOVED_ITEM,
  id,
});

export const setSelectedItemId = id => ({
  type: ACTIONS.SET_SELECTED_ITEM_ID,
  id,
});

export const setRenderCreate = payload => ({
  type: ACTIONS.SET_RENDER_CREATE,
  payload,
});

export const setRenderEdit = payload => ({
  type: ACTIONS.SET_RENDER_EDIT,
  payload,
});

export const closePanel = () => ({
  type: ACTIONS.CLOSE_PANEL,
});

export const clearList = () => ({
  type: ACTIONS.CLEAR_LIST,
});

export const toggleAll = bool => ({
  type: ACTIONS.TOGGLE_ALL,
  bool,
});

export const openCreatePanel = () => ({
  type: ACTIONS.OPEN_CREATE_PANEL,
});

export const openEditPanel = id => ({
  type: ACTIONS.OPEN_EDIT_PANEL,
  id,
});

export const retrieveTodos = () => ({
  type: ACTIONS.RETRIEVE_ITEMS,
});

export const storeRetrievedItems = payload => ({
  type: ACTIONS.STORE_RETRIEVED_ITEMS,
  payload,
});
