import React, { Component } from 'react'

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
    this.click = this.click.bind(this);
  }

  onChange(event, prop) {
    this.setState( 
        {
          [prop]: event.target.value,
          submitted: false,
        }
      )
  }

  onSubmit(endpoint) {
    makeRequest(endpoint, this.state).then( data => {
      console.log(data);
    })
  }

  click(event) {
    if (this.state.userID && this.state.description && this.state.duration) {
      return this.onSubmit('add');
    }
    this.setState(
      {
        submitted: true,
      }
    )
      
    console.log(this.state.submitted)
  }

  render() {
    const styles =
    {
      border: '1px solid red',
    }

    return (
      <div>
        Add Exercises
        <br/>
        <code>POST /api/exercise/add</code>
        <input style={(this.state.submitted && !this.state.userID) ? styles : {}} placeholder='userID*'
        type='text' value={this.state.userID} onChange={(e) => this.onChange(e, 'userID')} />
        <input style={(this.state.submitted && !this.state.description) ? styles : {}} placeholder='description*'
        type='text' value={this.state.description} onChange={(e) => this.onChange(e, 'description')} />
        <input style={(this.state.submitted && !this.state.duration) ? styles : {}} placeholder='duration* (mins.)'
        type='text' value={this.state.duration} onChange={(e) => this.onChange(e, 'duration')} />
        <input type='text' value={this.state.date} placeholder='date (yyyy-mm-dd)'
        onChange={(e) => this.onChange(e, 'date')} /> 
        {this.state.submitted && <span className='errorMessage'>Fields marked as * are required</span>}
        <div className='button' onClick={this.click} >Submit</div>
      </div>
    )
  }
}

export default FormExercise
