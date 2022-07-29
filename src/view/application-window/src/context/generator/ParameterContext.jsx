import { createContext, useState, useContext } from 'react'
import {
  DEFAULT_LENGTH,
  DEFAULT_PARAMETERS,
  GENERATOR_KEY
} from '../../data/constants'
import { getLocalParameters } from '../../utils/utility'
import PropTypes from 'prop-types'

const ParameterContext = createContext()
const ParameterContextUpdate = createContext()

export function useParameterContext () {
  return useContext(ParameterContext)
}

export function useParameterContextUpdate () {
  return useContext(ParameterContextUpdate)
}

export default function ParameterProvider (props) {
  const savedParameters = getLocalParameters()
  const [parameters, setParameters] = useState(
    savedParameters.parameters || DEFAULT_PARAMETERS
  )
  const [length, setLength] = useState(savedParameters.length || DEFAULT_LENGTH)

  const addParameter = newParameter => {
    setParameters(parameters => {
      const localParameters = getLocalParameters()
      // Saving the parameter in localStorage.
      localParameters.parameters = [
        ...(localParameters.parameters ?? []),
        newParameter
      ]
      window.localStorage.setItem(GENERATOR_KEY, JSON.stringify(localParameters))

      return [...parameters, newParameter]
    })
  }

  const delParameter = parameter => {
    setParameters(parameters => {
      const newParameters = [...parameters]
      // Deleting the parameter from the array.
      const parameterIndex = newParameters.indexOf(parameter)
      newParameters.splice(parameterIndex, 1)
      // Deleting the parameter from localStorage.
      const localParameters = getLocalParameters()
      localParameters.parameters = [...newParameters]
      window.localStorage.setItem(GENERATOR_KEY, JSON.stringify(localParameters))

      return newParameters
    })
  }

  const updateLength = newLength => {
    // Update length.
    setLength(() => newLength)
    // Update length in local storage.
    const localParameters = getLocalParameters()
    localParameters.length = newLength
    window.localStorage.setItem(GENERATOR_KEY, JSON.stringify(localParameters))
  }

  return (
    <ParameterContext.Provider value={{ parameters, length }}>
      <ParameterContextUpdate.Provider
        value={{ addParameter, delParameter, updateLength }}
      >
        {props.children}
      </ParameterContextUpdate.Provider>
    </ParameterContext.Provider>
  )
}

ParameterProvider.propTypes = {
  children: PropTypes.node
}
