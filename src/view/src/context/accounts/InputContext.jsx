import {createContext, useState, useContext, useLayoutEffect} from "react"
import {useAccountsContext} from "./AccountsContext"
import {useIndexContext} from "./IndexContext"

const InputContext = createContext()
const InputContextUpdate = createContext()

export function useInputContext() {
    return useContext(InputContext)
}

export function useInputContextUpdate() {
    return useContext(InputContextUpdate)
}

export default function InputProvider(props) {
    // State
    const [username, setUsername] = useState(props.username)
    const [password, setPassword] = useState(props.password)
    const [website, setWebsite] = useState(props.website)

    // Context
    const index = useIndexContext()
    const accounts = useAccountsContext()
    const account = accounts[index]

    // Updating the inputs when the account is updated.
    // We need to use layout effect to make sure it updates before toggling the editing.
    // This is because this is synchronous as opposed to useEffect which is asynchronous.
    useLayoutEffect(() => {
        setUsername(account.username)
        setWebsite(account.website)
        setPassword(account.password)
    }, [accounts])

    return (
        <InputContext.Provider value={{username: username, password: password, website: website}}>
            <InputContextUpdate.Provider value={{setUsername, setPassword, setWebsite}}>
                {props.children}
            </InputContextUpdate.Provider>
        </InputContext.Provider>
    )
}