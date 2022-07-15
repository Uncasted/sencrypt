import {createContext, useContext} from "react"
import PropTypes from "prop-types"

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

IndexProvider.propTypes = {
    index: PropTypes.number,
    children: PropTypes.node
}