import {useState} from "react"
import {DeleteAccountModal} from "./DeleteAccount"
import {useAccountContext, useAccountContextUpdate} from "./Context/AccountContext"
import IDProvider, {useIDContext} from "./Context/IDContext"
import EditProvider, {useEditContext, useEditContextUpdate} from "./Context/EditContext"
import {useClipboardContext, useClipboardContextUpdate} from "./Context/ClipboardContext"
import {useAccountsContextUpdate} from "./Context/AccountsContext"

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
    const passClipboard = useClipboardContext().pass
    const addToClipboard = useClipboardContextUpdate().addToClipboard
    const onTooltipOut = useClipboardContextUpdate().onTooltipOut

    return (
        <div>
            <IDProvider>
                <div className="shadow-total">
                    <div className="absolute right-14 mt-1">
                        <button className="px-1 py-1 tooltip tooltip-left tooltip-black"
                                onClick={() => {
                                    addToClipboard(account.password)
                                }}
                                onMouseOut={onTooltipOut}
                                data-tip={passClipboard}
                                tabIndex="-1"><img
                            src="/public/clipboard-icon.png"
                        /></button>
                    </div>
                    <div>
                        <div className="title cursor-pointer" onClick={toggleCollapsible}>
                            <CollapsibleTitle isOpen={open}/>
                        </div>
                        <div className={showContent ? "content show" : "content"}>
                            <EditProvider>
                                <CollapsibleInfo/>
                            </EditProvider>
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
                <h2 className="text-xs text-gray-500">{account.username}</h2>
            </div>
            <div className="absolute right-6">
                <span>{props.isOpen ? "-" : "+"}</span>
            </div>
        </div>
    )
}

function CollapsibleInfo() {
    const index = useAccountContext().index
    const saveChanges = useAccountContextUpdate()
    const updateAccount = useAccountsContextUpdate().updateAccount

    const editFormID = useIDContext().editFormID

    const submitChanges = (event) => {
        event.preventDefault()
        // Get data from form.
        const form = event.target.elements

        const data = {
            website: form['website'].value,
            username: form['username'].value,
            password: form['password'].value
        }

        // Save changes in local state.
        saveChanges(data)
        // Update account in Accounts ref.
        updateAccount(index, data)
    }

    return (
        <div className="flex justify-between">
            <form className="flex flex-col space-y-4 mt-2 ml-4 mb-4" id={editFormID} onSubmit={submitChanges}>
                <Website/>
                <Username/>
                <Password/>
            </form>
            <div className="mt-4 mr-4 space-x-4">
                <EditButton/>
                <DeleteButton/>
            </div>
        </div>
    )
}

function Website() {
    const website = useAccountContext().account.website
    const websiteID = useIDContext().websiteID
    const isEditable = useEditContext()

    return (
        <label htmlFor={websiteID}>
            <p className="text-md">Website:</p>
            <input type="text" id={websiteID} defaultValue={website} name="website"
                   className="border-[1px] pl-2 border-gray-500 rounded-none h-8 disabled:bg-gray-300
                   disabled:text-gray-400 disabled:cursor-not-allowed transition"
                   disabled={isEditable}/>
        </label>
    )
}

function Username() {
    const username = useAccountContext().account.username
    const usernameID = useIDContext().usernameID
    const isEditable = useEditContext()
    const clipboardText = useClipboardContext().any
    const addToClipboard = useClipboardContextUpdate().addToClipboard
    const onTooltipOut = useClipboardContextUpdate().onTooltipOut

    return (
        <label htmlFor={usernameID}>
            <p className="text-md">Username:</p>
            <div className="flex space-x-2">
                <input type="text" id={usernameID} defaultValue={username} name="username"
                       className="border-[1px] pl-2 border-gray-500 rounded-none h-8 disabled:bg-gray-300
                       disabled:text-gray-400 disabled:cursor-not-allowed transition"
                       disabled={isEditable} required/>
                <button className="px-1 py-1 tooltip tooltip-right tooltip-black" data-tip={clipboardText}
                        tabIndex="-1"
                        onClick={() => {
                            addToClipboard(username)
                        }}
                        onMouseOut={onTooltipOut}><img
                    src="/public/clipboard-icon.png"
                /></button>
            </div>
        </label>
    )
}

function Password() {
    const password = useAccountContext().account.password
    const passwordID = useIDContext().passwordID
    const isEditable = useEditContext()
    const clipboardText = useClipboardContext().any
    const addToClipboard = useClipboardContextUpdate().addToClipboard
    const onTooltipOut = useClipboardContextUpdate().onTooltipOut

    const [showPassword, setShowPassword] = useState("password")
    const [passwordIcon, setPasswordIcon] = useState("/public/hide-password-icon.png")

    const passwordVisibility = () => {
        const showIcon = "/public/show-password-icon.png"
        const hideIcon = "/public/hide-password-icon.png"

        // Change the password to type text so the user can see it.
        setShowPassword(showPassword === "password" ? "text" : "password")
        setPasswordIcon(passwordIcon === hideIcon ? showIcon : hideIcon)
    }

    return (
        <label htmlFor={passwordID}>
            <p className="text-md">Password:</p>
            <div className="flex space-x-2">
                <input type={showPassword} id={passwordID} defaultValue={password}
                       disabled={isEditable} name="password"
                       className="border-[1px] pl-2 border-gray-500 rounded-none h-8 disabled:bg-gray-300
                       disabled:text-gray-400 disabled:cursor-not-allowed transition" required/>
                <button className="px-1 py-1" onClick={passwordVisibility} tabIndex="-1"><img
                    src={passwordIcon}
                /></button>
                <button className=" px-1 py-1 tooltip tooltip-right tooltip-black" data-tip={clipboardText}
                        tabIndex="-1"
                        onClick={() => {
                            addToClipboard(password)
                        }}
                        onMouseOut={onTooltipOut}><img
                    src="/public/clipboard-icon.png"
                /></button>
            </div>
        </label>
    )
}

function EditButton() {
    const editLabel = "Edit Account"
    const saveLabel = "Save Changes"

    const [buttonText, setButtonText] = useState(editLabel)
    const editFormID = useIDContext().editFormID
    const toggleEditing = useEditContextUpdate()


    const handleButtonText = () => {
        setButtonText(buttonText === editLabel ? saveLabel : editLabel)
    }

    return (
        <button type="submit" form={editFormID}
                className="bg-black text-white px-4 py-1.5 hover:bg-green-500 active:bg-green-700 shadow-lg
                        transition"
                onClick={() => {
                    toggleEditing()
                    handleButtonText()
                }}>{buttonText}
        </button>
    )
}

function DeleteButton() {
    const index = useAccountContext().index

    return (
        <label htmlFor={`delete-modal-${index}`}
               className="bg-black text-white px-4 py-2 hover:bg-red-500 active:bg-red-700 shadow-lg
                        transition hover:cursor-pointer"
        >Delete Account
        </label>
    )
}
