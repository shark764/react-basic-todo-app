import { combineReducers } from 'redux-immutable';
import { fromJS } from 'immutable';

const initialState = fromJS({
  newName: '',
  tasks: [
    { id: '1', name: 'Wake Up', checked: false },
    { id: '2', name: 'Sleep', checked: false },
    { id: '3', name: 'Take a Shower', checked: true },
    { id: '4', name: 'Study', checked: false },
    { id: '5', name: 'Make Dinner', checked: true },
    { id: '6', name: 'Go to Gym', checked: false },
    { id: '7', name: 'Read a Book', checked: false },
    { id: '8', name: 'Walk to the Park', checked: true },
    { id: '9', name: 'Wash the Dishes', checked: false },
    { id: '10', name: 'Make Tea', checked: false },
    { id: '11', name: 'Tease Squidward', checked: true },
    { id: '12', name: 'Take out the Trash', checked: false },
    { id: '13', name: 'Listen to Iron Maiden', checked: true },
    { id: '14', name: 'Dance Tusa', checked: false },
  ],
});

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'CHECK_ALL': {
      return state.update('tasks', tasks => tasks.map(item => item.set('checked', action.bool)));
    }

    case 'ON_TASK_CLICKED': {
      return state.update('tasks', tasks =>
        tasks.map(task => (task.get('id') === action.id ? task.set('checked', !task.get('checked')) : task)),
      );
    }

    case 'ON_NEW_NAME_CHANGED': {
      return state.set('newName', action.text);
    }

    case 'ON_SUBMIT_FORM': {
      const task = fromJS({
        id: Math.random().toString(36).substring(2),
        name: state.get('newName'),
        checked: false,
      });
      return state.update('tasks', tasks => tasks.push(task));
    }

    default:
      return state;
  }
};

export default combineReducers({
  app: reducer,
});
