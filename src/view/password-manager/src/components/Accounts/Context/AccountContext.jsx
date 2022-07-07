import {createContext, useContext, useState} from "react"

const AccountContext = createContext()
const AccountContextUpdate = createContext()

export function useAccountContext() {
    return useContext(AccountContext)
}

export function useAccountContextUpdate() {
    return useContext(AccountContextUpdate)
}

export default function AccountProvider(props) {
    const [account, setAccount] = useState({
        website: props.account.website,
        username: props.account.username,
        password: props.account.password
    })
    const index = props.index

    const updateAccount = async (data) => {
        // Updating the account in the database.
        await window.controller.updateAccount(account.username, account.website, data)
        // Setting the state locally.
        setAccount(data)
    }

    return (
        <AccountContext.Provider value={{index: index, account: account}}>
            <AccountContextUpdate.Provider value={updateAccount}>
                {props.children}
            </AccountContextUpdate.Provider>
        </AccountContext.Provider>
    )
}