import React, { Component } from 'react';
import { Tasks } from '../api/tasks.js'; 
// Task component - represents a single todo item
export default class Task extends Component {
  toggleChecked() {
    // Set the checked property to the opposite of its current value
    Tasks.update(this.props.task._id, {
      $set: { checked: !this.props.task.checked },
    });
  }
 
  deleteThisTask() {
    Tasks.remove(this.props.task._id);
  }
  render() {
    // Give tasks a different className when they are checked off,
    // so that we can style them nicely in CSS
    const taskClassName = this.props.task.checked ? 'checked' : '';
    return (
      	<li class="list-group-item">
      	  <button class="btn btn-danger" onClick={this.deleteThisTask.bind(this)}><i class="fa fa-trash"></i> </button>
      	  <input
          type="checkbox"
          readOnly
          checked={!!this.props.task.checked}
          onClick={this.toggleChecked.bind(this)}
          />
          <span className="text"> {this.props.task.text} by {this.props.task.username}</span>
        </li>
    );
  }
}