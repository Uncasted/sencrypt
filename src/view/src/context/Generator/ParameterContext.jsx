import {createContext, useState, useContext} from "react"
import {DEFAULT_LENGTH, DEFAULT_PARAMETERS, GENERATOR_KEY} from "../../data/constants"

const ParameterContext = createContext()
const ParameterContextUpdate = createContext()

export function useParameterContext() {
    return useContext(ParameterContext)
}

export function useParameterContextUpdate() {
    return useContext(ParameterContextUpdate)
}

const getLocalParameters = () => {
    return localStorage.getItem(GENERATOR_KEY) ? JSON.parse(localStorage.getItem(GENERATOR_KEY)) : {}
}

export default function ParameterProvider(props) {
    const savedParameters = getLocalParameters()
    const [parameters, setParameters] = useState(savedParameters?.parameters || DEFAULT_PARAMETERS)
    const [length, setLength] = useState(savedParameters?.length || DEFAULT_LENGTH)

    const addParameter = (newParameter) => {
        setParameters(parameters => {
            const oldParameters = getLocalParameters()
            localStorage.setItem(GENERATOR_KEY, JSON.stringify({
                ...oldParameters,
                parameters: [...(oldParameters.parameters ?? []), newParameter]
            }))

            return [...parameters, newParameter]
        })
    }

    const delParameter = (parameter) => {
        setParameters(parameters => {
            const newParameters = [...parameters]
            // Deleting the parameter from the array.
            const parameterIndex = newParameters.indexOf(parameter)
            newParameters.splice(parameterIndex, 1)

            const oldParameters = getLocalParameters()
            localStorage.setItem(GENERATOR_KEY, JSON.stringify({
                ...oldParameters,
                parameters: [...newParameters]
            }))

            return newParameters
        })
    }

    const updateLength = (newLength) => {
        setLength(newLength)
        const oldParameters = getLocalParameters()
        localStorage.setItem(GENERATOR_KEY, JSON.stringify({
            ...oldParameters,
            length: newLength
        }))
    }

    return (
        <ParameterContext.Provider value={{parameters: parameters, length: length}}>
            <ParameterContextUpdate.Provider value={{addParameter, delParameter, updateLength}}>
                {props.children}
            </ParameterContextUpdate.Provider>
        </ParameterContext.Provider>
    )
}