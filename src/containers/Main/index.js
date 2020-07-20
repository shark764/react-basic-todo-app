import React, { Component } from 'react';
import { v1 as uuid } from 'uuid';

import List from '../List';
import Create from '../Create';
import Edit from '../Edit';
import SidePanel from '../../components/SidePanel';

class Main extends Component {
  constructor(props) {
    super(props);

    this.state = {
      items: [
        {
          id: '6b7d54a2-caff-11ea-87d0-0242ac130003',
          name: 'Learn how to code',
          description: 'Spend two hours a day coding',
          type: 'dev-task',
          createdAt: 1578831166000,
          isCompleted: false,
        },
        {
          id: '8e0f82ec-caff-11ea-87d0-0242ac130003',
          name: 'Learn how to cook',
          description: 'Stop eating cereal all day',
          type: 'daily-task',
          createdAt: 1574104366000,
          isCompleted: false,
        },
        {
          id: 'b033cb6e-ccb0-11ea-87d0-0242ac130003',
          name: 'Take out the trash',
          description: "Do at least that for God's sake",
          type: 'daily-task',
          createdAt: 1549069931000,
          isCompleted: true,
        },
        {
          id: '66d8e256-d20a-11ea-87d0-0242ac130003',
          name: 'Wash the dishes',
          description: 'Or you can eat from the can, your call',
          type: 'daily-task',
          createdAt: 1594455449000,
          isCompleted: false,
        },
      ],
      renderCreate: false,
      renderEdit: false,
      selectedItem: {},
      selectedItemId: '',
    };

    /**
     * We use a class variable, to avoid re-rendering
     * everytime there is a change in input value
     */
    this.currentItem = '';
  }

  onAddItem = item => {
    this.setState(prevState => {
      const items = [item, ...prevState.items];

      return {
        items,
      };
    });
  };

  onUpdateItem = uItem => {
    this.setState(prevState => {
      const items = prevState.items.map(item => {
        if (item.id === uItem.id) {
          return Object.assign(item, uItem);
        } else {
          return item;
        }
      });

      return {
        items,
      };
    });
  };

  onRemoveItem = id => {
    this.setState(prevState => {
      const items = prevState.items.filter(item => item.id !== id);

      if (id === prevState.selectedItemId) {
        return {
          items,
          renderEdit: false,
          selectedItem: {},
          selectedItemId: '',
        };
      }

      return {
        items,
      };
    });
  };

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
    const newItem = {
      id: uuid(),
      name: this.currentItem,
      description: '',
      type: 'daily-task',
      isCompleted: false,
    };
    /**
     * We call the handler for new items and pass
     * an object with new task and key
     */
    this.onAddItem(newItem);

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

  handleCreate = () => {
    this.setState({
      renderCreate: true,
      renderEdit: false,
      selectedItem: {},
      selectedItemId: '',
    });
  };

  handleEdit = id => {
    this.setState(prevState => {
      const selectedItem = prevState.items.find(item => item.id === id);
      return {
        renderCreate: false,
        renderEdit: true,
        selectedItem,
        selectedItemId: id,
      };
    });
  };

  handleClose = () => {
    this.setState({
      renderCreate: false,
      renderEdit: false,
      selectedItem: {},
      selectedItemId: '',
    });
  };

  render() {
    const { items, renderCreate, renderEdit, selectedItemId, selectedItem } = this.state;

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

              <button type="button" onClick={this.handleCreate}>
                Create
              </button>
            </form>
          </header>

          <div className="rTable-container">
            <List
              items={items}
              onUpdateItem={this.onUpdateItem}
              onRemoveItem={this.onRemoveItem}
              handleEdit={this.handleEdit}
            />
          </div>
        </div>

        {renderCreate && (
          <SidePanel handleClose={this.handleClose}>
            <Create key="create" onAddItem={this.onAddItem} />
          </SidePanel>
        )}
        {renderEdit && selectedItemId && (
          <SidePanel handleClose={this.handleClose}>
            <Edit
              key={selectedItemId}
              selectedItemId={selectedItemId}
              selectedItem={selectedItem}
              onUpdateItem={this.onUpdateItem}
            />
          </SidePanel>
        )}
      </div>
    );
  }
}

export default Main;
