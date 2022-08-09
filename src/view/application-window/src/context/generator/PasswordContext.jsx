import { createContext, useState, useEffect, useContext } from 'react'
import {
  DEFAULT_LENGTH,
  DEFAULT_PARAMETERS,
  LAST_GEN_PASS_KEY
} from '../../data/constants'
import PropTypes from 'prop-types'
import { usePasswordListContextUpdate } from './PasswordListContext'

const PasswordContext = createContext()
const PasswordContextUpdate = createContext()

export function usePasswordContext () {
  return useContext(PasswordContext)
}

export function usePasswordContextUpdate () {
  return useContext(PasswordContextUpdate)
}

export default function PasswordProvider (props) {
  // State
  const [password, setPassword] = useState('')

  // Context
  const addPassword = usePasswordListContextUpdate()

  // Run generatePassword when the component gets mounted for the first time.
  // Otherwise, get the last generated password from localStorage.
  useEffect(() => {
    const localGeneratedPass =
      window.localStorage.getItem(LAST_GEN_PASS_KEY) ?? ''
    if (localGeneratedPass) {
      setPassword(() => localGeneratedPass)
    } else {
      updatePassword(DEFAULT_PARAMETERS, DEFAULT_LENGTH)
    }
  }, [])

  const updatePassword = (parameters, length) => {
    const generatedPass = window.utility.generateRandomPassword(
      parameters,
      length
    )
    setPassword(() => generatedPass)
    // Save the last generated password in localStorage.
    window.localStorage.setItem(LAST_GEN_PASS_KEY, generatedPass)
    // Add the password to the password history.
    addPassword(generatedPass)
  }

  return (
    <PasswordContext.Provider value={password}>
      <PasswordContextUpdate.Provider value={updatePassword}>
        {props.children}
      </PasswordContextUpdate.Provider>
    </PasswordContext.Provider>
  )
}

PasswordProvider.propTypes = {
  children: PropTypes.node
}
