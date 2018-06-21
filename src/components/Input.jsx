import React from 'react'

const Input = ({name, isRequired, placeholder, change, value, submitted}) => {

  const isValid = submitted ? (isRequired ? value !== '' : true) : true

  const styles = {
    border: '1px solid red'
  }

  return (
    <div>
      <input style={!isValid ? styles : {}} type="text" name={name} placeholder={placeholder} 
      onChange={(e) => change(e, name)} value={value} />
    </div>
  )
}

export default Input
