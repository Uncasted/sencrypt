import {useIndexContext} from "../../../../context/accounts/IndexContext"


export function DeleteButton(props) {
    // Context
    const index = useIndexContext()

    const deleteWarning = () => {
        // Click on the label to show the warning.
        const warning = document.getElementById(`delete-warn-${index}`)
        warning.click()
        // Focus the "delete modal".
        const delModal = document.getElementById(`delete-box-${index}`)
        delModal.focus()
    }

    return (
        <>
            <label htmlFor={`delete-modal-${index}`}
                   id={`delete-warn-${index}`}
                   className="hidden">
            </label>
            <button tabIndex={props.showContent ? 29 : -1}
                    onClick={deleteWarning}
                    className="bg-blue-3 text-white px-4 py-2 hover:bg-red-500 active:bg-red-600 shadow-md
                    transition hover:cursor-pointer focus:outline-gray-200">
                Delete Account
            </button>
        </>
    )
}
