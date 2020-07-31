import React, { Component } from 'react';
import { fromJS } from 'immutable';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { v1 as uuid } from 'uuid';

import List from '../List';
import Create from '../Create';
import Edit from '../Edit';
import SidePanel from '../../components/SidePanel';

import { getAllItems, getSelectedItemId, getSelectedItem, getRenderCreate, getRenderEdit } from '../../redux/selectors';
import {
  addItem,
  updateItem,
  removeItem,
  closePanel,
  clearList,
  toggleAll,
  openCreatePanel,
  openEditPanel,
} from '../../redux/actions';

function mapStateToProps(state) {
  return {
    items: getAllItems(state),
    renderCreate: getRenderCreate(state),
    renderEdit: getRenderEdit(state),
    selectedItemId: getSelectedItemId(state),
    selectedItem: getSelectedItem(state),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onAddItem: item => dispatch(addItem(item)),
    onUpdateItem: (id, item) => dispatch(updateItem(id, item)),
    onRemoveItem: id => dispatch(removeItem(id)),
    onClearList: () => dispatch(clearList()),
    onToggleAll: bool => dispatch(toggleAll(bool)),
    onClosePanel: () => dispatch(closePanel()),
    onOpenCreatePanel: () => dispatch(openCreatePanel()),
    onOpenEditPanel: id => dispatch(openEditPanel(id)),
  };
}

class Main extends Component {
  constructor(props) {
    super(props);

    /**
     * We use a class variable, to avoid re-rendering
     * everytime there is a change in input value
     */
    this.currentItem = '';
  }

  handleInputChange = e => {
    /**
     * Instead of changing the state, we just
     * change the value of class variable
     */
    this.currentItem = e.target.value;
  };

  handleAddItem = e => {
    /**
     * We prevent page from refreshing
     */
    e.preventDefault();

    /**
     * Text is empty, clean and return
     */
    if (this.currentItem.trim() === '') {
      this.mainInput.value = '';
      return;
    }

    /**
     * New item with default data
     */
    const newItem = fromJS({
      id: uuid(),
      name: this.currentItem,
      description: '',
      type: 'daily-task',
      createdAt: Date.now(),
      isCompleted: false,
    });
    /**
     * We call the handler for new items and pass
     * an object with new task and key
     */
    this.props.onAddItem(newItem);

    /**
     * We clean class variable, to avoid adding
     * another item if Add button is pressed
     *
     * Cleaning class variable doesn't clear input
     */
    this.currentItem = '';

    /**
     * Example of the use of "Ref"
     * Clearing input after submit
     */
    this.mainInput.value = '';
  };

  render() {
    return (
      <div className="App-main">
        <div className="App-list">
          <header>
            <form onSubmit={this.handleAddItem} className="form-inline" autoComplete="off">
              <input
                ref={ref => (this.mainInput = ref)}
                type="text"
                placeholder="Enter a text..."
                onChange={this.handleInputChange}
              />
              <input type="submit" value="Add" />

              <button type="button" onClick={this.props.onOpenCreatePanel}>
                Create
              </button>

              <button type="button" onClick={this.props.onClearList}>
                Clear List
              </button>
            </form>
          </header>

          <div className="rTable-container">
            <List
              items={this.props.items}
              onUpdateItem={this.props.onUpdateItem}
              onRemoveItem={this.props.onRemoveItem}
              onToggleAll={this.props.onToggleAll}
              handleEdit={this.props.onOpenEditPanel}
            />
          </div>
        </div>

        {this.props.renderCreate && (
          <SidePanel handleClose={this.props.onClosePanel}>
            <Create />
          </SidePanel>
        )}
        {this.props.renderEdit && this.props.selectedItemId && (
          <SidePanel handleClose={this.props.onClosePanel}>
            <Edit key={this.props.selectedItemId} />
          </SidePanel>
        )}
      </div>
    );
  }
}

Main.propTypes = {
  items: ImmutablePropTypes.listOf(
    ImmutablePropTypes.contains({
      name: PropTypes.string,
      id: PropTypes.string,
    }),
  ),
  renderCreate: PropTypes.bool,
  renderEdit: PropTypes.bool,
  selectedItemId: PropTypes.string,
  onAddItem: PropTypes.func,
  onUpdateItem: PropTypes.func,
  onRemoveItem: PropTypes.func,
  onClearList: PropTypes.func,
  onToggleAll: PropTypes.func,
  onClosePanel: PropTypes.func,
  onOpenCreatePanel: PropTypes.func,
  onOpenEditPanel: PropTypes.func,
};

export default connect(mapStateToProps, mapDispatchToProps)(Main);
