import React from 'react';
import classnames from 'classnames';
import styles from "./App.scss";

import { Link } from 'react-router-dom'

import Project from "./Project"

import PropTypes from 'prop-types';

const cx = classnames.bind(styles);

const ProjectTable = ({theme, data}) => {
  return (
  	<div className={cx("project-table", { [`project-table__theme-${theme}`]: true })}>
      {data.map((item) => (
      	<Link key={item.id} to={{pathname: `projects/${item.id}`}}>
    		  <Project key={item.id} name={item.name} date={item.date} />
        </Link>
      ))}
    </div>  
  );
};

ProjectTable.propTypes = {
  theme: PropTypes.string,
  data: PropTypes.array,
};

export default ProjectTable; 