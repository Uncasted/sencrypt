export default function AddModalHeader() {
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

