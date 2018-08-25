import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { withTracker } from 'meteor/react-meteor-data';
 
import { Tasks } from '../api/tasks.js';

import Task from './Task.js';
 
// App component - represents the whole app
class App extends Component {
  getTasks() {
    return [
      { _id: 1, text: 'This is task 1' },
      { _id: 2, text: 'This is task 2' },
      { _id: 3, text: 'This is task 3' },
    ];
  }

  handleSubmit(event) {
    event.preventDefault();
 
    // Find the text field via the React ref
    const text = ReactDOM.findDOMNode(this.refs.insertTask).value.trim();
 
    Tasks.insert({
      text,
      createdAt: new Date(), // current time
    });
 
    // Clear form
    ReactDOM.findDOMNode(this.refs.insertTask).value = '';
  }
 
  renderTasks() {
    return this.props.tasks.map((task) => (
      <Task key={task._id} task={task} />
    ));
  }
 
  render() {
    return (
      <div className="container">
        <header>
          <h1>Todo List</h1>
        </header>
 
        <ul class="list-group">
          {this.renderTasks()}
        </ul>
        <br/><br/>
        <form onSubmit={this.handleSubmit.bind(this)}>
          <div class="form-group">
            <label form="inputTask">New Task</label>
            <input type="text" class="form-control" id="inputTask" placeholder="Type your task" ref="insertTask"/>
            <small id="taskHelp" class="form-text text-muted">Type here your task.</small>
          </div>
          <button type="submit" class="btn btn-success"><i class="fa fa-plus"></i> Add </button>
        </form>
      </div>
    );
  }
}

export default withTracker(() => {
  return {
    tasks: Tasks.find({}, { sort: { createdAt: -1 } }).fetch(),
  };
})(App);
