import {createContext, useContext, useRef} from "react"

const AccountsContext = createContext()
const AccountsContextUpdate = createContext()

export function useAccountsContext() {
    return useContext(AccountsContext)
}

export function useAccountsContextUpdate() {
    return useContext(AccountsContextUpdate)
}

export default function AccountsProvider(props) {
    // Placeholder information
    const myAccounts = [{
        website: "steamcommunity.com",
        username: "username",
        password: "password"
    }, {
        website: "google.com",
        username: "username@gmail.com",
        password: "admin123"
    }]

    const accounts = useRef(myAccounts)

    // I have to make a copy otherwise It doesn't work.
    const createAccount = (data) => {
        accounts.current.push(data)
    }

    const updateAccount = (index, data) => {
        accounts.current[index] = data
    }

    const removeAccount = (index) => {
        accounts.current.splice(index, 1)
    }

    return (
        <AccountsContext.Provider value={accounts.current}>
            <AccountsContextUpdate.Provider value={{createAccount, updateAccount, removeAccount}}>
                {props.children}
            </AccountsContextUpdate.Provider>
        </AccountsContext.Provider>
    )
}
