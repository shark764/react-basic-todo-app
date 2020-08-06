/* eslint-disable jsx-a11y/label-has-associated-control */

import React from 'react';
import { Field } from 'redux-form/immutable';
import PropTypes from 'prop-types';
import { taskTypes } from '../../utils';

const Layout = props => {
  const { key, handleSubmit, pristine, reset, submitting, mode } = props;

  let content = (
    <form onSubmit={handleSubmit} key={key} autoComplete="off">
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

      <div className="actions-inline">
        <input type="submit" value="Submit" disabled={pristine || submitting} />
        <button type="button" disabled={pristine || submitting} onClick={reset}>
          Clear Values
        </button>
      </div>
    </form>
  );

  if (mode !== 'inline') {
    content = (
      <div className="App-main">
        <div className="App-list">{content}</div>
      </div>
    );
  }

  return content;
};

Layout.propTypes = {
  key: PropTypes.string,
  handleSubmit: PropTypes.func,
  pristine: PropTypes.bool,
  reset: PropTypes.func,
  submitting: PropTypes.bool,
  mode: PropTypes.string,
};

export default Layout;
