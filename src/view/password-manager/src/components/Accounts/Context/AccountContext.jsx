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
    const index = props.index
    const [account, setAccount] = useState({
        website: props.account.website,
        username: props.account.username,
        password: props.account.password
    })

    const updateAccount = (data) => {
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