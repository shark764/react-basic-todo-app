import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Layout from './layout';

class Edit extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ...props.selectedItem,
      // name,
      // description,
      // type,
      // isCompleted,
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

    const { name, description, type, isCompleted } = this.state;
    const { selectedItemId } = this.props;

    /**
     * Text is empty, return
     */
    if (name.trim() === '') {
      return;
    }

    /**
     * New item with default data
     */
    const updatedItem = {
      id: selectedItemId,
      name,
      description,
      type,
      isCompleted,
    };

    /**
     * We call the handler for new items and pass
     * an object with new task and key
     */
    const { onUpdateItem } = this.props;
    onUpdateItem(updatedItem);
  };

  render() {
    const { name, description, type, isCompleted } = this.state;
    const { selectedItem, selectedItemId } = this.props;

    return (
      <Layout
        selectedItem={selectedItem}
        selectedItemId={selectedItemId}
        name={name}
        description={description}
        type={type}
        isCompleted={isCompleted}
        handleInputChange={this.handleInputChange}
        handleSubmit={this.handleSubmit}
      />
    );
  }
}

Edit.propTypes = {
  selectedItemId: PropTypes.string,
  selectedItem: PropTypes.shape({
    name: PropTypes.string,
    id: PropTypes.string,
    description: PropTypes.string,
    type: PropTypes.string,
    isCompleted: PropTypes.bool,
  }),
  onUpdateItem: PropTypes.func,
};

export default Edit;
