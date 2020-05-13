import React from 'react';
import classnames from 'classnames';
import styles from "./App.scss";

import PropTypes from 'prop-types';

const cx = classnames.bind(styles);

class Task extends React.Component {

	state = {
		task: this.props.task,
		isEditOn: false
	};

	editOn = () => {
		console.log(this.state.task, this.props.task);
      	if (JSON.stringify(this.state.task) !== JSON.stringify(this.props.task)) 
      		this.props.onEdit(this.state.task);
			
		this.setState({ isEditOn: !this.state.isEditOn, task: this.props.task });
	};

	onValueEdit = (e) => {
		this.setState({ task: { ...this.state.task, [e.target.name]: e.target.value }});
	};

	onCheckEdit = (e) => {
		this.setState({ task: { ...this.state.task, [e.target.name]: e.target.checked }}, () => {
			this.props.onEdit(this.state.task);
		});
	};

	render() {
		return (
		    <tr onDoubleClick={this.editOn} 
		    	className={cx("task-table__task")}>
		      <td><EditableData name='name' 
		      				    value={this.props.task.name} 
		      				    onChange={this.onValueEdit}
		      				    isEditOn={this.state.isEditOn}/></td>
		      <td><EditableData name='description' 
		      				    value={this.props.task.description} 
		      				    onChange={this.onValueEdit}
		      				    isEditOn={this.state.isEditOn}/></td>
		      <td><EditableData name='priority' 
		      				    value={this.props.task.priority} 
		      				    onChange={this.onValueEdit}
		      				    isEditOn={this.state.isEditOn}/></td>
		      <td><CheckableData name='completed' 
		      				     value={this.props.task.completed} 
		      				     onChange={this.onCheckEdit}/></td>
		    </tr>
		);
	};
};

const EditableData = ({ name, value, onChange, isEditOn }) => (
    isEditOn ? <input type='text'
    				  name={name}
		    	      defaultValue={value}
		    	      className={cx('task-table__editable' )}
		    	      onChange={onChange} /> : value
);

const CheckableData = ({ name, value, onChange }) => (
    <input type='checkbox'
    	   name={name}
	       checked={value}
	       className='task-table__editable' 
	       onChange={onChange} />
);

Task.propTypes = {
  task: PropTypes.object,
  onEdit: PropTypes.func
};

EditableData.propTypes = {
  name: PropTypes.string,
  value: PropTypes.oneOfType([
		    PropTypes.string,
		    PropTypes.number
		]),
  onChange: PropTypes.func,
  isEditOn: PropTypes.bool
};

CheckableData.propTypes = {
  name: PropTypes.string,
  value: PropTypes.bool,
  onChange: PropTypes.func,
};

export default Task; 