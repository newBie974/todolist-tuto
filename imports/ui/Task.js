import React, { Component } from 'react';
import { Tasks } from '../api/tasks.js'; 
// Task component - represents a single todo item
export default class Task extends Component {
  constructor(props){
  	super(props);

  	this.state = props;

  }
  
  toggleChecked() {
    // Set the checked property to the opposite of its current value
    Tasks.update(this.props.task._id, {
      $set: { checked: !this.props.task.checked },
    });
  }
 
  editThisTask(){
  	Tasks.update(this.props.task._id, {
  	  $set: {text: this.state.task.text},
  	});
  }

  deleteThisTask() {
    Tasks.remove(this.props.task._id);
  }

  activeEdit(){
  	console.log(this);
  }

  _handleKeyPress(e){
  	if(e.key == 'Enter'){
  		console.log('la dedans ', this.props.task, this.state.task.text);
  		Tasks.update(this.props.task._id, {
  			$set: {text: this.state.task.text},
  		});
  	}
  }

  _handleChange(event){
  	//console.log(event.target.value);
  	this.setState({task:{text: event.target.value}});
  }

  render() {
    // Give tasks a different className when they are checked off,
    // so that we can style them nicely in CSS
    const taskClassName = this.props.task.checked ? 'checked' : '';
    return (
      	<li className={ this.props.task.checked ? "list-group-item" : " active list-group-item"}>
      	  <input
          type="checkbox"
          readOnly
          checked={!!this.props.task.checked}
          onClick={this.toggleChecked.bind(this)}
          />
          <span className="text"> {this.props.task.text} by {this.props.task.username}</span><br/>
          <button className="btn btn-danger pull-right rounded-0" onClick={this.deleteThisTask.bind(this)}><i className="fa fa-trash"></i> </button>
      	  <button className="btn btn-success pull-right rounded-0" onClick={this.activeEdit.bind(this)}><i className="fa fa-pencil"></i> </button>
          <input className="form-control" type="text" onChange={this._handleChange.bind(this)} onKeyPress={this._handleKeyPress.bind(this)} value={this.state.task.text}/>
        </li>
    );
  }
}