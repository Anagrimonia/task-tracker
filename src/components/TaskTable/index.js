import React from 'react';
import classnames from 'classnames';
import styles from "../App.scss";

import Task from "../Task"

const cx = classnames.bind(styles);

const TaskTable = ({theme, data, onSort}) => {
  return (
      <div>
        <table className={cx("task-table", { [`task-table__theme-${theme}`]: true })}>
          <tbody>
            <tr>
              <th><p onClick={() => onSort('name')}>Name</p></th>
              <th><p onClick={() => onSort('description')}>Description</p></th>
              <th><p onClick={() => onSort('date')}>Date</p></th>
              <th><p onClick={() => onSort('priority')}>Priority</p></th>
            </tr>
            {data.map((item) => (<Task key={item.id} 
                                       name={item.name} 
                                       description={item.description} 
                                       date={item.date}
                                       priority={item.priority} />
            ))}
          </tbody>
         </table>   
      </div>
    );
};

export default TaskTable; 