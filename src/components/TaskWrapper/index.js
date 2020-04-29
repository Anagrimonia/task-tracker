import React from 'react';
import classnames from 'classnames';
import styles from "../App.scss";

import { connect } from "react-redux";
import { addTask, sortTasks } from "../../actions";

import TaskAdder from "../TaskAdder";
import TaskTable from "../TaskTable";

const cx = classnames.bind(styles);

const mapStateToProps = state => ({ 
  tasks: (project_id) => project_id in state.tasks ? state.tasks[project_id] : [] }
);

const mapDispatchToProps = dispatch => ({
  addTask: (task , project_id) => dispatch(addTask(task, project_id)),
  sortTasks: (param) => dispatch(sortTasks(param))
});

class TaskWrapper extends React.Component {

  onTaskAdd = (task) => {
    if (task.name === '') task.name = 'Task'
    var obj = { id: this.props.tasks(this.props.id).length, 
               date: new Date().toLocaleTimeString() + "\t" + new Date().toLocaleDateString(),
               ...task };

    this.props.addTask(obj, this.props.id);
  };

  render() {
    return (
      <div className={cx("task-tracker")}>
        <TaskAdder theme={this.props.theme} onTaskAdd={this.onTaskAdd} />
        <TaskTable theme={this.props.theme} 
                   data={this.props.tasks(this.props.id)} 
                   onSort={this.props.sortTasks}/>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TaskWrapper); 