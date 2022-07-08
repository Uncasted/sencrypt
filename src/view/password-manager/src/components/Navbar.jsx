import {useEffect} from "react"
import {images} from "../App"

export function Navbar(props) {

    useEffect(() => {
        const sectionList = document.getElementById("section-list")
        sectionList.addEventListener('focusout', (event) => {
            event.stopPropagation()

            if (sectionList.contains(event.relatedTarget)) {
                return
            }

            sectionList.focus()
        })
    }, [])

    const changeFocus = (event, name) => {
        // Switch the menu
        props.changeSelected(name)

        // Change styles
        const menuButtons = document.querySelectorAll(".change-focus")
        menuButtons.forEach(button => {
            button.classList.remove("bg-blue-1", "hover:bg-blue-2")
            button.classList.add("hover:bg-dark-blue-2")
        })
        event.target.classList.remove("hover:bg-dark-blue-2")
        event.target.classList.add("bg-blue-1", "hover:bg-blue-2")
    }

    return (
        <nav className="bg-dark-blue-1 text-white inset-0 w-[250px] h-[100vh] pt-4 fixed">
            <img src={images.logo}
                 alt="Sencrypt"
                 tabIndex="-1"
                 className="h-7 mx-auto"/>
            <ul id="section-list"
                className="flex flex-col text-lg mt-8">
                <li>
                    <button onClick={(e) => {
                        changeFocus(e, "Accounts")
                    }}
                            className="bg-blue-1 change-focus w-full text-start pl-8 py-3 hover:bg-blue-2 transition
                            flex focus:outline-gray-200">
                        <img src={images.managerIcon}
                             alt="Accounts section"
                             className="w-7 h-7 mr-4 no-select"/>
                        Accounts
                    </button>
                </li>
                <li>
                    <button onClick={(e) => {
                        changeFocus(e, "Generator")
                    }}
                            className="change-focus w-full text-start pl-8 py-3 hover:bg-dark-blue-2
                            transition flex focus:outline-gray-200">
                        <img src={images.generatorIcon}
                             alt="Password generator section."
                             className="w-7 h-7 mr-4 no-select"/>
                        Generator
                    </button>
                </li>
                <li>
                    <button onClick={(e) => {
                        changeFocus(e, "Settings")
                    }}
                            className="change-focus w-full text-start pl-8 py-3 hover:bg-dark-blue-2
                            transition flex focus:outline-gray-200">
                        <img src={images.settingsIcon}
                             alt="Settings section."
                             className="w-7 h-7 mr-4 no-select"/>
                        Settings
                    </button>
                </li>
            </ul>
        </nav>
    )
}
