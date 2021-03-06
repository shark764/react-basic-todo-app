import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { fromJS } from 'immutable';
import Layout from './layout';

class Item extends Component {
  constructor(props) {
    super(props);

    const name = props.item.get('name');
    const isCompleted = props.item.get('isCompleted');
    this.state = {
      name,
      isCompleted,
    };
  }

  componentDidUpdate(prevProps) {
    const name = this.props.item.get('name');
    const isCompleted = this.props.item.get('isCompleted');

    if (prevProps.item.get('name') !== name) {
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({ name });
    }
    if (prevProps.item.get('isCompleted') !== isCompleted) {
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({ isCompleted });
    }
  }

  handleChange = e => {
    this.setState({
      name: e.target.value,
    });
  };

  handleBlur = () => {
    const { item, onUpdateItem } = this.props;
    const { name } = this.state;
    /**
     * Avoiding firing update event twice
     * if user already pressed enter
     */
    if (item.get('name') !== name) {
      onUpdateItem(item.get('id'), fromJS({ name }));
    }
  };

  handleKeyDown = ({ keyCode }) => {
    /**
     * User pressed the enter key, update the input
     * and global state
     */
    if (keyCode === 13) {
      const { item, onUpdateItem } = this.props;
      const { name } = this.state;
      if (item.get('name') !== name) {
        onUpdateItem(item.get('id'), fromJS({ name }));
      }
    }
  };

  handleCheck = () => {
    const { item, onUpdateItem } = this.props;
    const { isCompleted } = this.state;
    onUpdateItem(
      item.get('id'),
      fromJS({
        isCompleted: !isCompleted,
      }),
    );
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
  item: ImmutablePropTypes.contains({
    name: PropTypes.string,
    id: PropTypes.string,
    isCompleted: PropTypes.bool,
  }),
  onRemoveItem: PropTypes.func,
  onUpdateItem: PropTypes.func,
  handleEdit: PropTypes.func,
};

export default withRouter(Item);
