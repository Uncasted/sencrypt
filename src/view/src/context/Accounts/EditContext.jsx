import {createContext, useState, useContext} from "react"

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
        setIsEditable(!isEditable)
    }

    return (
        <EditContext.Provider value={isEditable}>
            <EditContextUpdate.Provider value={toggleEditing}>
                {props.children}
            </EditContextUpdate.Provider>
        </EditContext.Provider>
    )
}