import {useIndexContext} from "../../context/accounts/IndexContext"
import {useAccountsContextUpdate} from "../../context/accounts/AccountsContext"

export default function DeleteModalWarning() {
    // Context
    const index = useIndexContext()
    const {removeAccount} = useAccountsContextUpdate()

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
                <label htmlFor={`delete-modal-${index}`}>
                    <button tabIndex="31"
                            onClick={deleteAccount}
                            className="bg-red-600 text-white px-4 py-2 hover:bg-red-500 active:bg-red-700
                                   shadow-lg transition hover:cursor-pointer focus:outline-gray-200">
                        Delete Account
                    </button>
                </label>
            </div>
        </div>
    )
}