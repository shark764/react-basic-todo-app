import React, { Component } from 'react';
import TodoItem from './TodoItem';
import TodoForm from './TodoForm';

class Todo extends Component {
  constructor(props){
    super(props);
    this.state = {
      newId: '',
      newName: '',
      tasks: [
        {
          id: '1',
          name: 'Wake Up',
        },
        {
          id: '2',
          name: 'Sleep',
        },
      ],
      checked: {},
    };
  }

  clearAllChecks = () => {
    this.setState({
      checked: {},
    });
  };

  onTaskClicked = (id, value) => {
    console.log(this.state.checked);
    this.setState(state => ({
      checked: {
        ...state.checked,
        [id]: value,
      },
    }));
  };

  onNewIdChanged = e => {
    this.setState({ newId: e.target.value });
  };

  onNewNameChanged = e => {
    this.setState({ newName: e.target.value });
  }

  onSubmitForm = e => {
    e.preventDefault();
    const { tasks, newId } = this.state;
    const currentTask = tasks.find(task => task.id === newId);
    if(!currentTask) {
      this.setState(state => ({
        tasks: [...state.tasks, {id: state.newId, name: state.newName}],
      }));
    } else {
      // eslint-disable-next-line no-alert
      alert(`A task with id ${currentTask.id} already exists`);
    }
   
  }

  render() {
    const { tasks, checked, newId, newName } = this.state;
    return (
     <div className="TodoContainer">
      <TodoForm 
        newId={newId}
        onNewIdChanged={this.onNewIdChanged}
        newName={newName}
        onNewNameChanged={this.onNewNameChanged}
        onSubmitForm={this.onSubmitForm}  
        clearAllChecks={this.clearAllChecks}
      />
      <div className="TasksList">
        <span>Tasks:</span>
        <ul>
          { tasks.map(task => (
              <TodoItem 
                key={task.id}
                task={task}
                checked={checked[task.id]}
                onTaskClicked={this.onTaskClicked}
              />
          ))}
        </ul>
      </div>
     </div>
    );
  }
}
export default Todo;