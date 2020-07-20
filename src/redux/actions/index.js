import * as ACTIONS from '../constants';

export function addItem(payload) {
  return {
    type: ACTIONS.ADD_ITEM,
    payload,
  };
}

export function editItem(id, payload) {
  return {
    type: ACTIONS.EDIT_ITEM,
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
