import {createContext, useContext, useState, useEffect} from "react"
import PropTypes from "prop-types"

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

    // Get the buttons from the database.
    useEffect(() => {
        window.database.getAllAccounts().then(accounts => {
            setAccounts(accounts)
        })
    }, [])

    const createAccount = async (newAccount) => {
        // Creating account in the database.
        await window.database.createAccount(newAccount)
        // Setting the account in the state.
        setAccounts(accounts => [...accounts, newAccount])
    }

    const updateAccount = async (index, account) => {
        // Updating the account in the database.
        await window.database.updateAccount(index, account)
        // Updating the account in the state.
        setAccounts(accounts => {
            const newAccounts = [...accounts]
            newAccounts[index] = account
            return newAccounts
        })
    }

    const removeAccount = async (index) => {
        // Deleting the account in the database.
        await window.database.deleteAccount(index)
        // Deleting the account in the state.
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

AccountsProvider.propTypes = {
    children: PropTypes.node
}