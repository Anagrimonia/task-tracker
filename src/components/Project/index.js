import React from 'react';
import classnames from 'classnames';
import styles from "../App.scss";

const cx = classnames.bind(styles);

const Project = ({name, date}) => {
  return (
    <div className={cx("project-table__project")}>
    	<div className={cx("project-table__content")}>
    		<div className={cx("project-table__name")}>{name}</div>
      		<div className={cx("project-table__date")}>{date}</div>
      	</div>
    </div>
  );
};

export default Project; 