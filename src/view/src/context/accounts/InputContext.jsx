import { createContext, useState, useContext, useLayoutEffect } from 'react'
import { useAccountsContext } from './AccountsContext'
import { useIndexContext } from './IndexContext'
import PropTypes from 'prop-types'

const InputContext = createContext()
const InputContextUpdate = createContext()

export function useInputContext () {
  return useContext(InputContext)
}

export function useInputContextUpdate () {
  return useContext(InputContextUpdate)
}

export default function InputProvider (props) {
  // State
  const [inputs, setInputs] = useState({
    username: props.username,
    website: props.website,
    password: props.password
  })

  // Context
  const index = useIndexContext()
  const accounts = useAccountsContext()
  const account = accounts[index]

  // Updating the inputs when the account is updated.
  // We need to use layout effect to make sure it updates before toggling the editing.
  // This is because this is synchronous as opposed to useEffect which is asynchronous.
  useLayoutEffect(() => {
    setInputs(() => account)
  }, [accounts])

  const updateInput = (field, text) => {
    setInputs(prevInputs => {
      const newInputs = { ...prevInputs }
      newInputs[field] = text
      return newInputs
    })
  }

  return (
    <InputContext.Provider value={inputs}>
      <InputContextUpdate.Provider value={{ setInputs, updateInput }}>
        {props.children}
      </InputContextUpdate.Provider>
    </InputContext.Provider>
  )
}

InputProvider.propTypes = {
  username: PropTypes.string,
  website: PropTypes.string,
  password: PropTypes.string,
  children: PropTypes.node
}
