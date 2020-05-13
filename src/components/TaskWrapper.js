import React from 'react';
import classnames from 'classnames';
import styles from "./App.scss";

import { connect } from "react-redux";
import { initTasks, addTask, editTask, sortTasks } from "../actions";

import TaskAdder from "./TaskAdder";
import TaskTable from "./TaskTable";

import PropTypes from 'prop-types';

const cx = classnames.bind(styles);

const mapStateToProps = state => ({ 
  tasks: state.tasks,
  theme: state.theme,
});

const mapDispatchToProps = dispatch => ({
  initTasks: (project_id) => dispatch(initTasks(project_id)),
  addTask: (task, project_id) => dispatch(addTask(task, project_id)),
  editTask: (task, project_id) => dispatch(editTask(task, project_id)),
  sortTasks: (param) => dispatch(sortTasks(param))
});

class TaskWrapper extends React.Component {

  state = {
    project_id: this.props.id.match.params.id,
  };

  componentDidMount() {
    this.props.initTasks(this.state.project_id);
  }

  onTaskAdd = (data) => {
    if (data.name === '') data.name = 'Untitled'

    const task = { name: data.name, description: data.description, priority: parseInt(data.priority) }
    this.props.addTask(task, this.state.project_id);
  };

  onTaskEdit = (task) => {
    task.projectId = parseInt(this.state.project_id);
    task.priority = parseInt(task.priority);
    this.props.editTask(task, this.state.project_id);
  }

  render() {
    return (
      <div className={cx("task-tracker")}>
        <TaskAdder theme={this.props.theme} onTaskAdd={this.onTaskAdd} />
        <TaskTable theme={this.props.theme} 
                   data={this.props.tasks} 
                   onSort={this.props.sortTasks}
                   onEdit={this.onTaskEdit}/>
      </div>
    );
  }
}

TaskWrapper.propTypes = {
  theme: PropTypes.string,
  tasks: PropTypes.array,
  project_id: PropTypes.string
};

export default connect(mapStateToProps, mapDispatchToProps)(TaskWrapper); 