import React from 'react';
import classnames from 'classnames';
import styles from "./App.scss";

import PropTypes from 'prop-types';

const cx = classnames.bind(styles);

const Project = ({name}) => {
  return (
    <div className={cx("project-table__project")}>
    	<div className={cx("project-table__content")}>
    		<div className={cx("project-table__name")}>{name}</div>
      	</div>
    </div>
  );
};

Project.propTypes = {
  name: PropTypes.string,
};

export default Project; 