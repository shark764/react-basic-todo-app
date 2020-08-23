import React from 'react';
import PropTypes from 'prop-types';

const TodoItem = ({ name }) => (
<li>
  <input type="checkbox" />
  {name}
</li>
);

TodoItem.propTypes = {
  name: PropTypes.string,
};

export default TodoItem;