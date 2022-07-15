import {useIndexContext} from "../../../context/accounts/IndexContext"
import {useAccountsContextUpdate} from "../../../context/accounts/AccountsContext"
import SecondaryButton from "../../../components/buttons/SecondaryButton"

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
            {/*Delete account button*/}
            <div className="absolute right-4 bottom-4">
                <label htmlFor={`delete-modal-${index}`}>
                    <SecondaryButton type="button"
                                     tabIndex={32}
                                     hoverColor="red-500"
                                     activeColor="red-600"
                                     onClick={deleteAccount}
                    >
                        Delete Account
                    </SecondaryButton>
                </label>
            </div>
        </div>
    )
}