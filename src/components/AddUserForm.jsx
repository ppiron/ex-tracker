import React, { Component } from 'react'
import Input from './Input.jsx'

export class AddUserForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
        username: '',
    };

    this.onChange = this.onChange.bind(this);
  }

  onChange(event, name) {
    this.setState( 
        {
          [name]: event.target.value,
        }
      )
  }
  componentWillUnmount() {
    console.log('unmounting') ;
    window.sessionStorage.setItem('username', this.state.username);

  }
 
  render() {
    
    return (
      <div>
        Create a New User
        <br/>
        <code>POST /api/exercise/new-user</code>
        <form action='/api/exercise/new-user' method='post' >
          <Input name='username' placeholder='username' value={this.state.username || ''} change={this.onChange} />
          <button type='submit' className='button'>Submit</button>
        </form>
      </div>
    )
  }

}

export default AddUserForm
