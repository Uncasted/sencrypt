import {useState} from "react"
import {DeleteAccountModal} from "./DeleteAccount"
import {useAccountContext, useAccountContextUpdate} from "./Context/AccountContext"
import IDProvider, {useIDContext} from "./Context/IDContext"
import EditProvider, {useEditContext, useEditContextUpdate} from "./Context/EditContext"
import {useClipboardContext, useClipboardContextUpdate} from "./Context/ClipboardContext"
import {HOSTNAME_REGEX, images} from "../../App"
import InputProvider, {useInputContext, useInputContextUpdate} from "./Context/InputContext"
import {useAccountsContextUpdate} from "./Context/AccountsContext"

export function AccountInfo() {
    // Collapsible state.
    const [open, setOpen] = useState(false)
    const [showContent, setShowContent] = useState(false)

    // Context
    const account = useAccountContext().account
    const titleClipboard = useClipboardContext().title
    const addToClipboard = useClipboardContextUpdate()

    const toggleCollapsible = () => {
        setOpen(!open)
        setShowContent(!showContent)
    }

    return (
        <div>
            <IDProvider>
                <div className="shadow-total bg-dark-blue-0 text-white">
                    <div className="absolute right-14 mt-1">
                        <button data-tip={titleClipboard}
                                tabIndex="-1"
                                onClick={() => {
                                    addToClipboard('title', account.password)
                                }}
                                className="px-1 py-1 tooltip tooltip-left tooltip-bg">
                            <img src={images.clipboardIcon}
                                 alt="Copy password to clipboard."/>
                        </button>
                    </div>
                    <div>
                        <div onClick={toggleCollapsible}
                             className="title cursor-pointer">
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
    // Context
    const account = useAccountContext().account

    return (
        <div className="flex py-0 px-0 items-center shadow-md pb-1 no-select">
            <div className="ml-2 w-12 h-full flex items-center justify-center">
                <img src={`https://icon.horse/icon/${account.website}`}
                     alt="Account icon"
                     className="w-7 h-7"/>
            </div>
            <div className="ml-2">
                <h1 className="text-md">
                    {account.website}
                </h1>
                <h2 className="text-xs text-blue-0">
                    {account.username}
                </h2>
            </div>
            <div className="absolute right-6">
                <span>
                    {props.isOpen ? "-" : "+"}
                </span>
            </div>
        </div>
    )
}

function CollapsibleInfo() {
    // State
    const editLabel = "Edit Account"
    const saveLabel = "Save Changes"
    const [buttonText, setButtonText] = useState(editLabel)

    // Context
    const updateAccount = useAccountsContextUpdate().updateAccount
    const accountIndex = useAccountContext().index
    const saveChanges = useAccountContextUpdate()
    const toggleEditing = useEditContextUpdate()
    const accountIDs = useIDContext()
    const account = useInputContext()

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
        // Remove the red outline after the user warning.
        const fields = document.querySelectorAll(`[data-outline="account-${accountIndex}"]`)

        for (const field of fields) {
            field.classList.remove("outline")
            field.classList.add("focus:ring", "focus:ring-blue-1")
        }

        // Hide the warning.
        const warning = document.getElementById(`warning-${accountIDs.usernameID}`)
        warning.classList.add("hidden")
    }

    const submitChanges = () => {
        const fields = document.querySelectorAll(`[data-outline="account-${accountIndex}"]`)

        // Get only the hostname from the URL.
        const url = account.website
        const [, hostname] = url.match(HOSTNAME_REGEX)

        const accountData = {
            website: hostname,
            username: account.username,
            password: account.password
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
                saveChanges(accountData).then(() => {
                    updateAccount(accountIndex, accountData)
                    toggleEditing()
                    setButtonText(editLabel)
                })
            } else {
                // Warn the user that the account already exists.
                const warning = document.getElementById(`warning-${accountIDs.usernameID}`)
                warning.classList.remove("hidden")

                // Add red outline to the fields.
                for (const field of fields) {
                    field.classList.remove("focus:ring", "focus:ring-blue-1")
                    field.classList.add("outline")
                }
            }
        })
    }


    return (
        <div className="flex justify-between">
            <form id={accountIDs.editFormID}
                  onSubmit={toggleMode}
                  className="flex flex-col space-y-4 mt-2 ml-4 mb-4">
                <Website changeOutline={changeOutline}/>
                <Username changeOutline={changeOutline}/>
                <Password changeOutline={changeOutline}/>
                <p id={`warning-${accountIDs.usernameID}`}
                   className="hidden text-red-500">
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
                   disabled={isEditable}
                   data-outline={`account-${index}`}
                   onChange={e => {
                       setInput(e.target.value)
                   }}
                   onClick={props.changeOutline}
                   className="pl-2 rounded-sm h-8 border-dark-blue-4 disabled:text-dark-blue-5
                   disabled:cursor-not-allowed transition bg-dark-blue-6 text-white focus:outline-none outline-2
                   outline-red-500 focus:ring focus:ring-blue-1"
            />
        </label>
    )
}

function Username(props) {
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
                       disabled={isEditable}
                       data-outline={`account-${index}`}
                       onChange={e => {
                           setInput(e.target.value)
                       }}
                       onClick={props.changeOutline}
                       className="pl-2 rounded-sm h-8 border-dark-blue-4 disabled:text-dark-blue-5
                       disabled:cursor-not-allowed transition bg-dark-blue-6 text-white focus:outline-none outline-2
                       outline-red-500 focus:ring focus:ring-blue-1"
                />
                <button type="button"
                        data-tip={userClipboard}
                        tabIndex="-1"
                        onClick={() => {
                            addToClipboard('username', input)
                        }}
                        className="px-1 py-1 tooltip tooltip-right tooltip-bg">
                    <img src={images.clipboardIcon}
                         alt="Copy username to clipboard."/>
                </button>
            </div>
        </label>
    )
}

function Password(props) {
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
                       disabled={isEditable}
                       data-outline={`account-${index}`}
                       onChange={e => {
                           setInput(e.target.value)
                       }}
                       onClick={props.changeOutline}
                       className="pl-2 rounded-sm h-8 border-dark-blue-4 disabled:text-dark-blue-5
                       disabled:cursor-not-allowed transition bg-dark-blue-6 text-white focus:outline-none outline-2
                       outline-red-500 focus:ring focus:ring-blue-1"
                       required/>
                <button type="button"
                        tabIndex="-1"
                        onClick={passwordVisibility}
                        className="px-1 py-1">
                    <img src={passwordIcon}
                         alt="Show/hide password."/>
                </button>
                <button type="button"
                        data-tip={passClipboard}
                        tabIndex="-1"
                        onClick={() => {
                            addToClipboard('password', input)
                        }}
                        className=" px-1 py-1 tooltip tooltip-right tooltip-bg">
                    <img src={images.clipboardIcon}
                         alt="Copy password to clipboard."/>
                </button>
            </div>
        </label>
    )
}

function EditButton(props) {
    // Context
    const editFormID = useIDContext().editFormID
    const input = useInputContext()

    return (
        <button type="submit"
                form={editFormID}
                disabled={!input.username || !input.password || !input.website}
                onClick={props.toggleMode}
                className="bg-blue-3 text-white px-4 py-2 hover:bg-green-500 active:bg-green-600 shadow-md transition
                disabled:text-gray-300 disabled:bg-dark-blue-4 disabled:cursor-not-allowed">
            {props.buttonText}
        </button>
    )
}

function DeleteButton() {
    // Context
    const index = useAccountContext().index

    return (
        <label htmlFor={`delete-modal-${index}`}
               className="bg-blue-3 text-white px-4 py-[0.65rem] hover:bg-red-500 active:bg-red-600 shadow-md
                        transition hover:cursor-pointer"
        >
            Delete Account
        </label>
    )
}
