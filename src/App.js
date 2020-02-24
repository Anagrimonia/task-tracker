import React from 'react';
import logo from './logo.svg';
import './App.css';

const Task = ({name, description, priority, date}) => {
  return (
    <tr className="task-table__task">
      <td className="task-table__name">{name}</td>
      <td className="task-table__description">{description}</td>
      <td className="task-table__date">{date}</td>
      <td className="task-table__priority">{priority}</td>
    </tr>
  );
};

const TaskTable = ({data, onSort}) => {
  return (
      <div>
        <table className="task-table">
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
      <div className="add-form">
        <input 
          type="text" 
          placeholder="Name" 
          className="add-form__name"
          value={this.state.name} 
          onChange={(e) => this.handleChange(e, 'name')} 
        />
        <input 
          type="text" 
          placeholder="Priority" 
          className="add-form__priority"
          value={this.state.priority } 
          onChange={(e) => this.handleChange(e, 'priority')} 
         />
        <textarea 
          rows="3" 
          placeholder="Description" 
          className="add-form__description"
          value={this.state.description } 
          onChange={(e) => this.handleChange(e, 'description')} 
        />
        <button className="add-form__submit"
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
      <div className="task-tracker">
        <TaskAdder onTaskAdd = {this.onTaskAdd} />
        <TaskTable data={this.state.data} onSort={this.onSort}/>
      </div>
    );
  }
}

const App = () => {
  return <TaskTracker />;
};

export default App;