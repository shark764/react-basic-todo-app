import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import TodoItem from './TodoItem';
import TodoForm from './TodoForm';
import { checkAll, onTaskClicked, fetchData, removeTask } from '../../redux/actions';

class Todo extends Component {
  componentDidMount() {
    this.props.fetchData();
  }

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
          clearAllChecks={() => this.props.checkAll(false)}
          checkAll={() => this.props.checkAll(true)}
          allChecked={allChecked}
        />

        <div className="TasksList">
          <span>Tasks:</span>
          <ul>
            {tasks.map(task => (
              <TodoItem
                key={task.id}
                task={task}
                onTaskClicked={() => this.props.onTaskClicked(task.id, !task.checked)}
                onRemoveTask={() => this.props.removeTask(task.id)}
              />
            ))}
          </ul>
        </div>

        {allCheckedMessage}
      </div>
    );
  }
}

Todo.propTypes = {
  tasks: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      checked: PropTypes.bool,
      id: PropTypes.string,
    }),
  ),
  checkAll: PropTypes.func,
  onTaskClicked: PropTypes.func,
  removeTask: PropTypes.func,
  fetchData: PropTypes.func,
};

const mapStateToProps = state => ({
  tasks: state.getIn(['app', 'tasks']).toJS(),
  newName: state.getIn(['app', 'newName']),
});

const actions = {
  checkAll,
  onTaskClicked,
  fetchData,
  removeTask,
};

export default connect(mapStateToProps, actions)(Todo);
