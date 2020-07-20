import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import Layout from './layout';

class Item extends Component {
  constructor(props) {
    super(props);

    const { name, isCompleted } = props.item;
    this.state = {
      name,
      isCompleted,
    };
  }

  handleChange = e => {
    this.setState({
      name: e.target.value,
    });
  };

  handleBlur = () => {
    const { item, onUpdateItem } = this.props;
    const { name } = this.state;
    onUpdateItem({ ...item, name });
  };

  handleKeyDown = ({ keyCode }) => {
    /**
     * User pressed the enter key, update the input
     * and global state
     */
    if (keyCode === 13) {
      const { item, onUpdateItem } = this.props;
      const { name } = this.state;
      onUpdateItem({ ...item, name });
    }
  };

  handleCheck = () => {
    const { item, onUpdateItem } = this.props;
    const { isCompleted } = this.state;
    onUpdateItem({
      ...item,
      isCompleted: !isCompleted,
    });
    this.setState(prevState => ({
      isCompleted: !prevState.isCompleted,
    }));
  };

  // handleEdit = () => {
  //   const { item } = this.props;
  //   this.props.history.push(`/edit/${item.id}`);
  // };

  render() {
    const { item, onRemoveItem, handleEdit } = this.props;
    const { name, isCompleted } = this.state;

    return (
      <Layout
        item={item}
        name={name}
        isCompleted={isCompleted}
        onRemoveItem={onRemoveItem}
        handleChange={this.handleChange}
        handleBlur={this.handleBlur}
        handleKeyDown={this.handleKeyDown}
        handleCheck={this.handleCheck}
        handleEdit={handleEdit}
        handleSubmit={this.handleSubmit}
      />
    );
  }
}

Item.propTypes = {
  item: PropTypes.shape({
    name: PropTypes.string,
    id: PropTypes.string,
    isCompleted: PropTypes.bool,
  }),
  name: PropTypes.string,
  isCompleted: PropTypes.bool,
  onRemoveItem: PropTypes.func,
  onUpdateItem: PropTypes.func,
  handleEdit: PropTypes.func,
};

export default withRouter(Item);
