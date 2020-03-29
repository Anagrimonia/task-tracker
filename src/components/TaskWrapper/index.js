import React from 'react';
import classnames from 'classnames';
import styles from "../App.scss";

import { connect } from "react-redux";
import { addTask, sortTasks } from "../../actions";

import TaskAdder from "../TaskAdder";
import TaskTable from "../TaskTable";

const cx = classnames.bind(styles);

const mapStateToProps = state => ({
  tasks: state.tasks
});

const mapDispatchToProps = dispatch => ({
  addTask: task => dispatch(addTask(task)),
  sortTasks: param => dispatch(sortTasks(param))
});

class TaskWrapper extends React.Component {

  onTaskAdd = (task) => {
    var obj = { id: this.props.tasks.length, 
               date: new Date().toLocaleTimeString() + "\t" + new Date().toLocaleDateString(),
               ...task };

    this.props.addTask(obj);
  };

  render() {
    return (
      <div className={cx("task-tracker")}>
        <TaskAdder theme = {this.props.theme} onTaskAdd = {this.onTaskAdd} />
        <TaskTable theme = {this.props.theme} data={this.props.tasks} onSort={this.props.sortTasks}/>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TaskWrapper); 