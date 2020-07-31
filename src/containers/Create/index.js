import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { v1 as uuid } from 'uuid';
import Layout from './layout';
// import PropTypes from 'prop-types';

class Create extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      description: '',
      type: '',
    };
  }

  handleInputChange = e => {
    const { target } = e;
    const value = target.name === 'isCompleted' ? target.checked : target.value;
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

    const { name, description, type } = this.state;

    /**
     * Text is empty, return
     */
    if (name.trim() === '') {
      return;
    }

    /**
     * New item with default data
     */
    const newItem = {
      id: uuid(),
      name,
      description,
      type,
      createdAt: Date.now(),
      isCompleted: false,
    };

    /**
     * We call the handler for new items and pass
     * an object with new task and key
     */
    this.props.onAddItem(newItem);
  };

  render() {
    const { name, description, type } = this.state;

    return (
      <Layout
        name={name}
        description={description}
        type={type}
        handleInputChange={this.handleInputChange}
        handleSubmit={this.handleSubmit}
      />
    );
  }
}

Create.propTypes = {
  onAddItem: PropTypes.func,
};

export default Create;
