import { createContext, useState, useContext } from "react"
import PropTypes from "prop-types"

const EditContext = createContext()
const EditContextUpdate = createContext()

export function useEditContext() {
  return useContext(EditContext)
}

export function useEditContextUpdate() {
  return useContext(EditContextUpdate)
}

export default function EditProvider(props) {
  // To make them disabled by default we have to start with true.
  const [isEditable, setIsEditable] = useState(true)

  const toggleEditing = () => {
    // Toggle the edit mode.
    setIsEditable(prevIsEditable => !prevIsEditable)
  }

  return (
    <EditContext.Provider value={isEditable}>
      <EditContextUpdate.Provider value={toggleEditing}>
        {props.children}
      </EditContextUpdate.Provider>
    </EditContext.Provider>
  )
}

EditProvider.propTypes = {
  children: PropTypes.node,
}
