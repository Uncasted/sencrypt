import {useEffect} from "react"
import {IMAGES} from "../../data/constants"
import NavbarButton from "../../components/buttons/NavbarButton"

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

    return (
        <nav className="bg-dark-blue-1 text-white inset-0 w-[250px] h-[100vh] pt-4 fixed">
            <img src={IMAGES.LOGO}
                 alt="Sencrypt"
                 tabIndex="-1"
                 className="h-7 mx-auto"
            />
            <ul id="section-list"
                className="flex flex-col text-lg mt-8"
            >
                <li>
                    <NavbarButton title="Accounts"
                                  section="Accounts"
                                  icon={IMAGES.MANAGER_ICON}
                                  changeSelected={props.changeSelected}
                                  defaultSelected={true}
                    />
                </li>
                <li>
                    <NavbarButton title="Generator"
                                  section="Generator"
                                  icon={IMAGES.GENERATOR_ICON}
                                  changeSelected={props.changeSelected}
                    />
                </li>
                <li>
                    <NavbarButton title="Settings"
                                  section="Settings"
                                  icon={IMAGES.SETTINGS_ICON}
                                  changeSelected={props.changeSelected}
                    />
                </li>
            </ul>
        </nav>
    )
}
