/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-alert */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { Component } from 'react';
import FieldComponent from '../components/ReusableComponents/FieldComponent';
import { humanize } from '../utils';
import ButtonComponent from '../components/ReusableComponents/ButtonComponent';

class FormWithReusableComponents extends Component {
  constructor(props) {
    super(props);

    this.state = {
      fields: [],
      form: {
        id: '',
        name: '',
        component: 'input',
        type: 'text',
        className: '',
        placeholder: '',
        style: {},
        options: [],
        onChange: undefined,
        required: false,
        cols: '',
        rows: '',
        optionvalue: '',
        optionlabel: '',
      },
    };
  }

  handleFormChange = e => {
    const { target } = e;
    const value = target.name === 'required' ? target.checked : target.value;
    const { name } = target;

    this.setState(prevState => ({
      form: {
        ...prevState.form,
        [name]: value,
      },
    }));
  };

  handleSubmit = e => {
    /**
     * We prevent page from refreshing
     */
    e.preventDefault();

    this.setState(prevState => ({
      fields: [...prevState.fields, prevState.form],
    }));
  };

  handleAddOption = () => {
    this.setState(prevState => ({
      form: {
        ...prevState.form,
        options: [
          ...prevState.form.options,
          {
            value: prevState.form.optionvalue,
            label: prevState.form.optionlabel,
          },
        ],
      },
    }));
  };

  render() {
    const { fields, form } = this.state;
    return (
      <div className="App-main">
        <div className="App-list">
          <h3>Form With Reusable Components</h3>

          <div style={{ display: 'flex' }}>
            <form onSubmit={this.handleSubmit} autoComplete="off" style={{ flex: 1, marginRight: '5rem' }}>
              <h5>Form Generator</h5>
              <label htmlFor="component">
                <span className="required">Component:</span>
                <FieldComponent
                  name="component"
                  component="select"
                  placeholder="--- Select a type ---"
                  options={[
                    { value: 'input', label: 'Input' },
                    { value: 'textarea', label: 'Textarea' },
                    { value: 'select', label: 'Select' },
                  ]}
                  value={form.component}
                  onChange={this.handleFormChange}
                />
              </label>

              <label htmlFor="id">
                <span className="required">Id:</span>
                <FieldComponent
                  name="id"
                  component="input"
                  type="text"
                  value={form.id}
                  onChange={this.handleFormChange}
                />
              </label>

              <label htmlFor="name">
                <span className="required">Name:</span>
                <FieldComponent
                  name="name"
                  component="input"
                  type="text"
                  value={form.name}
                  onChange={this.handleFormChange}
                />
              </label>

              {form.component === 'input' && (
                <label htmlFor="type">
                  <span className="required">Input type:</span>
                  <FieldComponent
                    name="type"
                    component="select"
                    placeholder="--- Select a type ---"
                    options={[
                      { value: 'text', label: 'Text' },
                      { value: 'number', label: 'Number' },
                      { value: 'password', label: 'Password' },
                      { value: 'submit', label: 'Submit' },
                    ]}
                    value={form.type}
                    onChange={this.handleFormChange}
                  />
                </label>
              )}

              <label htmlFor="placeholder">
                <span className="required">Placeholder:</span>
                <FieldComponent
                  name="placeholder"
                  component="input"
                  type="text"
                  value={form.placeholder}
                  onChange={this.handleFormChange}
                />
              </label>

              {form.component === 'textarea' && (
                <>
                  <label htmlFor="cols">
                    <span className="required">Cols:</span>
                    <FieldComponent
                      name="cols"
                      component="input"
                      type="number"
                      value={form.cols}
                      onChange={this.handleFormChange}
                    />
                  </label>

                  <label htmlFor="rows">
                    <span className="required">Rows:</span>
                    <FieldComponent
                      name="rows"
                      component="input"
                      type="number"
                      value={form.rows}
                      onChange={this.handleFormChange}
                    />
                  </label>
                </>
              )}

              {form.component === 'select' && (
                <label htmlFor="cols">
                  <span className="required" style={{ order: 1 }}>
                    Options:
                  </span>

                  <div style={{ display: 'inline-flex', order: 2 }}>
                    <FieldComponent
                      name="optionvalue"
                      component="input"
                      type="text"
                      value={form.optionvalue}
                      onChange={this.handleFormChange}
                    />
                    <FieldComponent
                      name="optionlabel"
                      component="input"
                      type="text"
                      value={form.optionlabel}
                      onChange={this.handleFormChange}
                    />
                    <ButtonComponent
                      type="button"
                      onClick={this.handleAddOption}
                      label="Add"
                      style={{ height: '2.25rem', lineHeight: '1.25rem', marginTop: '0.25rem' }}
                    />
                  </div>

                  <div style={{ order: 3, display: 'inline-grid' }}>
                    {form.options.map(option => (
                      <span key={option.value}>
                        value: 
{' '}
<strong>{option.value}</strong>
, label: 
{' '}
<strong>{option.label}</strong>
                      </span>
                    ))}
                  </div>
                </label>
              )}

              <label className="label-checkbox" htmlFor="required">
                <span>Is required?</span>
                <FieldComponent
                  name="required"
                  component="input"
                  type="checkbox"
                  className="a11y-hidden"
                  checked={form.required}
                  onChange={this.handleFormChange}
                />
              </label>

              <FieldComponent type="submit" value="Submit" />
            </form>

            <form autoComplete="off" style={{ flex: 1 }}>
              <h5>Resulting Form</h5>
              {fields.map(field => (
                <label key={field.id} htmlFor="name">
                  <span {...(field.required && { className: 'required' })}>{humanize(field.name)}</span>
                  <FieldComponent {...field} />
                </label>
              ))}
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default FormWithReusableComponents;
