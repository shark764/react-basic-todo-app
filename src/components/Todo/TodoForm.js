import React from 'react';
import PropTypes from 'prop-types';

const TodoForm = ({
  newId,
  newName,
  onNewIdChanged,
  onNewNameChanged,
  onSubmitForm,
  clearAllChecks,
}) => (
   <div className="TodoFormContainer">
     <button type="button" onClick={clearAllChecks}>
        Clear All Checks
     </button>
    <form onSubmit={onSubmitForm} className="TodoForm">
      <label htmlFor="id">
        id
        <input
          id="id"
          type="number"
          value={newId}
          onChange={onNewIdChanged}
        />
      </label>
      <label htmlFor="name">
        name
        <input
          id="name"
          type="text"
          value={newName}
          onChange={onNewNameChanged}
        />
      </label>
     <button type="submit">Add new task</button>
    </form>
   </div>
  );

TodoForm.propTypes = {
  newId: PropTypes.string,
  newName: PropTypes.string,
  onNewIdChanged: PropTypes.func,
  onNewNameChanged: PropTypes.func,
  onSubmitForm: PropTypes.func,
  clearAllChecks: PropTypes.func,
};

export default TodoForm;
