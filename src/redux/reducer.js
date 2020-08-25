import { combineReducers } from 'redux-immutable';
import { reducer as formReducer } from 'redux-form/immutable';
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

    case 'ON_NEW_NAME_CHANGED': {
      return state.set('newName', action.text);
    }

    case 'SET_FETCHED_DATA': {
      return state.set('tasks', fromJS(action.data));
    }

    case 'TASK_CREATED': {
      return state.update('tasks', tasks => tasks.unshift(fromJS(action.data)));
    }

    case 'TASK_UPDATED': {
      const index = state.get('tasks').findIndex(task => task.get('id') === action.id);
      return state.updateIn(['tasks', index], task => task.merge(action.data));
    }

    case 'TASK_REMOVED': {
      const index = state.get('tasks').findIndex(task => task.get('id') === action.id);
      return state.deleteIn(['tasks', index]);
    }

    default:
      return state;
  }
};

export default combineReducers({
  app: reducer,
  form: formReducer,
});
