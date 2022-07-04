import {images} from "../App"

export function Navbar(props) {

    const changeFocus = (event, name) => {
        // Switch the menu
        props.changeSelected(name)

        // Change styles
        const buttons = document.querySelectorAll(".change-focus")
        buttons.forEach(element => {
            element.classList.remove("bg-blue-1", "hover:bg-blue-2")
            element.classList.add("hover:bg-dark-blue-2")
        })
        event.target.classList.remove("hover:bg-dark-blue-2")
        event.target.classList.add("bg-blue-1", "hover:bg-blue-2")
    }

    return (
        <nav className="bg-dark-blue-1 text-white inset-0 w-[250px] h-[100vh] pt-4 fixed">
            <img src={images.logo} className="h-7 mx-auto" tabIndex="-1"/>
            <ul className="flex flex-col text-lg mt-8">
                <li>
                    <button onClick={(e) => {
                        changeFocus(e, "Accounts")
                    }}
                            className="bg-blue-1 change-focus w-full text-start pl-8 py-3 hover:bg-blue-2 transition
                            flex">
                        <img src={images.managerIcon} className="w-7 h-7 mr-4 no-select"/>
                        Accounts
                    </button>
                </li>
                <li>
                    <button onClick={(e) => {
                        changeFocus(e, "Generator")
                    }}
                            className="change-focus w-full text-start pl-8 py-3 hover:bg-dark-blue-2
                            transition flex">
                        <img src={images.generatorIcon} className="w-7 h-7 mr-4 no-select"/>
                        Generator
                    </button>
                </li>
                <li>
                    <button onClick={(e) => {
                        changeFocus(e, "Settings")
                    }}
                            className="change-focus w-full text-start pl-8 py-3 hover:bg-dark-blue-2
                            transition flex">
                        <img src={images.settingsIcon} className="w-7 h-7 mr-4 no-select"/>
                        Settings
                    </button>
                </li>
            </ul>
        </nav>
    )
}
