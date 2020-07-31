/* eslint-disable jsx-a11y/label-has-associated-control */

import React from 'react';
import { Field } from 'redux-form/immutable';
import PropTypes from 'prop-types';
import { taskTypes } from '../../utils';

function Layout(props) {
  const { key, selectedItemId, handleSubmit, pristine, reset, submitting } = props;

  return (
    <form onSubmit={handleSubmit} key={key} autoComplete="off">
      <label htmlFor="id">
        <span>ID:</span>
        <span>{selectedItemId}</span>
      </label>

      <label htmlFor="name">
        <span className="required">Name:</span>
        <Field name="name" component="input" type="text" placeholder="Enter a task name..." />
      </label>

      <label htmlFor="type">
        <span className="required">Pick task type:</span>
        <Field name="type" component="select">
          <option value="" disabled>
            Select a type...
          </option>
          {taskTypes.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </Field>
      </label>

      <label htmlFor="description">
        <span>Description:</span>
        <Field name="description" component="textarea" placeholder="Add a description..." cols="30" rows="5" />
      </label>

      <label className="label-checkbox" htmlFor="isCompleted">
        <span>Is completed?</span>
        <Field name="isCompleted" component="input" type="checkbox" className="a11y-hidden" />
      </label>

      <div className="inline">
        <input type="submit" value="Submit" disabled={pristine || submitting} />
        <button type="button" disabled={pristine || submitting} onClick={reset}>
          Clear Values
        </button>
      </div>
    </form>
  );
}

Layout.propTypes = {
  key: PropTypes.string,
  selectedItemId: PropTypes.string,
  handleSubmit: PropTypes.func,
  pristine: PropTypes.bool,
  reset: PropTypes.func,
  submitting: PropTypes.bool,
};

export default Layout;
