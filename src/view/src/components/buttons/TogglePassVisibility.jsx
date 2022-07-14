import {useState} from "react"
import {IMAGES} from "../../data/constants"

export default function ToggleVisibility(props) {
    // State
    const [icon, setIcon] = useState(IMAGES.HIDE_PASSWORD)

    const toggleVisibility = () => {
        // Toggle the input visibility and the icon.
        props.setType(props.type === "password" ? "text" : "password")
        setIcon(icon === IMAGES.HIDE_PASSWORD ? IMAGES.SHOW_PASSWORD
            : IMAGES.HIDE_PASSWORD)
    }

    return (
        <button type="button"
                tabIndex={props.tabIndex}
                onClick={toggleVisibility}
                className="px-1 py-1 focus:outline-gray-200">
            <img src={icon}
                 alt="Show/hide password."/>
        </button>
    )
}