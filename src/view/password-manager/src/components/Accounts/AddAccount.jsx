import {useAccountsContextUpdate} from "./Context/AccountsContext"
import {HOSTNAME_REGEX} from "../../App"
import {useState} from "react"

export function AddAccountButton() {
    return (
        <label htmlFor="add-modal"
               className="ml-4 modal-button bg-blue-3 px-4 py-3 text-white hover:bg-blue-1 active:bg-blue-2
               transition hover:cursor-pointer shadow-md ">
            Add New Account
        </label>
    )
}

export function AccountModal() {
    const [newUsername, setNewUsername] = useState("")
    const [newPassword, setNewPassword] = useState("")
    const [newWebsite, setNewWebsite] = useState("")

    const createAccount = useAccountsContextUpdate().createAccount

    const submitData = (event) => {
        event.preventDefault()
        // Get element array from form.
        const form = event.target.elements

        // Get only the hostname from the URL.
        const url = form['new-website'].value
        const [, website] = url.match(HOSTNAME_REGEX)

        // Get each value from the form.
        const accountData = {
            password: form["new-password"].value,
            username: form["new-username"].value,
            website: website
        }

        window.controller.getAllAccounts().then(accounts => {
            const isNotDuplicate = accounts.every(account => {
                return account.username !== accountData.username || account.website !== accountData.website
            })

            // If there isn't a duplicate. Create the account.
            if (isNotDuplicate) {
                // Creating account in the local state.
                createAccount(accountData)
                // We need to click the label to close the modal.
                const addModalLabel = document.querySelector("#add-modal-label")
                addModalLabel.click()

                // Clear the value of the elements after adding the account.
                for (let element of form) {
                    element.value = ""
                }
            }
        })
    }

    return (
        <>
            <input type="checkbox" id="add-modal" className="modal-toggle"/>
            <label htmlFor="add-modal" className="modal">
                <label className="modal-box bg-dark-blue-1 text-white rounded-none px-0 py-0 w-[350px] shadow-sm">
                    <ModalHeader/>
                    <form className="flex flex-col items-center space-y-4" id="add-form" onSubmit={submitData}>
                        <Website website={newWebsite}
                                 setWebsite={setNewWebsite}/>
                        <Username username={newUsername}
                                  setUsername={setNewUsername}/>
                        <Password password={newPassword}
                                  setPassword={setNewPassword}/>
                        <div className="modal-action">
                            <SubmitAccount
                                account={{username: newUsername, password: newPassword, website: newWebsite}}/>
                        </div>
                    </form>
                </label>
            </label>
        </>
    )
}

function ModalHeader() {
    return (
        <div className="bg-blue-3 text-white w-full py-4 pl-4 mb-4">
            <label htmlFor="add-modal"
                   className="btn bg-transparent border-none absolute right-2 top-1 text-white rounded-none
                           hover:bg-transparent">✕</label>
            <h1 className="text-lg">Add new Account:</h1>
        </div>
    )
}

function Website(props) {
    return (
        <label htmlFor="new-website" className="space-y-1">
            <p className="text-md">Website/Service:</p>
            <input type="text" id="new-website" name="new-website" value={props.website} onChange={e => {
                props.setWebsite(e.target.value)
            }}
                   className="pl-2 bg-dark-blue-6 rounded-sm h-8 focus:outline-none focus:ring focus:ring-blue-1 transition"
            />
        </label>
    )
}

function Username(props) {
    return (
        <label htmlFor="new-username" className="space-y-1">
            <p className="text-md">Username:</p>
            <input type="text" id="new-username" name="new-username" value={props.username} onChange={e => {
                props.setUsername(e.target.value)
            }}
                   className="pl-2 bg-dark-blue-6 rounded-sm h-8 focus:outline-none focus:ring focus:ring-blue-1 transition"
            />
        </label>
    )
}

function Password(props) {
    return (
        <label htmlFor="new-password" className="space-y-1">
            <p className="text-md">Password:</p>
            <input type="password" id="new-password" name="new-password" value={props.password} onChange={e => {
                props.setPassword(e.target.value)
            }}
                   className="pl-2 bg-dark-blue-6 rounded-sm h-8 focus:outline-none focus:ring focus:ring-blue-1 transition"
            />
        </label>
    )
}

function SubmitAccount(props) {
    return (
        <label htmlFor="add-modal" id="add-modal-label">
            <input disabled={!props.account.username || !props.account.password || !props.account.website}
                   type="submit"
                   value="Add Account"
                   className="bg-blue-3 px-4 py-2 text-white hover:bg-blue-1 active:bg-blue-2 transition
            hover:cursor-pointer mb-4 mt-4 disabled:text-gray-300 disabled:bg-dark-blue-4 disabled:cursor-not-allowed"/>
        </label>
    )
}