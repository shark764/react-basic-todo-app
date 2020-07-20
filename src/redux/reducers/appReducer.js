import { fromJS } from 'immutable';
import * as ACTIONS from '../constants';

const initialState = fromJS({
  items: [
    {
      id: '6b7d54a2-caff-11ea-87d0-0242ac130003',
      name: 'Learn how to code',
      description: 'Spend two hours a day coding',
      type: 'dev-task',
      createdAt: 1578831166000,
      isCompleted: false,
    },
    {
      id: '8e0f82ec-caff-11ea-87d0-0242ac130003',
      name: 'Learn how to cook',
      description: 'Stop eating cereal all day',
      type: 'daily-task',
      createdAt: 1574104366000,
      isCompleted: false,
    },
    {
      id: 'b033cb6e-ccb0-11ea-87d0-0242ac130003',
      name: 'Take out the trash',
      description: "Do at least that for God's sake",
      type: 'daily-task',
      createdAt: 1549069931000,
      isCompleted: true,
    },
    {
      id: '66d8e256-d20a-11ea-87d0-0242ac130003',
      name: 'Wash the dishes',
      description: 'Or you can eat from the can, your call',
      type: 'daily-task',
      createdAt: 1594455449000,
      isCompleted: false,
    },
  ],
  renderCreate: false,
  renderEdit: false,
  selectedItem: {},
  selectedItemId: '',
});

const getItemIndex = (state, entity, itemId) => state.get(entity).findIndex(item => item.get('id') === itemId);

function appReducer(state = initialState, action) {
  switch (action.type) {
    case ACTIONS.ADD_ITEM: {
      return state.update('items', items => items.push(fromJS(action.payload)));
    }

    case ACTIONS.EDIT_ITEM: {
      const itemIndex = getItemIndex(state, 'items', action.id);
      return state.updateIn(['items', itemIndex], rider => rider.merge(fromJS(action.payload)));
    }

    case ACTIONS.REMOVE_ITEM: {
      const itemIndex = getItemIndex(state, 'items', action.id);
      return state.deleteIn(['items', itemIndex]);
    }

    default:
      return state;
  }
}

export default appReducer;
