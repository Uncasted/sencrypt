import { createContext, useState, useContext } from 'react'
import PropTypes from 'prop-types'

const PasswordListContext = createContext()
const PasswordListContextUpdate = createContext()

export function usePasswordListContext () {
  return useContext(PasswordListContext)
}

export function usePasswordListContextUpdate () {
  return useContext(PasswordListContextUpdate)
}

export default function PasswordListProvider (props) {
  const [passwords, setPasswords] = useState(JSON.parse(localStorage.getItem('generatedPasswords')) ?? [])

  const addPassword = (password) => {
    setPasswords(prevList => {
      const newList = [...prevList]
      // If the list is longer than 10. Remove the first password.
      if (passwords.length > 9) {
        newList.shift()
      }
      // Pushing the new password.
      newList.push(password)
      // Saving to localStorage.
      localStorage.setItem('generatedPasswords', JSON.stringify(newList))
      return newList
    })
  }

  return (
    <PasswordListContext.Provider value={passwords}>
      <PasswordListContextUpdate.Provider value={addPassword}>
        {props.children}
      </PasswordListContextUpdate.Provider>
    </PasswordListContext.Provider>
  )
}

PasswordListContext.propTypes = {
  children: PropTypes.node
}
