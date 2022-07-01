import {createContext, useState, useContext} from "react"

const ClipboardContext = createContext()
const ClipboardContextUpdate = createContext()

export function useClipboardContext() {
    return useContext(ClipboardContext)
}

export function useClipboardContextUpdate() {
    return useContext(ClipboardContextUpdate)
}

export default function ClipboardProvider(props) {
    const [passClipboard, setPassClipboard] = useState("Copy Password.")
    const [clipboard, setClipboard] = useState("Copy to clipboard.")

    const addToClipboard = (data) => {
        // By doing this we can set the state on either tooltip with one function.
        setPassClipboard("Copied!")
        setClipboard("Copied!")
        navigator.clipboard.writeText(data).then()
    }


    // Change clipboard text when the mouse stops hovering over it.
    const onTooltipOut = () => {
        setTimeout(() => {
            setClipboard("Copy to clipboard.")
            setPassClipboard("Copy Password.")
        }, 250)
    }

    return (
        <ClipboardContext.Provider value={{pass: passClipboard, any: clipboard}}>
            <ClipboardContextUpdate.Provider value={{addToClipboard, onTooltipOut}}>
                {props.children}
            </ClipboardContextUpdate.Provider>
        </ClipboardContext.Provider>
    )
}