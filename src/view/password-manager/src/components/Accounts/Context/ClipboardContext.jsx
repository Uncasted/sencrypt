import {createContext, useState, useContext} from "react"

const COPY_CLIPBOARD = "Copy to clipboard."
const COPY_PASSWORD = "Copy Password."
const COPIED = "Copied!"

const ClipboardContext = createContext()
const ClipboardContextUpdate = createContext()

export function useClipboardContext() {
    return useContext(ClipboardContext)
}

export function useClipboardContextUpdate() {
    return useContext(ClipboardContextUpdate)
}

export default function ClipboardProvider(props) {

    const [titleClipboard, setTitleClipboard] = useState(COPY_PASSWORD)
    const [userClipboard, setUserClipboard] = useState(COPY_CLIPBOARD)
    const [passClipboard, setPassClipboard] = useState(COPY_CLIPBOARD)

    const addToClipboard = (type, data) => {
        // By doing this we can set the state on either tooltip with one function.
        navigator.clipboard.writeText(data).then()
        switch (type) {
            case 'title':
                setTitleClipboard(COPIED)
                setTimeout(() => {
                    setTitleClipboard(COPY_PASSWORD)
                }, 2000)
                break
            case 'username':
                setUserClipboard(COPIED)
                setTimeout(() => {
                    setUserClipboard(COPY_CLIPBOARD)
                }, 2000)
                break
            case 'password':
                setPassClipboard(COPIED)
                setTimeout(() => {
                    setPassClipboard(COPY_CLIPBOARD)
                }, 2000)
        }
    }

    return (
        <ClipboardContext.Provider value={{title: titleClipboard, username: userClipboard, password: passClipboard}}>
            <ClipboardContextUpdate.Provider value={addToClipboard}>
                {props.children}
            </ClipboardContextUpdate.Provider>
        </ClipboardContext.Provider>
    )
}