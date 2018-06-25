import React, { Component } from 'react'
import Input from './Input.jsx'

export class AddExerciseForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
        userID: '',
        exercise: '',
        duration: '',
        date: '',
        valid: false,
        invalid: false,
    };

    this.onChange = this.onChange.bind(this);
    this.onInvalid = this.onInvalid.bind(this);
    this.formIsValid = this.formIsValid.bind(this);
  }

  onChange(event, name) {
    this.setState( 
        {
          [name]: event.target.value,
        }
      , this.formIsValid())
  }

  onInvalid(event) {
    this.setState(
      {
        invalid: true,
      }
    )
  }

  formIsValid() {
    this.setState(
      {
        valid: this.state.userID !== '' && this.state.exercise !== '' && this.state.duration !== ''

      }
    )
  }

  render() {
    
    const inputs = [
      {name: 'userID', isRequired: true, placeholder: 'userID*'},
      {name: 'exercise', isRequired: true, placeholder: 'description*'},
      {name: 'duration', isRequired: true, placeholder: 'duration* (mins.)'},
      {name: 'date', isRequired: false, placeholder: 'date (yyyy-mm-dd)'},
    ]

    const inputFields = inputs.map( input => {
      return (
        <Input key={input.name} name={input.name} placeholder={input.placeholder} invalid={this.state.invalid}
        isRequired={input.isRequired} change={this.onChange} value={this.state[input.name] || ''}/>
      )
    })

    return (
      <div>
        Add Exercises
        <br/>
        <code>POST /api/exercise/add</code>
        <form action='/api/exercise/add' method='post' onInvalid={this.onInvalid}>
          {inputFields}
          {(!this.state.valid && this.state.invalid) && <p className='errorMessage'>Fields marked as * are required</ p>}
          <button type='submit' className='button'>Submit</button>
        </form>
      </div>
    )
  }
}

export default AddExerciseForm
