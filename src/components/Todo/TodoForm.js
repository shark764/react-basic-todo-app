/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form/immutable';
import { fromJS } from 'immutable';
import { createTask } from '../../redux/actions';

const taskTypes = [
  { value: 'dev-task', label: 'Development task' },
  { value: 'daily-task', label: 'Daily task' },
  { value: 'routine', label: 'Routine' },
  { value: 'incidentals', label: 'Incidentals' },
  { value: 'projects', label: 'Projects' },
  { value: 'problems', label: 'Problems' },
  { value: 'researching', label: 'Researching' },
  { value: 'testing', label: 'Testing' },
];

const TodoForm = ({ handleSubmit, clearAllChecks, checkAll, allChecked }) => (
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
    <form onSubmit={handleSubmit} className="TodoForm">
      <label htmlFor="name">
        Name
        <Field name="name" component="input" type="text" placeholder="Enter a task name..." />
      </label>

      <label htmlFor="type">
        Type
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

      <button type="submit">Add new task</button>
    </form>
  </div>
);

TodoForm.propTypes = {
  handleSubmit: PropTypes.func,
  clearAllChecks: PropTypes.func,
  checkAll: PropTypes.func,
  allChecked: PropTypes.bool,
};

const Form = reduxForm({
  form: 'form::create',
  onSubmit: (values, dispatch) => dispatch(createTask(values.toJS())),
  destroyOnUnmount: true,
})(TodoForm);

const mapStateToProps = () => ({
  initialValues: fromJS({}),
});

const ConnectedForm = connect(mapStateToProps)(Form);

export default ConnectedForm;
