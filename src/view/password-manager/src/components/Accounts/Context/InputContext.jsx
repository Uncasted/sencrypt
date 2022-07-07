import {createContext, useState, useContext} from "react"

const InputContext = createContext()
const InputContextUpdate = createContext()

export function useInputContext() {
    return useContext(InputContext)
}

export function useInputContextUpdate() {
    return useContext(InputContextUpdate)
}

export default function InputProvider(props) {
    const [username, setUsername] = useState(props.username)
    const [password, setPassword] = useState(props.password)
    const [website, setWebsite] = useState(props.website)

    return (
        <InputContext.Provider value={{username: username, password: password, website: website}}>
            <InputContextUpdate.Provider value={{setUsername, setPassword, setWebsite}}>
                {props.children}
            </InputContextUpdate.Provider>
        </InputContext.Provider>
    )
}