import React from 'react';
import classnames from 'classnames';
import styles from "../App.scss";

import { connect } from "react-redux";
import { addProject } from "../../actions";

import ProjectAdder from "../ProjectAdder";
import ProjectTable from "../ProjectTable";

const cx = classnames.bind(styles);

const mapStateToProps = state => ({
  projects: state.projects
});

const mapDispatchToProps = dispatch => ({
  addProject: project => dispatch(addProject(project)),
});

class ProjectWrapper extends React.Component {

  onProjectAdd = (project) => {

  if (project.name === '')
        project.name = 'Project'
      

    var obj = { id: this.props.projects.length, 
               date: new Date().toLocaleTimeString() + "\t" + new Date().toLocaleDateString(),
               ...project };

    this.props.addProject(obj);
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

export default connect(mapStateToProps, mapDispatchToProps)(ProjectWrapper); 