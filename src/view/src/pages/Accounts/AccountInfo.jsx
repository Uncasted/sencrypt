import {useState} from "react"
import {DeleteAccountModal} from "./DeleteAccount"
import {useAccountContext, useAccountContextUpdate} from "../../context/Accounts/AccountContext"
import IDProvider, {useIDContext} from "../../context/Accounts/IDContext"
import EditProvider, {useEditContextUpdate} from "../../context/Accounts/EditContext"
import {useClipboardContext, useClipboardContextUpdate} from "../../context/ClipboardContext"
import {HOSTNAME_REGEX, IMAGES} from "../../data/constants"
import InputProvider, {useInputContext, useInputContextUpdate} from "../../context/Accounts/InputContext"
import {useAccountsContextUpdate} from "../../context/Accounts/AccountsContext"
import {Website, Username, Password, EditButton, DeleteButton, SaveButton} from "./CollapsibleItems"
import {CANCEL_LABEL, EDIT_LABEL} from "../../data/constants"

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
                                tabIndex="1"
                                onFocus={(event) => {
                                    event.target.classList.add("tooltip-open")
                                }}
                                onBlur={(event) => {
                                    event.target.classList.remove("tooltip-open")
                                }}
                                onMouseOut={(event) => {
                                    event.target.classList.remove("tooltip-open")
                                }}
                                onClick={() => {
                                    addToClipboard('title', account.password)
                                }}
                                className="px-1 py-1 tooltip tooltip-left tooltip-bg focus:outline-gray-200">
                            <img src={IMAGES.CLIPBOARD_ICON}
                                 alt="Copy password to clipboard."/>
                        </button>
                    </div>
                    <div>
                        <div onClick={toggleCollapsible}
                             className="title cursor-pointer">
                            <CollapsibleTitle isOpen={open}
                                              toggleCollapsible={toggleCollapsible}/>
                        </div>
                        <div className={showContent ? "content show" : "content"}>
                            <InputProvider username={account.username}
                                           password={account.password}
                                           website={account.website}>
                                <EditProvider>
                                    <CollapsibleMenu showContent={showContent}/>
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
        <div tabIndex="0"
             onKeyDown={(event) => {
                 if (event.key === "Enter") {
                     props.toggleCollapsible()
                 }
             }}
             className="flex py-0 px-0 items-center shadow-md pb-1 focus:outline-gray-200">
            <div className="ml-2 w-12 h-full flex items-center justify-center">
                <img src={`https://icon.horse/icon/${account.website}`}
                     alt="Account icon"
                     className="w-7 h-7 no-select"/>
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

function CollapsibleMenu(props) {
    // State
    const [buttonText, setButtonText] = useState(EDIT_LABEL)

    // Context
    const account = useAccountContext().account
    const updateAccount = useAccountsContextUpdate().updateAccount
    const accountIndex = useAccountContext().index
    const saveChanges = useAccountContextUpdate()
    const toggleEditing = useEditContextUpdate()
    const accountIDs = useIDContext()
    const accountInput = useInputContext()
    const setAccountInput = useInputContextUpdate()

    const toggleMode = () => {
        // Cancelling the changes made to the fields.
        setAccountInput.setUsername(account.username)
        setAccountInput.setPassword(account.password)
        setAccountInput.setWebsite(account.website)
        // Toggle Editing
        toggleEditing()
        setButtonText(buttonText === EDIT_LABEL ? CANCEL_LABEL : EDIT_LABEL)
    }

    const removeWarning = () => {
        // Remove the warning for already existing account.
        const fields = document.querySelectorAll(`[data-outline="account-${accountIndex}"]`)

        for (const field of fields) {
            field.classList.remove("outline", "focus:outline", "focus:outline-red-500")
            field.classList.add("focus:ring", "focus:ring-blue-1")
        }

        // Hide the warning.
        const warning = document.getElementById(`warning-${accountIDs.usernameID}`)
        warning.classList.add("hidden")
    }

    const submitChanges = (event) => {
        event.preventDefault()

        const fields = document.querySelectorAll(`[data-outline="account-${accountIndex}"]`)

        // Get only the hostname from the URL.
        const url = accountInput.website
        const [, hostname] = url.match(HOSTNAME_REGEX)

        const accountData = {
            website: hostname,
            username: accountInput.username,
            password: accountInput.password
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
                saveChanges(accountIndex, accountData).then(() => {
                    updateAccount(accountIndex, accountData)
                    toggleMode()
                })
            } else {
                // Warn the user that the account already exists.
                const warning = document.getElementById(`warning-${accountIDs.usernameID}`)
                warning.classList.remove("hidden")

                // Add red outline to the fields.
                for (const field of fields) {
                    field.classList.remove("focus:ring", "focus:ring-blue-1")
                    field.classList.add("outline", "focus:outline", "focus:outline-red-500")
                }
            }
        })
    }


    return (
        <div className="flex justify-between">
            <form id={accountIDs.editFormID}
                  onSubmit={submitChanges}
                  className="flex flex-col space-y-4 mt-2 ml-4 mb-4">
                <Website removeWarning={removeWarning}
                         showContent={props.showContent}/>
                <Username removeWarning={removeWarning}
                          showContent={props.showContent}/>
                <Password removeWarning={removeWarning}
                          showContent={props.showContent}/>
                <p id={`warning-${accountIDs.usernameID}`}
                   className="hidden text-red-500">
                    This account already exists.
                </p>
            </form>
            <div className="mt-4 mr-4 flex flex-col space-y-4 lg:flex-row lg:space-x-4">
                <EditButton buttonText={buttonText}
                            showContent={props.showContent}
                            toggleMode={toggleMode}/>
                {/*We have to use inline styles here, otherwise it doesn't work.*/}
                <div style={{marginTop: '0px'}}
                     className="flex flex-col space-y-4">
                    <SaveButton showContent={props.showContent}/>
                    <DeleteButton showContent={props.showContent}/>
                </div>
            </div>
        </div>
    )
}