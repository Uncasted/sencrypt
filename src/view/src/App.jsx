import {Navbar} from "./pages/navbar/Navbar"
import {Accounts} from "./pages/accounts/Accounts"
import {Generator} from "./pages/generator/Generator"
import LoginScreen from "./pages/login/LoginScreen"
import {useState} from "react"
import AccountSection from "./pages/accounts/AccountSection"
import GeneratorSection from "./pages/generator/GeneratorSection"
import MenuPlaceholder from "./components/MenuPlaceholder"


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


