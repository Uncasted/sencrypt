import { createContext, useContext, useId } from "react"
import PropTypes from "prop-types"

const IdContext = createContext()

export function useIdContext() {
  return useContext(IdContext)
}

export default function IdProvider(props) {
  // Unique identifiers for each account.
  const accountIds = {
    websiteId: useId(),
    usernameId: useId(),
    passwordId: useId(),
    editFormId: useId(),
  }

  return (
    <IdContext.Provider value={accountIds}>{props.children}</IdContext.Provider>
  )
}

IdProvider.propTypes = {
  children: PropTypes.node,
}
