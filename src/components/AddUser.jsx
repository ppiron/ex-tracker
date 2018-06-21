import React, { Component } from 'react'
import Input from './Input.jsx'

export class AddUser extends Component {

  constructor(props) {
    super(props);
    this.state = {
        username: '',
        submitted: false,
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(event, name) {
    this.setState( 
        {
          [name]: event.target.value,
        }
      )
  }
  
  onSubmit(endpoint) {

    this.setState(
      {
        submitted: true,
      }
      , () => {
        makeRequest(endpoint, this.state).then( data => {
          console.log(data);
        })
    })
  }

  render() {
    
    return (
      <div>
        Create a New User
        <br/>
        <code>POST /api/exercise/new-user</code>
        <Input name='username' placeholder='username' value={this.state.username} change={this.onChange} />
        <div className='button' onClick={this.onSubmit.bind(this, 'new-user')}>Submit</div>
      </div>
    )
  }

}

export default AddUser
