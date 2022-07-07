import {useState} from "react"
import {DeleteAccountModal} from "./DeleteAccount"
import {useAccountContext, useAccountContextUpdate} from "./Context/AccountContext"
import IDProvider, {useIDContext} from "./Context/IDContext"
import EditProvider, {useEditContext, useEditContextUpdate} from "./Context/EditContext"
import {useClipboardContext, useClipboardContextUpdate} from "./Context/ClipboardContext"
import {HOSTNAME_REGEX, images} from "../../App"
import InputProvider, {useInputContext, useInputContextUpdate} from "./Context/InputContext"

export function AccountInfo() {
    // Collapsible state.
    const [open, setOpen] = useState(false)
    const [showContent, setShowContent] = useState(false)

    const toggleCollapsible = () => {
        setOpen(!open)
        setShowContent(!showContent)
    }

    // Context
    const account = useAccountContext().account
    const titleClipboard = useClipboardContext().title
    const addToClipboard = useClipboardContextUpdate()


    return (
        <div>
            <IDProvider>
                <div className="shadow-total bg-dark-blue-0 text-white">
                    <div className="absolute right-14 mt-1">
                        <button className="px-1 py-1 tooltip tooltip-left tooltip-bg"
                                onClick={() => {
                                    addToClipboard('title', account.password)
                                }}
                                onMouseOut=""
                                data-tip={titleClipboard}
                                tabIndex="-1"><img
                            src={images.clipboardIcon}
                        /></button>
                    </div>
                    <div>
                        <div className="title cursor-pointer" onClick={toggleCollapsible}>
                            <CollapsibleTitle isOpen={open}/>
                        </div>
                        <div className={showContent ? "content show" : "content"}>
                            <InputProvider username={account.username}
                                           password={account.password}
                                           website={account.website}>
                                <EditProvider>
                                    <CollapsibleInfo/>
                                </EditProvider>
                            </InputProvider>
                        </div>
                    </div>
                </div>
                <DeleteAccountModal/>
            </IDProvider>
        </div>
    )
}

function CollapsibleTitle(props) {
    const account = useAccountContext().account

    return (
        <div className="flex py-0 px-0 items-center shadow-md pb-1 no-select">
            <div className="ml-2 w-12 h-full flex items-center justify-center">
                <img src={`https://icon.horse/icon/${account.website}`} className="w-7 h-7"/>
            </div>
            <div className="ml-2">
                <h1 className="text-md">{account.website}</h1>
                <h2 className="text-xs text-blue-0">{account.username}</h2>
            </div>
            <div className="absolute right-6">
                <span>{props.isOpen ? "-" : "+"}</span>
            </div>
        </div>
    )
}

function CollapsibleInfo() {
    const editLabel = "Edit Account"
    const saveLabel = "Save Changes"
    const [buttonText, setButtonText] = useState(editLabel)
    const accountIndex = useAccountContext().index
    const saveChanges = useAccountContextUpdate()
    const toggleEditing = useEditContextUpdate()
    const accountIDs = useIDContext()

    const toggleMode = (event) => {
        event.preventDefault()

        if (buttonText === saveLabel) {
            submitChanges()
        } else {
            toggleEditing()
            setButtonText(saveLabel)
        }
    }

    const changeOutline = () => {
        // Remove the outline after the user warning.
        const username = document.getElementById(accountIDs.usernameID)
        const website = document.getElementById(accountIDs.websiteID)
        const password = document.getElementById(accountIDs.passwordID)
        const warning = document.getElementById(`warning-${accountIDs.usernameID}`)

        username.classList.remove("outline")
        password.classList.remove("outline")
        website.classList.remove("outline")
        warning.classList.add("hidden")

        username.classList.add("focus:ring", "focus:ring-blue-1")
        password.classList.add("focus:ring", "focus:ring-blue-1")
        website.classList.add("focus:ring", "focus:ring-blue-1")
    }

    const submitChanges = () => {
        const username = document.getElementById(accountIDs.usernameID)
        const website = document.getElementById(accountIDs.websiteID)
        const password = document.getElementById(accountIDs.passwordID)

        // Get only the hostname from the URL.
        const url = website.value
        const [, hostname] = url.match(HOSTNAME_REGEX)

        const accountData = {
            website: hostname,
            username: username.value,
            password: password.value
        }

        window.controller.getAllAccounts().then(accounts => {
            // Prevent account duplication.
            const isNotDuplicate = accounts.every((account, index) => {
                // If the account index is the same then we can assume it's not a duplicate because it is
                // the same account and not another account.
                if (accountIndex === index) {
                    return true
                }
                return account.username !== accountData.username || account.website !== accountData.website
            })

            if (isNotDuplicate) {
                // Save changes in local state.
                saveChanges(accountData)
                toggleEditing()
                setButtonText(editLabel)
            } else {
                // Warn the user that the account already exists.
                const warning = document.getElementById(`warning-${accountIDs.usernameID}`)
                warning.classList.remove("hidden")
                username.classList.add("outline")
                password.classList.add("outline")
                website.classList.add("outline")

                username.classList.remove("focus:ring", "focus:ring-blue-1")
                password.classList.remove("focus:ring", "focus:ring-blue-1")
                website.classList.remove("focus:ring", "focus:ring-blue-1")
            }
        })
    }


    return (
        <div className="flex justify-between">
            <form className="flex flex-col space-y-4 mt-2 ml-4 mb-4" id={accountIDs.editFormID} onSubmit={toggleMode}>
                <Website changeOutline={changeOutline}/>
                <Username changeOutline={changeOutline}/>
                <Password changeOutline={changeOutline}/>
                <p id={`warning-${accountIDs.usernameID}`} className="hidden text-red-500">
                    This account already exists.
                </p>
            </form>
            <div className="mt-4 mr-4 flex flex-col space-y-4 lg:block lg:space-x-4">
                <EditButton buttonText={buttonText}
                            toggleMode={toggleMode}/>
                <DeleteButton/>
            </div>
        </div>
    )
}

function Website(props) {
    const websiteID = useIDContext().websiteID
    const isEditable = useEditContext()
    const input = useInputContext().website
    const setInput = useInputContextUpdate().setWebsite

    return (
        <label htmlFor={websiteID} className="space-y-1">
            <p className="text-md">Website/Service:</p>
            <input type="text" id={websiteID} name="website" value={input}
                   onChange={e => {
                       setInput(e.target.value)
                   }}
                   className="pl-2 rounded-sm h-8 border-dark-blue-4 disabled:text-dark-blue-5
                   disabled:cursor-not-allowed transition bg-dark-blue-6 text-white focus:outline-none outline-2
                   outline-red-500 focus:ring focus:ring-blue-1"
                   disabled={isEditable} onClick={props.changeOutline} required/>
        </label>
    )
}

function Username(props) {
    const usernameID = useIDContext().usernameID
    const isEditable = useEditContext()
    const userClipboard = useClipboardContext().username
    const addToClipboard = useClipboardContextUpdate()
    const input = useInputContext().username
    const setInput = useInputContextUpdate().setUsername


    return (
        <label htmlFor={usernameID} className="space-y-1">
            <p className="text-md">Username:</p>
            <div className="flex space-x-2">
                <input type="text" id={usernameID} name="username" value={input}
                       onChange={e => {
                           setInput(e.target.value)
                       }}
                       className="pl-2 rounded-sm h-8 border-dark-blue-4 disabled:text-dark-blue-5
                       disabled:cursor-not-allowed transition bg-dark-blue-6 text-white focus:outline-none outline-2
                       outline-red-500 focus:ring focus:ring-blue-1"
                       disabled={isEditable} onClick={props.changeOutline} required/>
                <button type="button" className="px-1 py-1 tooltip tooltip-right tooltip-bg" data-tip={userClipboard}
                        tabIndex="-1"
                        onClick={() => {
                            addToClipboard('username', input)
                        }}
                        onMouseOut=""><img
                    src={images.clipboardIcon}
                /></button>
            </div>
        </label>
    )
}

function Password(props) {
    const passwordID = useIDContext().passwordID
    const isEditable = useEditContext()
    const passClipboard = useClipboardContext().password
    const addToClipboard = useClipboardContextUpdate()
    const input = useInputContext().password
    const setInput = useInputContextUpdate().setPassword


    const [showPassword, setShowPassword] = useState("password")
    const [passwordIcon, setPasswordIcon] = useState(images.hidePasswordIcon)

    const passwordVisibility = () => {
        // Change the password to type text so the user can see it.
        setShowPassword(showPassword === "password" ? "text" : "password")
        setPasswordIcon(passwordIcon === images.hidePasswordIcon ? images.showPasswordIcon
            : images.hidePasswordIcon)
    }

    return (
        <label htmlFor={passwordID} className="space-y-1">
            <p className="text-md">Password:</p>
            <div className="flex space-x-2">
                <input type={showPassword} id={passwordID}
                       disabled={isEditable} onClick={props.changeOutline} name="password" value={input}
                       onChange={e => {
                           setInput(e.target.value)
                       }}
                       className="pl-2 rounded-sm h-8 border-dark-blue-4 disabled:text-dark-blue-5
                       disabled:cursor-not-allowed transition bg-dark-blue-6 text-white focus:outline-none outline-2
                       outline-red-500 focus:ring focus:ring-blue-1"
                       required/>
                <button type="button" className="px-1 py-1" onClick={passwordVisibility} tabIndex="-1"><img
                    src={passwordIcon}
                /></button>
                <button type="button" className=" px-1 py-1 tooltip tooltip-right tooltip-bg" data-tip={passClipboard}
                        tabIndex="-1"
                        onClick={() => {
                            addToClipboard('password', input)
                        }}
                        onMouseOut=""><img
                    src={images.clipboardIcon}
                /></button>
            </div>
        </label>
    )
}

function EditButton(props) {
    const editFormID = useIDContext().editFormID
    const input = useInputContext()

    return (
        <button type="submit" form={editFormID}
                onClick={props.toggleMode}
                disabled={!input.username || !input.password || !input.website}
                className="bg-blue-3 text-white px-4 py-2 hover:bg-green-500 active:bg-green-600 shadow-md transition
                disabled:text-gray-300 disabled:bg-dark-blue-4 disabled:cursor-not-allowed">
            {props.buttonText}
        </button>
    )
}

function DeleteButton() {
    const index = useAccountContext().index

    return (
        <label htmlFor={`delete-modal-${index}`}
               className="bg-blue-3 text-white px-4 py-[0.65rem] hover:bg-red-500 active:bg-red-600 shadow-md
                        transition hover:cursor-pointer"
        >Delete Account
        </label>
    )
}
