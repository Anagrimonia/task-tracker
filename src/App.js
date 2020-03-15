import React from 'react';
//import './App.css';
import styles from "./App.scss";
import classnames from 'classnames';

const cx = classnames.bind(styles);

const ThemeBar = ({theme, onThemeChange}) => {
  return (
    <div className={cx("theme-bar", { [`theme-bar__theme-${theme}`]: true })} >
      <button className={cx("theme-bar__button button", { [`button__theme-${theme}`]: true })}
              onClick={onThemeChange}>
              Switch theme
      </button>
    </div>
  );
};

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

class TaskTracker extends React.Component {
  state = {
    data: [],
  };

  onTaskAdd = (task) => {
    this.setState({ 
      data: [...this.state.data, 
             { id: this.state.data.length, 
               date: new Date().toLocaleTimeString() + "\t" + new Date().toLocaleDateString(),
               ...task } ] });
  };

  onSort = (type) => {
    const sorted = [].slice.call(this.state.data).sort((a, b) => {
      if (!isNaN(a[type]) || !isNaN(b[type])) { return a[type] - b[type]; }
      if (a[type] === b[type]) {return 0; }
      return a[type] > b[type] ? 0 : -1;
    });

    this.setState({ data: sorted });
  }

  render() {
    return (
      <div className={cx("task-tracker")}>
        <TaskAdder theme = {this.props.theme} onTaskAdd = {this.onTaskAdd} />
        <TaskTable theme = {this.props.theme} data={this.state.data} onSort={this.onSort}/>
      </div>
    );
  }
}

class App extends React.Component {
  state = {
    theme: "light"
  };

  onThemeChange = () => {
    this.setState({ theme: (this.state.theme === 'dark' ? 'light' : 'dark') });
    console.log(this.state.theme);
  };

  render() {
    return (
      <div className={cx('container', { [`container__theme-${this.state.theme}`]: true })}>
        <ThemeBar theme={this.state.theme} onThemeChange={this.onThemeChange} />
        <TaskTracker theme={this.state.theme}/>
      </div>
    );
  }
}


export default App;