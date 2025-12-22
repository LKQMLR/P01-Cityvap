import React from 'react'

export default function CustomInput({
  type,
  name,
  labelname,
  state,
  setState,
}) {
  function handleInput(e) {
    setState(prevState => ({
      ...prevState,
      [labelname]: e.target.value,
    }))
  }

  return (
    <div>
      <label htmlFor={labelname}>{name}</label>
      <input
        type={type}
        id={labelname}
        name={labelname}
        value={state}
        onChange={e => handleInput(e)}
      />
    </div>
  )
}
