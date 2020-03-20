import React from 'react';
import classnames from 'classnames';
import styles from "../App.scss";

const cx = classnames.bind(styles);

const Task = ({name, description, priority, date}) => {
  return (
    <tr className={cx("task-table__task")}>
      <td className={cx("task-table__name")}>{name}</td>
      <td className={cx("task-table__description")}>{description}</td>
      <td className={cx("task-table__date")}>{date}</td>
      <td className={cx("task-table__priority")}>{priority}</td>
    </tr>
  );
};

export default Task; 