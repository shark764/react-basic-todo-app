import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { getSelectedItemId, getRenderCreate, getRenderEdit } from '../../redux/selectors';
import { addItem, closePanel, clearList, openCreatePanel, retrieveTodos } from '../../redux/actions';
import Layout from './layout';

class Main extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
    };
  }

  componentDidMount() {
    this.props.retrieveTodos();
  }

  handleInputChange = e => {
    this.setState({
      name: e.target.value,
    });
  };

  handleSubmit = e => {
    /**
     * We prevent page from refreshing
     */
    e.preventDefault();

    const { name } = this.state;

    /**
     * Text is empty, clean and return
     */
    if (name.trim() === '') {
      this.setState({
        name: '',
      });
      return;
    }

    /**
     * We call the handler for new items and pass
     * an object with new task and key
     */
    this.props.onAddItem({
      name,
      description: '',
      type: 'daily-task',
    });

    this.setState({
      name: '',
    });
  };

  render() {
    const { name } = this.state;
    const { renderCreate, renderEdit, selectedItemId, onClearList, onClosePanel, onOpenCreatePanel } = this.props;

    return (
      <Layout
        name={name}
        handleInputChange={this.handleInputChange}
        handleSubmit={this.handleSubmit}
        renderCreate={renderCreate}
        renderEdit={renderEdit}
        selectedItemId={selectedItemId}
        onClearList={onClearList}
        onClosePanel={onClosePanel}
        onOpenCreatePanel={onOpenCreatePanel}
      />
    );
  }
}

Main.propTypes = {
  renderCreate: PropTypes.bool,
  renderEdit: PropTypes.bool,
  selectedItemId: PropTypes.string,
  onAddItem: PropTypes.func,
  onClearList: PropTypes.func,
  onClosePanel: PropTypes.func,
  onOpenCreatePanel: PropTypes.func,
  retrieveTodos: PropTypes.func,
};

const mapStateToProps = state => ({
  renderCreate: getRenderCreate(state),
  renderEdit: getRenderEdit(state),
  selectedItemId: getSelectedItemId(state),
});

const actions = {
  onAddItem: addItem,
  onClearList: clearList,
  onClosePanel: closePanel,
  onOpenCreatePanel: openCreatePanel,
  retrieveTodos,
};

export default connect(mapStateToProps, actions)(Main);
