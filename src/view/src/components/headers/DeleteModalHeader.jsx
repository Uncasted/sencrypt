import {useIndexContext} from "../../context/accounts/IndexContext"

export default function DeleteModalHeader() {
    // Context
    const index = useIndexContext()

    const closeModal = () => {
        const delModal = document.getElementById(`delete-modal-${index}`)
        delModal.click()
    }

    return (
        <div className="bg-blue-3 text-white w-full py-4 pl-4 mb-4">
            <label htmlFor={`delete-modal-${index}`}>
                <button type="button"
                        tabIndex="32"
                        onClick={closeModal}
                        className="btn bg-transparent border-none absolute right-2 top-1 text-white rounded-none
                           hover:bg-transparent focus:outline-gray-200">
                    ✕
                </button>
            </label>
            <h1 className="text-lg">
                Delete Account:
            </h1>
        </div>
    )
}