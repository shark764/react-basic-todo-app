import React, { Component } from 'react';
import TodoItem from './TodoItem';
import TodoForm from './TodoForm';

class Todo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      newName: '',
      tasks: [
        { id: '1', name: 'Wake Up', checked: false },
        { id: '2', name: 'Sleep', checked: false },
        { id: '3', name: 'Take a Shower', checked: true },
        { id: '4', name: 'Study', checked: false },
        { id: '5', name: 'Make Dinner', checked: true },
        { id: '6', name: 'Go to Gym', checked: false },
        { id: '7', name: 'Read a Book', checked: false },
        { id: '8', name: 'Walk to the Park', checked: true },
        { id: '9', name: 'Wash the Dishes', checked: false },
        { id: '10', name: 'Make Tea', checked: false },
      ],
    };

    this.code = '';
  }

  clearAllChecks = () => {
    this.setState(state => ({
      tasks: state.tasks.map(task => ({
        ...task,
        checked: false,
      })),
    }));
  };

  checkAll = () => {
    this.setState(state => ({
      tasks: state.tasks.map(task => ({
        ...task,
        checked: true,
      })),
    }));
  };

  onTaskClicked = id => {
    this.setState(state => ({
      tasks: state.tasks.map(task => {
        if (task.id === id) {
          return {
            ...task,
            checked: !task.checked,
          };
        }
        return task;
      }),
    }));
  };

  onNewNameChanged = e => {
    this.setState({ newName: e.target.value });
  };

  onSubmitForm = e => {
    e.preventDefault();
    const { tasks, newName } = this.state;
    const currentTask = tasks.find(task => task.name === newName);
    if (!currentTask) {
      const id = Math.random().toString(36).substring(2);

      this.setState(state => ({
        tasks: [
          ...state.tasks,
          {
            id,
            name: state.newName,
            checked: false,
          },
        ],
      }));

      console.log('New task', { id, newName });
    } else {
      // eslint-disable-next-line no-alert
      alert(`A task with name "${currentTask.name}" already exists`);
    }
  };

  handleCodeChange = e => {
    /**
     * Instead of changing the state, we just
     * change the value of class variable
     */
    this.code = e.target.value;
  };

  handleCleanCode = () => {
    /**
     * Example of the use of "Ref"
     */
    this.codeInput.value = '';
    this.code = '';
  };

  handlePrintCode = () => {
    // eslint-disable-next-line no-alert
    alert(this.code);
  };

  render() {
    const { tasks, newName } = this.state;
    const allChecked = tasks.filter(task => task.checked).length === tasks.length;
    const noneChecked = tasks.filter(task => task.checked).length === 0;

    let allCheckedMessage;
    if (allChecked) {
      allCheckedMessage = (
        <div className="TaskMessage">
          <span>You have achieved all your tasks. Congratulations!!</span>
        </div>
      );
    } else if (noneChecked) {
      allCheckedMessage = (
        <div className="TaskMessage NoneChecked">
          <span>Holy Crap. You haven&#39;t done anything!! :s</span>
        </div>
      );
    }

    return (
      <div className="TodoContainer">
        <TodoForm
          newName={newName}
          onNewNameChanged={this.onNewNameChanged}
          onSubmitForm={this.onSubmitForm}
          clearAllChecks={this.clearAllChecks}
          checkAll={this.checkAll}
          allChecked={allChecked}
        />

        <div className="TasksList">
          <span>Tasks:</span>
          <ul>
            {tasks.map(task => (
              <TodoItem key={task.id} task={task} onTaskClicked={this.onTaskClicked} />
            ))}
          </ul>
        </div>

        {allCheckedMessage}

        <div>
          <input
            type="text"
            placeholder="Using ref"
            ref={ref => (this.codeInput = ref)}
            onChange={this.handleCodeChange}
          />
          <button type="button" onClick={this.handleCleanCode}>
            Clear
          </button>
          <button type="button" onClick={this.handlePrintCode}>
            Print
          </button>
        </div>
      </div>
    );
  }
}
export default Todo;
