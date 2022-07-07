import {AccountModal, AddAccountButton} from "./AddAccount"
import {AccountInfo} from "./AccountInfo"
import AccountProvider from "./Context/AccountContext"
import ClipboardProvider from "./Context/ClipboardContext"
import {useAccountsContext} from "./Context/AccountsContext"

export function Accounts() {
    // Context
    const accounts = useAccountsContext()

    return (
        <div className="mt-8">
            <AddAccountButton/>
            <AccountModal/>
            <div id="account-list"
                 className="mt-8 space-y-1 px-2">
                {!accounts.length && <EmptyPlaceholder/>}
                {accounts.map((account, index) => {
                    return (
                        <AccountProvider account={account}
                                         index={index}
                                         key={`${account.username}-${account.website}`}>
                            <ClipboardProvider>
                                <AccountInfo/>
                            </ClipboardProvider>
                        </AccountProvider>
                    )
                })}
            </div>
        </div>
    )
}

// This gets rendered when there aren't any accounts in the app.
function EmptyPlaceholder() {
    return (
        <div className="w-full h-[85vh] flex flex-col items-center justify-center">
            <h1 className="text-lg lg:text-2xl text-gray-300">
                There isn't any accounts to show.
            </h1>
            <h1 className="text-md lg:text-lg text-gray-300">
                Add a new account by clicking on the "Add new account" button.
            </h1>
        </div>
    )
}