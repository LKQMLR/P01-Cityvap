import { useState } from 'react'

export default function CreateAdminForm() {
  const [state, setState] = useState('')

  function handleInput(e) {
    setState(e.target.value)
  }

  return (
    <>
      <form action="">
        <label htmlFor="name">Nom de l'administrateur : </label>

        <input type="text" id="name" value={state} onChange={handleInput} />

        <button>Valider</button>
      </form>
      <p>Votre state : {state} </p>
    </>
  )
}
