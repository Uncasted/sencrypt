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