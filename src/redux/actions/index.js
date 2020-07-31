import * as ACTIONS from '../constants';

export function addItem(payload) {
  return {
    type: ACTIONS.ADD_ITEM,
    payload,
  };
}

export function updateItem(id, payload) {
  return {
    type: ACTIONS.UPDATE_ITEM,
    id,
    payload,
  };
}

export function removeItem(id) {
  return {
    type: ACTIONS.REMOVE_ITEM,
    id,
  };
}

export function setSelectedItemId(id) {
  return {
    type: ACTIONS.SET_SELECTED_ITEM_ID,
    id,
  };
}

export function setRenderCreate(payload) {
  return {
    type: ACTIONS.SET_RENDER_CREATE,
    payload,
  };
}

export function setRenderEdit(payload) {
  return {
    type: ACTIONS.SET_RENDER_EDIT,
    payload,
  };
}

export function closePanel() {
  return {
    type: ACTIONS.CLOSE_PANEL,
  };
}

export function openCreatePanel() {
  return {
    type: ACTIONS.OPEN_CREATE_PANEL,
  };
}

export function openEditPanel(id) {
  return {
    type: ACTIONS.OPEN_EDIT_PANEL,
    id,
  };
}
