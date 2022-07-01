import {useAccountsContextUpdate} from "./Context/AccountsContext"

export function AddAccountButton() {
    return (
        <label htmlFor="add-modal"
               className="ml-4 modal-button bg-black px-4 py-3 text-white hover:bg-blue-500 active:bg-blue-600
               transition hover:cursor-pointer shadow-lg">
            Add New Account
        </label>
    )
}

export function AccountModal() {
    const createAccount = useAccountsContextUpdate().createAccount

    const submitData = (event) => {
        event.preventDefault()
        // Get element array from form.
        const form = event.target.elements

        // Get each value from the form.
        createAccount({
            website: form["new-website"].value,
            username: form["new-username"].value,
            password: form["new-password"].value
        })

        // We need to click the label to close the modal.
        const addModalLabel = document.querySelector("#add-modal-label")
        addModalLabel.click()

        // Clear the value of the elements after adding the account.
        for (let element of form) {
            element.value = ""
        }
    }

    return (
        <>
            <input type="checkbox" id="add-modal" className="modal-toggle"/>
            <label htmlFor="add-modal" className="modal">
                <div className="modal-box bg-white rounded-none px-0 py-0 w-[350px]">
                    <ModalHeader/>
                    <form className="flex flex-col items-center space-y-4" id="add-form" onSubmit={submitData}>
                        <Website/>
                        <Username/>
                        <Password/>
                        <div className="modal-action">
                            <SubmitAccount/>
                        </div>
                    </form>
                </div>
            </label>
        </>
    )
}

function ModalHeader() {
    return (
        <div className="bg-black text-white w-full py-4 pl-4 mb-4">
            <label htmlFor="add-modal"
                   className="btn bg-transparent border-none absolute right-2 top-1 text-white rounded-none
                           hover:bg-black">✕</label>
            <h1 className="text-lg">Add new Account:</h1>
        </div>
    )
}

function Website() {
    return (
        <label htmlFor="new-website">
            <p className="text-md">Website:</p>
            <input type="text" id="new-website" name="new-website"
                   className="border-[1px] pl-2 border-gray-500 rounded-none h-8" required/>
        </label>
    )
}

function Username() {
    return (
        <label htmlFor="new-username">
            <p className="text-md">Username:</p>
            <input type="text" id="new-username" name="new-username"
                   className="border-[1px] pl-2 border-gray-500 rounded-none h-8" required/>
        </label>
    )
}

function Password() {
    return (
        <label htmlFor="new-password">
            <p className="text-md">Password:</p>
            <input type="password" id="new-password" name="new-password"
                   className="border-[1px] pl-2 border-gray-500 rounded-none h-8" required/>
        </label>
    )
}

function SubmitAccount() {
    return (
        <label htmlFor="add-modal" id="add-modal-label">
            <input className="bg-black px-4 py-2 text-white hover:bg-blue-500 active:bg-blue-600 transition
            hover:cursor-pointer mb-4 mt-4"
                   type="submit"
                   value="Add Account"/>
        </label>
    )
}