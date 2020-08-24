import React from 'react';
import PropTypes from 'prop-types';

const TodoForm = ({ newName, onNewNameChanged, onSubmitForm, clearAllChecks, checkAll, allChecked }) => (
  <div className="TodoFormContainer">
    {allChecked && (
      <button type="button" onClick={clearAllChecks}>
        Clear All Checks
      </button>
    )}
    {!allChecked && (
      <button type="button" onClick={checkAll}>
        Check All
      </button>
    )}
    <form onSubmit={onSubmitForm} className="TodoForm">
      <label htmlFor="name">
        name
        <input id="name" type="text" value={newName} onChange={onNewNameChanged} />
      </label>
      <button type="submit">Add new task</button>
    </form>
  </div>
);

TodoForm.propTypes = {
  newName: PropTypes.string,
  onNewNameChanged: PropTypes.func,
  onSubmitForm: PropTypes.func,
  clearAllChecks: PropTypes.func,
  checkAll: PropTypes.func,
  allChecked: PropTypes.bool,
};

export default TodoForm;
