import {createContext, useState, useEffect, useContext} from "react"
import {useParameterContext} from "./ParameterContext"

const PasswordContext = createContext()
const PasswordContextUpdate = createContext()

export function usePasswordContext() {
    return useContext(PasswordContext)
}

export function usePasswordContextUpdate() {
    return useContext(PasswordContextUpdate)
}

export default function PasswordProvider(props) {
    // State
    const [password, setPassword] = useState("")

    // Context
    const {parameters, length} = useParameterContext()

    // Run generatePassword when the component gets mounted for the first time.
    // Otherwise, get the last generated password from localStorage.
    useEffect(() => {
        const localGeneratedPass = window.localStorage.getItem("lastGenPass") ?? ""
        if (localGeneratedPass) {
            setPassword(localGeneratedPass)
        } else {
            updatePassword(parameters, length)
        }
    }, [])

    const updatePassword = (parameters, length) => {
        const generatedPass = window.utility.generateRandomPassword(parameters, length)
        setPassword(generatedPass)
        // Save the last generated password in localStorage.
        window.localStorage.setItem("lastGenPass", generatedPass)
    }


    return (
        <PasswordContext.Provider value={password}>
            <PasswordContextUpdate.Provider value={updatePassword}>
                {props.children}
            </PasswordContextUpdate.Provider>
        </PasswordContext.Provider>
    )
}