import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import TodoItem from './TodoItem';
import TodoForm from './TodoForm';
import { checkAll, onTaskClicked, onNewNameChanged, onSubmitForm, fetchData } from '../../redux/actions';

class Todo extends Component {
  componentDidMount() {
    this.props.fetchData();
  }

  onSubmitForm = e => {
    e.preventDefault();

    const { tasks } = this.props;

    const currentTask = tasks.find(task => task.name === this.props.newName);
    if (!currentTask) {
      this.props.onSubmitForm();
    } else {
      // eslint-disable-next-line no-alert
      alert(`A task with name "${currentTask.name}" already exists`);
    }
  };

  render() {
    const { tasks } = this.props;
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
          newName={this.props.newName}
          onNewNameChanged={e => this.props.onNewNameChanged(e.target.value)}
          onSubmitForm={this.onSubmitForm}
          clearAllChecks={() => this.props.checkAll(false)}
          checkAll={() => this.props.checkAll(true)}
          allChecked={allChecked}
        />

        <div className="TasksList">
          <span>Tasks:</span>
          <ul>
            {tasks.map(task => (
              <TodoItem key={task.id} task={task} onTaskClicked={() => this.props.onTaskClicked(task.id)} />
            ))}
          </ul>
        </div>

        {allCheckedMessage}
      </div>
    );
  }
}

Todo.propTypes = {
  newName: PropTypes.string,
  tasks: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      checked: PropTypes.bool,
      id: PropTypes.string,
    }),
  ),
  checkAll: PropTypes.func,
  onTaskClicked: PropTypes.func,
  onNewNameChanged: PropTypes.func,
  onSubmitForm: PropTypes.func,
  fetchData: PropTypes.func,
};

const mapStateToProps = state => ({
  tasks: state.getIn(['app', 'tasks']).toJS(),
  newName: state.getIn(['app', 'newName']),
});

const actions = {
  checkAll,
  onTaskClicked,
  onNewNameChanged,
  onSubmitForm,
  fetchData,
};

export default connect(mapStateToProps, actions)(Todo);
