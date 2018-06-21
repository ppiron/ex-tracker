import React from 'react'

const Input = ({name, isRequired = false, placeholder, change, value, submitted = false}) => {

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
