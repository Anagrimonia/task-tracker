import React from 'react';
import classnames from 'classnames';
import styles from "./App.scss";

import { connect } from "react-redux";
import { initProjects, addProject } from "../actions";

import ProjectAdder from "./ProjectAdder";
import ProjectTable from "./ProjectTable";

import PropTypes from 'prop-types';

const cx = classnames.bind(styles);

const mapStateToProps = state => ({
  projects: state.projects,
  theme: state.theme,
});

const mapDispatchToProps = dispatch => ({
  initProjects: () => dispatch(initProjects()),
  addProject: project => dispatch(addProject(project)),
});

class ProjectWrapper extends React.Component {

  componentDidMount() {
    this.props.initProjects();
  }

  onProjectAdd = (project) => {
    this.props.addProject(project);
  };

  render() {
    return (
      <div className={cx("project-tracker")}>
        <ProjectAdder theme = {this.props.theme} onProjectAdd = {this.onProjectAdd} />
        <ProjectTable theme = {this.props.theme} data={this.props.projects} />
      </div>
    );
  }
}

ProjectWrapper.propTypes = {
  theme: PropTypes.string,
  projects: PropTypes.array,
};

export default connect(mapStateToProps, mapDispatchToProps)(ProjectWrapper); 