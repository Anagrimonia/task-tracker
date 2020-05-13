import React from 'react';
import classnames from 'classnames';
import styles from "./App.scss";

import Task from "./Task"

import PropTypes from 'prop-types';

const cx = classnames.bind(styles);

const TaskTable = ({theme, data, onSort, onEdit}) => {
  return (
      <div>
        <table className={cx("task-table", { [`task-table__theme-${theme}`]: true })}>
          <tbody>
            <tr>
              <th><p onClick={() => onSort('name')}>Name</p></th>
              <th><p onClick={() => onSort('description')}>Description</p></th>
              <th><p onClick={() => onSort('priority')}>Priority</p></th>
              <th><p onClick={() => onSort('completed')}>Completed</p></th>
            </tr>
            {data.map((task) => (<Task key={task.id} 
                                       task={task}
                                       onEdit={onEdit}/>
            ))}
          </tbody>
         </table>   
      </div>
    );
};

TaskTable.propTypes = {
  theme: PropTypes.string,
  data: PropTypes.array,
  onSort: PropTypes.func,
  onEdit: PropTypes.func
};

export default TaskTable; 