import {useRef, useState} from "react"
import {CANCEL_LABEL, COPY_CLIPBOARD, EDIT_LABEL, HOSTNAME_REGEX} from "../../data/constants"
import {useIndexContext} from "../../context/accounts/IndexContext"
import {useAccountsContext, useAccountsContextUpdate} from "../../context/accounts/AccountsContext"
import {useInputContext, useInputContextUpdate} from "../../context/accounts/InputContext"
import {useEditContext, useEditContextUpdate} from "../../context/accounts/EditContext"
import {useIDContext} from "../../context/accounts/IDContext"
import InputField from "../../components/forms/InputField"
import {DeleteButton} from "./buttons/DeleteButton"
import SecondaryButton from "../../components/buttons/SecondaryButton"

export default function AccountInfo() {
    // State
    const [editTitle, setEditTitle] = useState(EDIT_LABEL)

    // Ref
    const warningRef = useRef(null)

    // Context
    const index = useIndexContext()
    const accounts = useAccountsContext()
    const account = useAccountsContext()[index]
    const {updateAccount} = useAccountsContextUpdate()
    const accountInput = useInputContext()
    const {setUsername, setPassword, setWebsite} = useInputContextUpdate()
    const isEditable = useEditContext()
    const toggleEditing = useEditContextUpdate()
    const accountIDs = useIDContext()

    const toggleMode = () => {
        // Revert the inputs back when you cancel that changes.
        setUsername(account.username)
        setWebsite(account.website)
        setPassword(account.password)

        // Toggle Editing
        toggleEditing()
        setEditTitle(editTitle === EDIT_LABEL ? CANCEL_LABEL : EDIT_LABEL)
    }

    const removeWarning = () => {
        // Remove the warning for already existing account.
        const fields = document.querySelectorAll(`[data-outline="account-${index}"]`)

        for (const field of fields) {
            field.classList.remove("outline", "focus:outline", "focus:outline-red-500")
            field.classList.add("focus:ring", "focus:ring-blue-1")
        }

        // Hide the warning.
        const warning = warningRef.current
        warning.classList.add("hidden")
    }

    const submitChanges = (event) => {
        event.preventDefault()

        const fields = document.querySelectorAll(`[data-outline="account-${index}"]`)

        // Get only the hostname from the URL.
        const url = accountInput.website
        const [, hostname] = url.match(HOSTNAME_REGEX)

        const accountData = {
            website: hostname,
            username: accountInput.username,
            password: accountInput.password
        }

        // Prevent account duplication.
        const isNotDuplicate = accounts.every((account, accIndex) => {
            // If the account index is the same then we can assume it's not a duplicate because it is
            // the same account and not another account.
            if (index === accIndex) {
                return true
            }
            return account.username !== accountData.username || account.website !== accountData.website
        })

        if (isNotDuplicate) {
            // Update the account list.
            updateAccount(index, accountData).then(() => {
                toggleMode()
            })
        } else {
            // Warn the user that the account already exists.
            const warning = warningRef.current
            warning.classList.remove("hidden")

            // Add red outline to the fields.
            for (const field of fields) {
                field.classList.remove("focus:ring", "focus:ring-blue-1")
                field.classList.add("outline", "focus:outline", "focus:outline-red-500")
            }
        }
    }


    return (
        <div className="flex justify-between">
            <form id={accountIDs.editFormID}
                  onSubmit={submitChanges}
                  className="flex flex-col space-y-4 mt-2 ml-4 mb-4"
            >
                <InputField type="text"
                            name="website"
                            title="Website/Service:"
                            tabIndex={23}
                            dataOutline={`account-${index}`}
                            input={accountInput.website}
                            setInput={setWebsite}
                            fieldId={accountIDs.websiteID}
                            isEditable={isEditable}
                            removeWarning={removeWarning}
                />
                <InputField type="text"
                            name="username"
                            title="Username:"
                            tabIndex={24}
                            dataOutline={`account-${index}`}
                            input={accountInput.username}
                            setInput={setUsername}
                            fieldId={accountIDs.usernameID}
                            isEditable={isEditable}
                            removeWarning={removeWarning}
                            hasClipboard={true}
                            clipboardTooltip={COPY_CLIPBOARD}
                            tooltipDirection="tooltip-right"
                />
                <InputField type="password"
                            name="password"
                            title="Password:"
                            tabIndex={25}
                            dataOutline={`account-${index}`}
                            input={accountInput.password}
                            setInput={setPassword}
                            fieldId={accountIDs.passwordID}
                            isEditable={isEditable}
                            removeWarning={removeWarning}
                            hasClipboard={true}
                            clipboardTooltip={COPY_CLIPBOARD}
                            hasToggleVisibility={true}
                            tooltipDirection="tooltip-right"
                />
                <p ref={warningRef}
                   className="hidden text-red-500"
                >
                    This account already exists.
                </p>
            </form>
            <div className="mt-4 mr-4 flex flex-col gap-y-4 lg:flex-row lg:space-x-4">
                {/*Edit button.*/}
                <SecondaryButton type="button"
                                 tabIndex={27}
                                 hoverColor="green-500"
                                 activeColor="green-600"
                                 onClick={toggleMode}
                >
                    {editTitle}
                </SecondaryButton>
                {/*We have to use inline styles here, otherwise it doesn't work.*/}
                <div style={{marginTop: '0px'}}
                     className="flex flex-col gap-y-4"
                >
                    {/*Save changes button.*/}
                    <SecondaryButton type="submit"
                                     form={accountIDs.editFormID}
                                     tabIndex={28}
                                     disabled={isEditable || (!accountInput.username || !accountInput.password ||
                                         !accountInput.website)}
                                     hoverColor="green-500"
                                     activeColor="green-600"
                    >
                        Save Changes
                    </SecondaryButton>
                    <DeleteButton/>
                </div>
            </div>
        </div>
    )
}