import React from 'react'

const AddExercise = (props) => {
  const { onChange, onSubmit, text } = props;

  let submitted = false;

  const styles =
    {
      border: '1px solid red',
    }

  function submit(event) {
    if (text.userID && text.description && text.duration) {
      return onSubmit(event, 'add');
    }
    submitted = true;  
    console.log(submitted)
    
  }

  return (
    <div>
      Add Exercises
      <br/>
      <code>POST /api/exercise/add</code>
      <input style={(submitted && !text.userID) ? styles : {}} type='text' placeholder='userID*' value={text.userID} onChange={(e) => {
        submitted = false
        return onChange(e, 'userID')}} />
      <input style={(submitted && !text.description) ? styles : {}} type='text' placeholder='description*' value={text.description} onChange={(e) => {
        submitted = false;
        return onChange(e, 'description')}} />
      <input style={(submitted && !text.duration) ? styles : {}} type='text' placeholder='duration* (mins.)' value={text.duration} onChange={(e) => {
        submitted = false;
        return onChange(e, 'duration')}} />
      <input type='text' placeholder='date (yyyy-mm-dd)' value={text.date} onChange={(e) => onChange(e, 'date')} />
      {submitted && 'Error'}
      <div className='button' onClick={submit} >Submit</div>
    </div>
  )
}

export default AddExercise
