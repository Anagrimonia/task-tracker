import React from 'react';
import classnames from 'classnames';
import styles from "../App.scss";

const cx = classnames.bind(styles);

class ProjectAdder extends React.Component {

  getDefaultState = () => {
    return {
      name: '',
    };
  };

  state = this.getDefaultState();

  handleTaskAdd = () => {
    this.props.onProjectAdd(this.state);
    this.setState(this.getDefaultState());
  };

  handleChange = (e, field) => {
    this.setState({
      [field]: e.target.value
    });
  };

  render() {
    return (
      <div className={cx("add-form add-form__one-column", { [`add-form__theme-${this.props.theme}`]: true })}>
        <input 
          type="text" 
          placeholder="Name" 
          className={cx("add-form__name")}
          value={this.state.name} 
          onChange={(e) => this.handleChange(e, 'name')} 
        />
        <button className={cx("add-form__submit button")}
                onClick={this.handleTaskAdd}>
                Add
        </button>
      </div>
    );
  }
}

export default ProjectAdder; 