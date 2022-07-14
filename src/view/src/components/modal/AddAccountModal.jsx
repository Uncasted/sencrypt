import {useAccountsContext, useAccountsContextUpdate} from "../../context/accounts/AccountsContext"
import {HOSTNAME_REGEX} from "../../data/constants"
import {useState} from "react"
import InputField from "../forms/InputField"
import AddModalHeader from "../headers/AddModalHeader"
import SubmitAccount from "../buttons/accounts/adding/SubmitAccount"


export function AddAccountModal() {
    // State
    const [newUsername, setNewUsername] = useState("")
    const [newPassword, setNewPassword] = useState("")
    const [newWebsite, setNewWebsite] = useState("")

    // Context
    const accounts = useAccountsContext()
    const {createAccount} = useAccountsContextUpdate()

    const removeWarning = () => {
        // Remove the warning for already existing account.
        const fields = document.querySelectorAll(`[data-outline="add-modal-outline"]`)

        for (const field of fields) {
            field.classList.remove("outline", "focus:outline", "focus:outline-red-500")
            field.classList.add("focus:ring", "focus:ring-blue-1")
        }

        const warning = document.getElementById("warn-add-modal")
        warning.classList.add("invisible")

    }

    const submitData = (event) => {
        event.preventDefault()

        // Get only the hostname from the URL.
        const [, website] = newWebsite.match(HOSTNAME_REGEX)

        // Get each value from the form.
        const accountData = {
            website: website,
            username: newUsername,
            password: newPassword
        }

        const isNotDuplicate = accounts.every(account => {
            return account.username !== accountData.username || account.website !== accountData.website
        })

        // If there isn't a duplicate. Create the account.
        if (isNotDuplicate) {
            // Creating account in the local state.
            createAccount(accountData).then(() => {
                // We need to click the label to close the modal.
                const addModalLabel = document.querySelector("#add-modal-label")
                addModalLabel.click()

                // Clear the value of the elements after adding the account.
                setNewUsername("")
                setNewPassword("")
                setNewWebsite("")
            })
        } else {
            // Warn the user.
            const fields = document.querySelectorAll(`[data-outline="add-modal-outline"]`)

            // Make the outline of the fields red.
            for (const field of fields) {
                field.classList.remove("focus:ring", "focus:ring-blue-1")
                field.classList.add("outline", "focus:outline", "focus:outline-red-500")
            }

            // Show the user the warning.
            const warning = document.getElementById("warn-add-modal")
            warning.classList.remove("invisible")
        }
    }

    return (
        <>
            <input type="checkbox"
                   id="add-modal"
                   tabIndex="-1"
                   className="modal-toggle"/>
            <div className="modal">
                <label className="modal-box bg-dark-blue-1 text-white rounded-none px-0 py-0 w-[350px] shadow-sm">
                    <AddModalHeader/>
                    <form id="add-form"
                          onSubmit={submitData}
                          className="flex flex-col items-center space-y-4">
                        <InputField type="text"
                                    name="new-website"
                                    fieldId="new-website"
                                    title="Website/Service"
                                    tabIndex={10}
                                    dataOutline="add-modal-outline"
                                    input={newWebsite}
                                    setInput={setNewWebsite}
                                    removeWarning={removeWarning}
                        />
                        <InputField type="text"
                                    name="new-username"
                                    fieldId="new-username"
                                    title="Username"
                                    tabIndex={11}
                                    dataOutline="add-modal-outline"
                                    input={newUsername}
                                    setInput={setNewUsername}
                                    removeWarning={removeWarning}
                        />
                        <InputField type="password"
                                    name="new-password"
                                    fieldId="new-password"
                                    title="Password"
                                    tabIndex={12}
                                    dataOutline="add-modal-outline"
                                    input={newPassword}
                                    setInput={setNewPassword}
                                    removeWarning={removeWarning}
                        />
                        <p id="warn-add-modal"
                           className="invisible text-red-500">
                            This account already exists.
                        </p>
                        <div className="modal-action">
                            <SubmitAccount
                                account={{username: newUsername, password: newPassword, website: newWebsite}}/>
                        </div>
                    </form>
                </label>
            </div>
        </>
    )
}

