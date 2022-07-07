import {useAccountContext} from "./Context/AccountContext"
import {useAccountsContextUpdate} from "./Context/AccountsContext"

export function DeleteAccountModal() {
    // Context
    const index = useAccountContext().index

    return (
        <div>
            <input type="checkbox"
                   id={`delete-modal-${index}`}
                   className="modal-toggle"/>
            <label htmlFor={`delete-modal-${index}`}
                   className="modal">
                <label
                    className="modal-box bg-dark-blue-1 rounded-none px-0 py-0 w-[400px] h-[200px] shadow-sm text-white"
                >
                    <DeleteModalHeader/>
                    <DeleteModalWarning/>
                </label>
            </label>
        </div>
    )
}

function DeleteModalHeader() {
    // Context
    const index = useAccountContext().index

    return (
        <div className="bg-blue-3 text-white w-full py-4 pl-4 mb-4">
            <label htmlFor={`delete-modal-${index}`}
                   className="btn bg-transparent border-none absolute right-2 top-1 text-white rounded-none
                           hover:bg-transparent">
                ✕
            </label>
            <h1 className="text-lg">
                Delete Account:
            </h1>
        </div>
    )
}

function DeleteModalWarning() {
    // Context
    const index = useAccountContext().index
    const removeAccount = useAccountsContextUpdate().removeAccount

    const deleteAccount = () => {
        removeAccount(index).then()
    }

    return (
        <div className="flex flex-col">
            <div>
                <h1 className="text-md ml-4">
                    Are you sure you want to delete this account?
                </h1>
            </div>
            <div className="absolute right-4 bottom-4">
                <label htmlFor={`delete-modal-${index}`}
                       onClick={deleteAccount}
                       className="bg-red-600 text-white px-4 py-2 hover:bg-red-500 active:bg-red-700
                                   shadow-lg transition hover:cursor-pointer">
                    Delete Account
                </label>
            </div>
        </div>
    )
}