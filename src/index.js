import React, { Component } from 'react';
import { render } from 'react-dom';
import AddUserForm from './components/AddUserForm.jsx'
import AddExerciseForm from './components/AddExerciseForm.jsx'

/////////////////////////////////

class App extends Component {
  constructor() {
    super();
  }


  render() {

    return (  
      <div id='container'>
        <AddUserForm />
        <AddExerciseForm />
      </div>
    )
  }
}

render(<App />, document.getElementById('root'));