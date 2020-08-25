export function checkAll(bool) {
  return {
    type: 'CHECK_ALL',
    bool,
  };
}

export function onTaskClicked(id, checked) {
  return {
    type: 'UPDATE_TASK',
    id,
    checked,
  };
}

export function onNewNameChanged(text) {
  return {
    type: 'ON_NEW_NAME_CHANGED',
    text,
  };
}

export function fetchData() {
  return {
    type: 'FETCH_DATA',
  };
}

export function tasksFetched(data) {
  return {
    type: 'SET_FETCHED_DATA',
    data,
  };
}

export function createTask(data) {
  return {
    type: 'CREATE_TASK',
    data,
  };
}

export function taskCreated(data) {
  return {
    type: 'TASK_CREATED',
    data,
  };
}

export function taskUpdated(id, data) {
  return {
    type: 'TASK_UPDATED',
    id,
    data,
  };
}

export function removeTask(id) {
  return {
    type: 'REMOVE_TASK',
    id,
  };
}

export function taskRemoved(id) {
  return {
    type: 'TASK_REMOVED',
    id,
  };
}
