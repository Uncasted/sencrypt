import {Navbar} from "./components/Navbar"
import {Accounts} from "./components/Accounts/Accounts"
import AccountsProvider from "./components/Accounts/Context/AccountsContext"

export default function App() {
    return (
        <>
            <Navbar/>
            <div className="ml-[250px]">
                <AccountsProvider>
                    <Accounts/>
                </AccountsProvider>
            </div>
        </>
    )
}