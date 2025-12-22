import { useState } from 'react'
import CustomInput from '../ui/CustomInput'

export default function CreateAdminForm() {
  // State des champs du formulaire
  const [inputsState, setInputsState] = useState({
    pseudo: '',
    password: '',
    confirmPassword: '',
    role: '',
  })

  // State pour afficher/masquer les messages d'erreur
  const [showValidation, setShowValidation] = useState({
    pseudo: false,
    password: false,
    confirmPassword: false,
    role: false,
  })

  // Options du select de rôles
  const roleOptions = [
    { value: 'visitor', label: 'Visiteur' },
    { value: 'moderator', label: 'Modérateur' },
    { value: 'admin', label: 'Administrateur' },
  ]

  // Validation de tous les champs
  function validationCheck() {
    const areValid = {
      pseudo: false,
      password: false,
      confirmPassword: false,
      role: false,
    }

    // Pseudo : 3-12 caractères
    if (inputsState.pseudo.length < 3 || inputsState.pseudo.length > 12) {
      setShowValidation(prev => ({ ...prev, pseudo: true }))
    } else {
      setShowValidation(prev => ({ ...prev, pseudo: false }))
      areValid.pseudo = true
    }

    // Mot de passe : min 6 caractères + 1 chiffre
    if (inputsState.password.length < 6 || !/\d/.test(inputsState.password)) {
      setShowValidation(prev => ({ ...prev, password: true }))
    } else {
      setShowValidation(prev => ({ ...prev, password: false }))
      areValid.password = true
    }

    // Confirmation : non vide + identique au mot de passe
    if (
      !inputsState.confirmPassword ||
      inputsState.confirmPassword !== inputsState.password
    ) {
      setShowValidation(prev => ({ ...prev, confirmPassword: true }))
    } else {
      setShowValidation(prev => ({ ...prev, confirmPassword: false }))
      areValid.confirmPassword = true
    }

    // Rôle : non vide
    if (!inputsState.role) {
      setShowValidation(prev => ({ ...prev, role: true }))
    } else {
      setShowValidation(prev => ({ ...prev, role: false }))
      areValid.role = true
    }

    // Retourne true si tous les champs sont valides
    return Object.values(areValid).every(val => val)
  }

  // Soumission du formulaire
  async function handleSubmit(e) {
    e.preventDefault()
    if (validationCheck()) {
      try {
        const response = await fetch('/api/admins', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            pseudo: inputsState.pseudo,
            password: inputsState.password,
            role: inputsState.role,
          }),
        })

        if (response.ok) {
          const data = await response.json()
          console.log('Admin créé avec succès: ', data)

          setInputsState({
            pseudo: '',
            password: '',
            confirmPassword: '',
            role: '',
          })
        } else {
          const errorData = await response.json()
          console.error('Erreur lors de la création: ', errorData)
          // AFFICHER MESSAGE DERREUR A LUTILISATEUR
        }
      } catch (error) {
        console.error('Erreur reseau : ', error)
      }
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <p>Ajouter un nouvel administrateur.</p>

        <CustomInput
          type={'text'}
          labelname={'pseudo'}
          name={'Entrez le nom du nouvel administrateur : '}
          state={inputsState.pseudo}
          setState={setInputsState}
        />
        {showValidation.pseudo && (
          <p>Le pseudo doit contenir entre 3 et 12 caractères.</p>
        )}

        <CustomInput
          type={'password'}
          labelname={'password'}
          name={'Entrer votre mot de passe : '}
          state={inputsState.password}
          setState={setInputsState}
        />
        {showValidation.password && (
          <p>
            Le mot de passe doit contenir au minimum 6 caractères et un chiffre.
          </p>
        )}

        <CustomInput
          type={'password'}
          labelname={'confirmPassword'}
          name={'Confirmer le mot de passe : '}
          state={inputsState.confirmPassword}
          setState={setInputsState}
        />
        {showValidation.confirmPassword && (
          <p>Le mot de passe doit être identique.</p>
        )}

        <select
          name="role"
          id="role"
          onChange={e =>
            setInputsState(prev => ({
              ...prev,
              role: e.target.value,
            }))
          }
        >
          <option value="">Veuillez choisir un role</option>
          {roleOptions.map(opt => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        {showValidation.role && <p>Veuillez choisir le role.</p>}

        <button>Valider</button>
      </form>
    </>
  )
}
