export function checkAll(bool) {
  return {
    type: 'CHECK_ALL',
    bool,
  };
}

export function onTaskClicked(id) {
  return {
    type: 'ON_TASK_CLICKED',
    id,
  };
}

export function onNewNameChanged(text) {
  return {
    type: 'ON_NEW_NAME_CHANGED',
    text,
  };
}

export function onSubmitForm() {
  return {
    type: 'ON_SUBMIT_FORM',
  };
}
