import React from 'react'

const AddUser = (props) => {

  const { onChange, onSubmit, text } = props;

  return (
    <div>
      Create a New User
      <br/>
      <code>POST /api/exercise/new-user</code>
      <input type='text' placeholder='username' value={text} onChange={ (e) => onChange(e, 'newUser')} />
      <div className='button' onClick={ (e) => onSubmit(e, 'new-user')} >Submit</div>
    </div>
  )
}

export default AddUser
