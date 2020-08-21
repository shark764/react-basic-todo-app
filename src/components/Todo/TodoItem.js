import React from 'react';
import PropTypes from 'prop-types';

const TodoItem = ({ task: { name, id }, checked = false, onTaskClicked }) => (
<li>
  <input 
    type="checkbox" 
    checked={checked}
    onChange={() => onTaskClicked(id, !checked)}
  />
  {name}
</li>
);

TodoItem.propTypes = {
  task: PropTypes.shape({
    name: PropTypes.string,
    id: PropTypes.string,
  }),
  checked: PropTypes.bool,
  onTaskClicked: PropTypes.func,
};

export default TodoItem;