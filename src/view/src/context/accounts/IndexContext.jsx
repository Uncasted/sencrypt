import {createContext, useContext} from "react"

const IndexContext = createContext()

export function useIndexContext() {
    return useContext(IndexContext)
}

export default function IndexProvider(props) {
    // Context for the account index.
    const index = props.index

    return (
        <IndexContext.Provider value={index}>
            {props.children}
        </IndexContext.Provider>
    )
}