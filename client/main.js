import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
 
import App from '../imports/ui/App.js';
 
Meteor.startup(() => {
	console.log('la dedans');
  render(<App />, document.getElementById('render-target'));
});