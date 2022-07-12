import {Navbar} from "./components/Navbar"
import {Accounts} from "./components/Accounts/Accounts"
import AccountsProvider from "./components/Accounts/Context/AccountsContext"
import {Generator} from "./components/Generator/Generator"
import LoginScreen from "./components/LoginScreen"
import {useState} from "react"

import logo from '/assets/images/logo.png'
import managerIcon from '/assets/images/manager-icon.png'
import generatorIcon from '/assets/images/generator-icon.png'
import settingsIcon from '/assets/images/settings-icon.png'
import clipboardIcon from '/assets/images/clipboard-icon.png'
import showPasswordIcon from '/assets/images/show-password-icon.png'
import hidePasswordIcon from '/assets/images/hide-password-icon.png'

export const HOSTNAME_REGEX = /^(?:https?:\/\/)?(?:[^@\/\n]+@)?(?:www\.)?([^:\/?\n]+)/
export const images = {
    logo: logo,
    managerIcon: managerIcon,
    generatorIcon: generatorIcon,
    settingsIcon: settingsIcon,
    clipboardIcon: clipboardIcon,
    showPasswordIcon: showPasswordIcon,
    hidePasswordIcon: hidePasswordIcon
}


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