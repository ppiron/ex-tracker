import React, { Component } from 'react'
import Input from './Input.jsx'
import makeRequest from '../makeRequest.js'

export class AddExerciseForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
        userID: this.props.data.userID,
        description: this.props.data.exercise,
        duration: this.props.data.duration,
        date: this.props.data.date,
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
    return this.state.userID && this.state.description && this.state.duration
  }

  onSubmit(endpoint) {

    this.setState(
      {
        submitted: true,
      }
    , () => {
      console.log(this.formIsValid())
      if (this.formIsValid()) {
        makeRequest(endpoint, this.state).then( data => {
          console.log(data);
          this.props.navigate(endpoint, data);
        })
      }
    })
  }

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
        isRequired={input.isRequired} change={this.onChange} value={this.state[input.name] || ''}/>
      )
    })

    return (
      <div>
        Add Exercises
        <br/>
        <code>POST /api/exercise/add</code>
        {inputFields}
        {(this.state.submitted && !this.formIsValid()) && <span className='.errorMessage'>Fields marked as * are required</ span>}
        <div className='button' onClick={this.onSubmit.bind(this, 'add')} >Submit</div>
      </div>
    )
  }
}

export default AddExerciseForm
