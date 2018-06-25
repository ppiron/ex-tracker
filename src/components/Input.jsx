import React from 'react'

const Input = ({name, isRequired = false, placeholder, change, value, invalid = false}) => {

  return (
    <div>
      <input className={(isRequired && invalid && value === '') ? 'invalid' : ''} type="text" name={name} placeholder={placeholder} 
      onChange={(e) => change(e, name)} value={value} required={isRequired}/>
    </div>
  )
}

export default Input
