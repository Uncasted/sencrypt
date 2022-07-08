import {useState} from "react"
import {useIDContext} from "./Context/IDContext"
import {useEditContext} from "./Context/EditContext"
import {useInputContext, useInputContextUpdate} from "./Context/InputContext"
import {useAccountContext} from "./Context/AccountContext"
import {useClipboardContext, useClipboardContextUpdate} from "./Context/ClipboardContext"
import {images} from "../../App"

export function Website(props) {
    // Context
    const websiteID = useIDContext().websiteID
    const isEditable = useEditContext()
    const input = useInputContext().website
    const setInput = useInputContextUpdate().setWebsite
    const index = useAccountContext().index

    return (
        <label htmlFor={websiteID}
               className="space-y-1">
            <p className="text-md">
                Website/Service:
            </p>
            <input type="text"
                   id={websiteID}
                   name="website"
                   value={input}
                   tabIndex={props.showContent ? 20 : -1}
                   disabled={isEditable}
                   data-outline={`account-${index}`}
                   onChange={event => {
                       props.removeWarning()
                       setInput(event.target.value)
                   }}
                   onClick={props.removeWarning}
                   className="pl-2 rounded-sm h-8 border-dark-blue-4 disabled:text-dark-blue-5
                   disabled:cursor-not-allowed transition bg-dark-blue-6 text-white focus:outline-none outline-2
                   outline-red-500 focus:ring focus:ring-blue-1"
            />
        </label>
    )
}

export function Username(props) {
    // Context
    const usernameID = useIDContext().usernameID
    const isEditable = useEditContext()
    const userClipboard = useClipboardContext().username
    const addToClipboard = useClipboardContextUpdate()
    const input = useInputContext().username
    const setInput = useInputContextUpdate().setUsername
    const index = useAccountContext().index


    return (
        <label htmlFor={usernameID}
               className="space-y-1">
            <p className="text-md">
                Username:
            </p>
            <div className="flex space-x-2">
                <input type="text"
                       id={usernameID}
                       name="username"
                       value={input}
                       tabIndex={props.showContent ? 21 : -1}
                       disabled={isEditable}
                       data-outline={`account-${index}`}
                       onChange={event => {
                           props.removeWarning()
                           setInput(event.target.value)
                       }}
                       onClick={props.removeWarning}
                       className="pl-2 rounded-sm h-8 border-dark-blue-4 disabled:text-dark-blue-5
                       disabled:cursor-not-allowed transition bg-dark-blue-6 text-white focus:outline-none outline-2
                       outline-red-500 focus:ring focus:ring-blue-1"
                />
                <button type="button"
                        data-tip={userClipboard}
                        tabIndex={props.showContent ? 24 : -1}
                        onFocus={(event) => {
                            event.target.classList.add("tooltip-open")
                        }}
                        onBlur={(event) => {
                            event.target.classList.remove("tooltip-open")
                        }}
                        onClick={() => {
                            addToClipboard('username', input)
                        }}
                        className="px-1 py-1 tooltip tooltip-right tooltip-bg focus:outline-gray-200">
                    <img src={images.clipboardIcon}
                         alt="Copy username to clipboard."/>
                </button>
            </div>
        </label>
    )
}

export function Password(props) {
    // Context
    const passwordID = useIDContext().passwordID
    const isEditable = useEditContext()
    const passClipboard = useClipboardContext().password
    const addToClipboard = useClipboardContextUpdate()
    const input = useInputContext().password
    const setInput = useInputContextUpdate().setPassword
    const index = useAccountContext().index

    // State
    const [showPassword, setShowPassword] = useState("password")
    const [passwordIcon, setPasswordIcon] = useState(images.hidePasswordIcon)

    const passwordVisibility = () => {
        // Change the password to type text so the user can see it.
        setShowPassword(showPassword === "password" ? "text" : "password")
        setPasswordIcon(passwordIcon === images.hidePasswordIcon ? images.showPasswordIcon
            : images.hidePasswordIcon)
    }

    return (
        <label htmlFor={passwordID}
               className="space-y-1">
            <p className="text-md">
                Password:
            </p>
            <div className="flex space-x-2">
                <input type={showPassword}
                       id={passwordID}
                       name="password"
                       value={input}
                       tabIndex={props.showContent ? 22 : -1}
                       disabled={isEditable}
                       data-outline={`account-${index}`}
                       onChange={event => {
                           props.removeWarning()
                           setInput(event.target.value)
                       }}
                       onClick={props.removeWarning}
                       className="pl-2 rounded-sm h-8 border-dark-blue-4 disabled:text-dark-blue-5
                       disabled:cursor-not-allowed transition bg-dark-blue-6 text-white focus:outline-none outline-2
                       outline-red-500 focus:ring focus:ring-blue-1"
                       required/>
                <button type="button"
                        tabIndex={props.showContent ? 25 : -1}
                        onClick={passwordVisibility}
                        className="px-1 py-1 focus:outline-gray-200">
                    <img src={passwordIcon}
                         alt="Show/hide password."/>
                </button>
                <button type="button"
                        data-tip={passClipboard}
                        tabIndex={props.showContent ? 26 : -1}
                        onFocus={(event) => {
                            event.target.classList.add("tooltip-open")
                        }}
                        onBlur={(event) => {
                            event.target.classList.remove("tooltip-open")
                        }}
                        onClick={() => {
                            addToClipboard('password', input)
                        }}
                        className=" px-1 py-1 tooltip tooltip-right tooltip-bg focus:outline-gray-200">
                    <img src={images.clipboardIcon}
                         alt="Copy password to clipboard."/>
                </button>
            </div>
        </label>
    )
}

export function EditButton(props) {

    return (
        <button type="button"
                tabIndex={props.showContent ? 27 : -1}
                onClick={props.toggleMode}
                className="bg-blue-3 text-white px-4 py-2 hover:bg-green-500 active:bg-green-600 shadow-md transition
                focus:outline-gray-200 h-10 mb-4">
            {props.buttonText}
        </button>
    )
}

export function SaveButton(props) {
    // Context
    const editFormID = useIDContext().editFormID
    const isEditable = useEditContext()
    const input = useInputContext()

    return (
        <button type="submit"
                form={editFormID}
                tabIndex={props.showContent ? 28 : -1}
                disabled={isEditable || (!input.username || !input.password || !input.website)}
                className="bg-blue-3 text-white px-4 py-2 hover:bg-green-500 active:bg-green-600 shadow-md
                transition disabled:text-gray-300 disabled:bg-dark-blue-4 disabled:cursor-not-allowed
                focus:outline-gray-200">
            Save Changes
        </button>
    )
}

export function DeleteButton(props) {
    // Context
    const index = useAccountContext().index

    const deleteWarning = () => {
        // Click on the label to show the warning.
        const warning = document.getElementById(`delete-warn-${index}`)
        warning.click()
        // Focus the "delete modal".
        const delModal = document.getElementById(`delete-box-${index}`)
        delModal.focus()
    }

    return (
        <>
            <label htmlFor={`delete-modal-${index}`}
                   id={`delete-warn-${index}`}
                   className="hidden">
            </label>
            <button tabIndex={props.showContent ? 29 : -1}
                    onClick={deleteWarning}
                    className="bg-blue-3 text-white px-4 py-2 hover:bg-red-500 active:bg-red-600 shadow-md
                    transition hover:cursor-pointer focus:outline-gray-200">
                Delete Account
            </button>
        </>
    )
}
