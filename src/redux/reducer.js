import { combineReducers } from 'redux-immutable';
import { fromJS } from 'immutable';

const initialState = fromJS({
  newName: '',
  tasks: [],
});

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'CHECK_ALL': {
      return state.update('tasks', tasks => tasks.map(item => item.set('checked', action.bool)));
    }

    case 'ON_TASK_CLICKED': {
      return state.update('tasks', tasks =>
        tasks.map(task => (task.get('id') === action.id ? task.set('checked', !task.get('checked')) : task))
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

    case 'SET_FETCHED_DATA': {
      return state.set('tasks', fromJS(action.data));
    }

    default:
      return state;
  }
};

export default combineReducers({
  app: reducer,
});
