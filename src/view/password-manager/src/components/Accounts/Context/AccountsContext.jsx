import {createContext, useContext, useState} from "react"

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

    const [accounts, setAccounts] = useState(myAccounts)

    // I have to make a copy otherwise It doesn't work.
    const createAccount = (data) => {
        setAccounts(accounts => {
            return [...accounts, data]
        })
    }

    const removeAccount = (index) => {
        setAccounts(accounts => {
            const newAccounts = [...accounts]
            newAccounts.splice(index, 1)
            return newAccounts
        })
    }

    return (
        <AccountsContext.Provider value={accounts}>
            <AccountsContextUpdate.Provider value={{createAccount, removeAccount}}>
                {props.children}
            </AccountsContextUpdate.Provider>
        </AccountsContext.Provider>
    )
}
