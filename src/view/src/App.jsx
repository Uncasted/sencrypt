import {Navbar} from "./pages/navbar/Navbar"
import {Accounts} from "./pages/accounts/Accounts"
import AccountsProvider from "./context/accounts/AccountsContext"
import {Generator} from "./pages/generator/Generator"
import LoginScreen from "./pages/login/LoginScreen"
import {useState} from "react"


export default function App() {
    const [selected, setSelected] = useState(<AccountSection/>)

    const changeSelected = (menu) => {
        switch (menu) {
            case 'Accounts':
                setSelected(<AccountSection/>)
                break
            case 'Generator':
                setSelected(<GeneratorSection/>)
                break
            case 'Settings':
                setSelected(<MenuPlaceholder/>)
        }
    }

    return (
        <>
            <LoginScreen>
                <Navbar changeSelected={changeSelected}/>
                {selected}
            </LoginScreen>
        </>
    )
}

function AccountSection() {
    return (
        <div className="ml-[250px]">
            <AccountsProvider>
                <Accounts/>
            </AccountsProvider>
        </div>
    )
}

function GeneratorSection() {
    return (
        <div className="ml-[250px]">
            <Generator/>
        </div>
    )
}

// Placeholder for other menus in the navbar, will change.
function MenuPlaceholder() {
    return (
        <div className="ml-[250px] h-[85vh] flex flex-col items-center justify-center">
            <h1 className="text-2xl text-gray-300">
                This section is not available right now.
            </h1>
            <h1 className="text-lg text-gray-300">
                It will get implemented in a future update.
            </h1>
        </div>
    )
}