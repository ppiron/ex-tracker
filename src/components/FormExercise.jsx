import React, { Component } from 'react'
import Input from './Input.jsx'

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

  const request = new Request('http://localhost:3000/api/' + endpoint, {
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

export class FormExercise extends Component {
  constructor(props) {
    super(props);
    this.state = {
        userID: '',
        description: '',
        duration: '',
        date: '',
        submitted: false,
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.formIsValid = this.formIsValid.bind(this);
  }

  onChange(event, name) {
    this.setState( 
        {
          [name]: event.target.value,
        }
      )
  }

  formIsValid() {
    return this.userID && this.description && this.duration
  }

  onSubmit(endpoint) {

    this.setState(
      {
        submitted: true,
      }
    , () => {
      if (this.formIsValid()) {
        makeRequest(endpoint, this.state).then( data => {
          console.log(data);
        })
      }
    })
  }

  // click(event) {
    
  // }

  render() {
    
    const inputs = [
      {name: 'userID', isRequired: true, placeholder: 'userID*'},
      {name: 'description', isRequired: true, placeholder: 'description*'},
      {name: 'duration', isRequired: true, placeholder: 'duration* (mins.)'},
      {name: 'date', isRequired: false, placeholder: 'date (yyyy-mm-dd)'},
    ]

    const inputFields = inputs.map( input => {
      return (
        <Input key={input.name} name={input.name} placeholder={input.placeholder} submitted={this.state.submitted}
        isRequired={input.isRequired} change={this.onChange} value={this.state[input.name]}/>
      )
    })

    return (
      <div>
        Add Exercises
        <br/>
        <code>POST /api/exercise/add</code>
        {inputFields}
        <div className='button' onClick={this.onSubmit.bind(this, 'add')} >Submit</div>
      </div>
    )
  }
}

export default FormExercise
