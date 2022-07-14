import {createContext, useContext, useId} from "react"

const IDContext = createContext()

export function useIDContext() {
    return useContext(IDContext)
}

export default function IDProvider(props) {
    // Unique identifiers for each account.
    const accountIDs = {
        websiteID: useId(),
        usernameID: useId(),
        passwordID: useId(),
        editFormID: useId()
    }

    return (
        <IDContext.Provider value={accountIDs}>
            {props.children}
        </IDContext.Provider>
    )
}