import React from 'react';
import PropTypes from 'prop-types';

const TodoItem = ({ task: { name, id, checked = false }, onTaskClicked, onRemoveTask }) => (
  <li>
    <input type="checkbox" checked={checked} onChange={() => onTaskClicked(id)} />
    <span className={`${checked ? 'item-completed' : ''}`}>{name}</span>
    <button type="button" onClick={onRemoveTask}>
      X
    </button>
  </li>
);

TodoItem.propTypes = {
  task: PropTypes.shape({
    name: PropTypes.string,
    checked: PropTypes.bool,
    id: PropTypes.string,
  }),
  onTaskClicked: PropTypes.func,
  onRemoveTask: PropTypes.func,
};

export default TodoItem;
