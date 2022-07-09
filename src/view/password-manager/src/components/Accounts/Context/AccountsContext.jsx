import {createContext, useContext, useState, useEffect} from "react"

const AccountsContext = createContext()
const AccountsContextUpdate = createContext()

export function useAccountsContext() {
    return useContext(AccountsContext)
}

export function useAccountsContextUpdate() {
    return useContext(AccountsContextUpdate)
}

export default function AccountsProvider(props) {
    const [accounts, setAccounts] = useState([])

    // Get the accounts from the database.
    useEffect(() => {
        window.controller.getAllAccounts().then(accounts => setAccounts(accounts))
    }, [])

    const createAccount = async (data) => {
        // Creating account in the database.
        await window.controller.createAccount(data)

        setAccounts(accounts => {
            return [...accounts, data]
        })
    }

    const updateAccount = (index, data) => {
        setAccounts(accounts => {
            const newAccounts = [...accounts]
            newAccounts[index] = data
            return newAccounts
        })
    }

    const removeAccount = async (index) => {
        // Deleting the account in the database.
        await window.controller.deleteAccount(index)

        setAccounts(accounts => {
            const newAccounts = [...accounts]
            newAccounts.splice(index, 1)
            return newAccounts
        })
    }

    return (
        <AccountsContext.Provider value={accounts}>
            <AccountsContextUpdate.Provider value={{createAccount, updateAccount, removeAccount}}>
                {props.children}
            </AccountsContextUpdate.Provider>
        </AccountsContext.Provider>
    )
}
