import {createContext, useState, useContext, useEffect} from "react"

const ParameterContext = createContext()
const ParameterContextUpdate = createContext()

export function useParameterContext() {
    return useContext(ParameterContext)
}

export function useParameterContextUpdate() {
    return useContext(ParameterContextUpdate)
}

export default function ParameterProvider(props) {
    const [parameters, setParameters] = useState(["UPPERCASE", "LOWERCASE", "NUMBERS"])
    const [length, setLength] = useState("16")

    useEffect(() => {
        // Checkboxes
        const localLower = window.localStorage.getItem("useLower")
        const localUpper = window.localStorage.getItem("useUpper")
        const localNumbers = window.localStorage.getItem("useNumbers")
        const localSymbols = window.localStorage.getItem("useSymbols")

        // Length.
        const localLength = window.localStorage.getItem("passLength")
        // Use the default value if there's no length in localStorage.
        if (localLength !== null) {
            updateLength(localLength)
        }

        // Using values for the parameters from localStorage if they exist.
        if (localLower !== null) {
            if (localLower) {
                addParameter("LOWERCASE")
            } else {
                delParameter("LOWERCASE")
            }
        }
        if (localUpper !== null) {
            if (localUpper) {
                addParameter("UPPERCASE")
            } else {
                delParameter("UPPERCASE")
            }
        }
        if (localNumbers !== null) {
            if (localNumbers) {
                addParameter("NUMBERS")
            } else {
                delParameter("NUMBERS")
            }
        }
        if (localSymbols !== null) {
            if (localSymbols) {
                addParameter("SYMBOLS")
            } else {
                delParameter("SYMBOLS")
            }
        }

    }, [])

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