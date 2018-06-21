import React, { Component } from 'react';
import { render } from 'react-dom';
import AddUser from './components/AddUser.jsx'
import FormExercise from './components/FormExercise.jsx'

function makeRequest(endpoint, payload) {
  
  let body;
  if (endpoint === 'new-user') {
    body = {
      'username': payload.newUser, 
    }
  } else {
    body = {
      'userID': payload.userID,
      'exercise': payload.exercise,
      'duration': payload.duration,
      'date': payload.date,
    }
  }

  const request = new Request('http://localhost:3300/api/exercise/' + endpoint, {
	    method: 'POST', 
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify(body),
    })
  return fetch(request)
    .then( (response) => {
      return response.json();
    })
    .catch( (response) => response)
} 

class App extends Component {
  constructor() {
    super();
    this.state = {
      text: {
        newUser: '',
        userID: '',
        description: '',
        duration: '',
        date: '',
      },
    };

    this.onChange = this.onChange.bind(this);
    this.onKeyPress = this.onKeyPress.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(event, prop) {
    this.setState( 
        {
          text: {... this.state.text, [prop]: event.target.value}
        }
      )
  }

  onKeyPress(event) {
    console.log(event.key)
    if (event.key === 'Enter') {
      this.onSubmit();
    }
  }

  onSubmit(event, endpoint) {
    makeRequest(endpoint, this.state.text).then( data => {
      // console.log(data);
        this.setState( 
          {
            data: data,
          }
        )
    })
  }

  render() {
    return (  
      <div id='container'>
        <AddUser onChange={this.onChange} text={this.state.text.newUser} onSubmit={this.onSubmit} />
        <FormExercise />
      </div>
    )
  }
}

render(<App />, document.getElementById('root'));