/* eslint-disable no-alert */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { Component } from 'react';
import { Map } from 'immutable';
import { v1 as uuid } from 'uuid';
import FieldComponent from './FieldComponent';
import ButtonComponent from './ButtonComponent';
import RenderMap from '../ImmutableExamples/RenderMap';

class FormWithReusableComponents extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      type: 'routine',
      description: '',
      showValues: false,
    };
  }

  handleInputChange = e => {
    const { target } = e;
    const { value } = target;
    const { name } = target;

    this.setState({
      [name]: value,
    });
  };

  handleSubmit = e => {
    /**
     * We prevent page from refreshing
     */
    e.preventDefault();

    this.setState({
      showValues: true,
    });
  };

  render() {
    const { name, description, type, showValues } = this.state;
    return (
      <div>
        <h2>Form With Reusable Components</h2>

        <form onSubmit={this.handleSubmit} autoComplete="off">
          <label htmlFor="name">
            <span className="required">Name:</span>
            <FieldComponent
              name="name"
              component="input"
              type="text"
              placeholder="Enter a task name..."
              value={name}
              onChange={this.handleInputChange}
            />
          </label>

          <label htmlFor="type">
            <span className="required">Pick task type:</span>
            <FieldComponent
              name="type"
              component="select"
              emptyLabel="--- Select a type ---"
              options={[
                { value: 'dev-task', label: 'Development task' },
                { value: 'daily-task', label: 'Daily task' },
                { value: 'routine', label: 'Routine' },
                { value: 'incidentals', label: 'Incidentals' },
                { value: 'projects', label: 'Projects' },
                { value: 'problems', label: 'Problems' },
                { value: 'researching', label: 'Researching' },
                { value: 'testing', label: 'Testing' },
              ]}
              value={type}
              onChange={this.handleInputChange}
            />
          </label>

          <label htmlFor="description">
            <span>Description:</span>
            <FieldComponent
              name="description"
              component="textarea"
              placeholder="Add a description..."
              cols="30"
              rows="5"
              value={description}
              onChange={this.handleInputChange}
            />
          </label>

          <div className="actions-inline">
            <FieldComponent type="submit" value="Submit" />
            <ButtonComponent type="button" onClick={() => alert('I only display a popup :(')} label="Clear Values" />
          </div>
        </form>

        {showValues && (
          <RenderMap
            dataMap={
              new Map({
                id: uuid(),
                name,
                description,
                type,
                createdAt: Date.now(),
                isCompleted: false,
              })
            }
          />
        )}
      </div>
    );
  }
}

export default FormWithReusableComponents;
