import {createContext, useState, useContext} from "react"

const ParameterContext = createContext()
const ParameterContextUpdate = createContext()

export function useParameterContext() {
    return useContext(ParameterContext)
}

export function useParameterContextUpdate() {
    return useContext(ParameterContextUpdate)
}

export default function ParameterProvider(props) {
    const [parameters, setParameters] = useState([])
    const [length, setLength] = useState("4")

    const addParameter = (newParameter) => {
        setParameters(parameters => {
            return [...parameters, newParameter]
        })
    }

    const delParameter = (parameter) => {
        setParameters(parameters => {
            const newParameters = [...parameters]
            // Deleting the parameter from the array.
            const parameterIndex = newParameters.indexOf(parameter)
            newParameters.splice(parameterIndex, 1)
            return newParameters
        })
    }

    const updateLength = (newLength) => {
        setLength(newLength)
    }

    return (
        <ParameterContext.Provider value={{parameters: parameters, length: length}}>
            <ParameterContextUpdate.Provider value={{addParameter, delParameter, updateLength}}>
                {props.children}
            </ParameterContextUpdate.Provider>
        </ParameterContext.Provider>
    )
}