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

    const removeAccount = async (index) => {
        const account = accounts[index]
        // Deleting the account in the database.
        await window.controller.deleteAccount(account.username, account.website)

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
