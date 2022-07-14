import {COPIED, IMAGES} from "../../data/constants"
import {useState} from "react"

export default function ClipboardButton(props) {
    const [tooltip, setTooltip] = useState(props.tooltip)

    const addToClipboard = (input) => {
        // Copy to clipboard and tell the user.
        navigator.clipboard.writeText(input).then(() => {
            setTooltip(COPIED)
            setTimeout(() => {
                setTooltip(props.tooltip)
            }, 2000)
        })
    }

    return (
        <button type="button"
                data-tip={tooltip}
                tabIndex={props.tabIndex}
                onFocus={(event) => {
                    event.target.classList.add("tooltip-open")
                }}
                onBlur={(event) => {
                    event.target.classList.remove("tooltip-open")
                }}
                onMouseOut={(event) => {
                    event.target.classList.remove("tooltip-open")
                }}
                onClick={() => {
                    addToClipboard(props.input)
                }}
                className={`tooltip ${props.tooltipDirection} tooltip-bg px-1 py-1 focus:outline-gray-200`}>
            <img src={IMAGES.CLIPBOARD_ICON}
                 alt="Copy username to clipboard."/>
        </button>
    )
}