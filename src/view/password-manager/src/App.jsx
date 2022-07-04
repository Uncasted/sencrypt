import {Navbar} from "./components/Navbar"
import {Accounts} from "./components/Accounts/Accounts"
import AccountsProvider from "./components/Accounts/Context/AccountsContext"
import LoginScreen from "./components/LoginScreen"

import logo from '../images/logo.png'
import managerIcon from '../images/password-icon.png'
import generatorIcon from '../images/generator-icon.png'
import settingsIcon from '../images/settings-icon.png'
import clipboardIcon from '../images/clipboard-icon.png'
import showPasswordIcon from '../images/show-password-icon.png'
import hidePasswordIcon from '../images/hide-password-icon.png'

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
    return (
        <>
            <LoginScreen>
                <Navbar/>
                <div className="ml-[250px]">
                    <AccountsProvider>
                        <Accounts/>
                    </AccountsProvider>
                </div>
            </LoginScreen>
        </>
    )
}