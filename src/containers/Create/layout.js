import React from 'react';
import PropTypes from 'prop-types';
import { taskTypes } from '../../utils';

function Layout(props) {
  const { name, description, type, handleInputChange, handleSubmit } = props;

  return (
    <form onSubmit={handleSubmit} autoComplete="off">
      <label htmlFor="name">
        <span className="required">Name:</span>
        <input type="text" name="name" value={name} onChange={handleInputChange} placeholder="Enter a task name..." />
      </label>

      <label htmlFor="type">
        <span className="required">Pick task type:</span>
        <select name="type" value={type} onChange={handleInputChange}>
          <option value="" disabled>
            Select a type...
          </option>
          {taskTypes.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </label>

      <label htmlFor="description">
        <span>Description:</span>
        <textarea
          name="description"
          value={description}
          onChange={handleInputChange}
          placeholder="Add a description..."
          cols="30"
          rows="5"
        />
      </label>

      <input type="submit" value="Submit" />
    </form>
  );
}

Layout.propTypes = {
  name: PropTypes.string,
  description: PropTypes.string,
  type: PropTypes.string,
  handleInputChange: PropTypes.func,
  handleSubmit: PropTypes.func,
};

export default Layout;
