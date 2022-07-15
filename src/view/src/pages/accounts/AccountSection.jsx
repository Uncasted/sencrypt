import AccountsProvider from "../../context/accounts/AccountsContext"
import {Accounts} from "./Accounts"

export default function AccountSection() {
    return (
        <div className="ml-[250px]">
            <AccountsProvider>
                <Accounts/>
            </AccountsProvider>
        </div>
    )
}
