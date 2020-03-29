import React from 'react';
import classnames from 'classnames';
import styles from "../App.scss";

const cx = classnames.bind(styles);

class TaskAdder extends React.Component {

  getDefaultState = () => {
    return {
      name: '',
      description: '',
      priority: '',
    };
  };

  state = this.getDefaultState();

  handleTaskAdd = () => {
    this.props.onTaskAdd(this.state);
    this.setState(this.getDefaultState());
  };

  handleChange = (e, field) => {
    this.setState({
      [field]: e.target.value
    });
  };

  render() {
    return (
      <div className={cx("add-form", { [`add-form__theme-${this.props.theme}`]: true })}>
        <input 
          type="text" 
          placeholder="Name" 
          className={cx("add-form__name")}
          value={this.state.name} 
          onChange={(e) => this.handleChange(e, 'name')} 
        />
        <input 
          type="text" 
          placeholder="Priority" 
          className={cx("add-form__priority")}
          value={this.state.priority } 
          onChange={(e) => this.handleChange(e, 'priority')} 
         />
        <textarea 
          rows="3" 
          placeholder="Description" 
          className={cx("add-form__description")}
          value={this.state.description } 
          onChange={(e) => this.handleChange(e, 'description')} 
        />
        <button className={cx("add-form__submit button")}
                onClick={this.handleTaskAdd}>
                Add
        </button>
      </div>
    );
  }
}

export default TaskAdder; 