import {useAccountsContextUpdate} from "../../context/Accounts/AccountsContext"
import {HOSTNAME_REGEX} from "../../data/constants"
import {useState} from "react"

export function AddAccountButton() {

    const addAccount = () => {
        // Click on the label to show the add account modal.
        const addModal = document.getElementById(`open-add-account`)
        addModal.click()
        // Focus on the form.
        const newWebsite = document.getElementById("new-website")
        newWebsite.focus()
    }

    return (
        <label htmlFor="add-modal"
               id="open-add-account">
            <button tabIndex="0"
                    onClick={addAccount}
                    className="ml-4 modal-button bg-dark-blue-1 px-4 py-3 text-white hover:bg-blue-1 active:bg-blue-2
               transition hover:cursor-pointer shadow-md focus:outline-gray-200">
                Add New Account
            </button>
        </label>
    )
}

export function AccountModal() {
    // State
    const [newUsername, setNewUsername] = useState("")
    const [newPassword, setNewPassword] = useState("")
    const [newWebsite, setNewWebsite] = useState("")

    // Context
    const createAccount = useAccountsContextUpdate().createAccount

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

        window.controller.getAllAccounts().then(accounts => {
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
        })
    }

    return (
        <>
            <input type="checkbox"
                   id="add-modal"
                   tabIndex="-1"
                   className="modal-toggle"/>
            <div className="modal">
                <label className="modal-box bg-dark-blue-1 text-white rounded-none px-0 py-0 w-[350px] shadow-sm">
                    <ModalHeader/>
                    <form id="add-form"
                          onSubmit={submitData}
                          className="flex flex-col items-center space-y-4">
                        <Website website={newWebsite}
                                 setWebsite={setNewWebsite}
                                 removeWarning={removeWarning}/>
                        <Username username={newUsername}
                                  setUsername={setNewUsername}
                                  removeWarning={removeWarning}/>
                        <Password password={newPassword}
                                  setPassword={setNewPassword}
                                  removeWarning={removeWarning}/>
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

function ModalHeader() {
    const closeModal = () => {
        // Close the modal when the "x" button is clicked.
        const addModal = document.getElementById("add-modal")
        addModal.click()
    }

    return (
        <div className="bg-blue-3 text-white w-full py-4 pl-4 mb-4">
            <label htmlFor="add-modal">
                <button type="button"
                        tabIndex="14"
                        onClick={closeModal}
                        className="btn bg-transparent border-none absolute right-2 top-1 text-white rounded-none
                           hover:bg-transparent focus:outline-gray-200">
                    ✕
                </button>
            </label>
            <h1 className="text-lg">
                Add new Account:
            </h1>
        </div>
    )
}

function Website(props) {
    return (
        <label htmlFor="new-website"
               className="space-y-1">
            <p className="text-md">
                Website/Service:
            </p>
            <input type="text"
                   id="new-website"
                   name="new-website"
                   value={props.website}
                   tabIndex="10"
                   data-outline="add-modal-outline"
                   onChange={e => {
                       props.removeWarning()
                       props.setWebsite(e.target.value)
                   }}
                   onClick={props.removeWarning}
                   className="pl-2 bg-dark-blue-6 rounded-sm h-8 focus:outline-none focus:ring focus:ring-blue-1
                   outline-2 outline-red-500 transition"
            />
        </label>
    )
}

function Username(props) {
    return (
        <label htmlFor="new-username"
               className="space-y-1">
            <p className="text-md">
                Username:
            </p>
            <input type="text"
                   id="new-username"
                   name="new-username"
                   value={props.username}
                   tabIndex="11"
                   data-outline="add-modal-outline"
                   onChange={e => {
                       props.removeWarning()
                       props.setUsername(e.target.value)
                   }}
                   onClick={props.removeWarning}
                   className="pl-2 bg-dark-blue-6 rounded-sm h-8 focus:outline-none focus:ring focus:ring-blue-1
                   outline-2 outline-red-500 transition"
            />
        </label>
    )
}

function Password(props) {
    return (
        <label htmlFor="new-password"
               className="space-y-1">
            <p className="text-md">
                Password:
            </p>
            <input type="password"
                   id="new-password"
                   name="new-password"
                   value={props.password}
                   tabIndex="12"
                   data-outline="add-modal-outline"
                   onChange={e => {
                       props.removeWarning()
                       props.setPassword(e.target.value)
                   }}
                   onClick={props.removeWarning}
                   className="pl-2 bg-dark-blue-6 rounded-sm h-8 focus:outline-none focus:ring focus:ring-blue-1
                   outline-2 outline-red-500 transition"
            />
        </label>
    )
}

function SubmitAccount(props) {
    return (
        <label htmlFor="add-modal"
               id="add-modal-label">
            <input type="submit"
                   value="Add Account"
                   tabIndex="13"
                   disabled={!props.account.username || !props.account.password || !props.account.website}
                   className="bg-blue-3 px-4 py-2 text-white hover:bg-blue-1 active:bg-blue-2 transition
            hover:cursor-pointer mb-4 disabled:text-gray-300 disabled:bg-dark-blue-4 disabled:cursor-not-allowed
            focus:outline-gray-200"/>
        </label>
    )
}