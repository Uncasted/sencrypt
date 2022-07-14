import ClipboardButton from "../buttons/ClipboardButton"
import ToggleVisibility from "../buttons/TogglePassVisibility"
import {useState} from "react"

export default function InputField(props) {
    // Making show content true if there's no value provided.
    const showContent = props.showContent || true

    // Changing the tabIndex depending on the buttons shown.
    const toggleIndex = props.tabIndex + 1
    const clipboardIndex = props.hasToggleVisibility ? toggleIndex + 1 : props.tabIndex + 1

    // State
    const [type, setType] = useState(props.type)

    // Context
    const isEditable = props.isEditable || false
    const input = props.input || null
    const setInput = props.setInput || null

    return (
        <label htmlFor={props.fieldId}
               className="space-y-1"
        >
            <p className="text-md">
                {props.title}:
            </p>
            <div className="flex space-x-2">
                <input type={type}
                       id={props.fieldId}
                       name={props.name}
                       value={input}
                       tabIndex={showContent ? props.tabIndex : -1}
                       disabled={isEditable}
                       data-outline={props.dataOutline}
                       onChange={event => {
                           props.removeWarning()
                           setInput(event.target.value)
                       }}
                       onClick={props.removeWarning}
                       className="pl-2 rounded-sm h-8 border-dark-blue-4 disabled:text-dark-blue-5
                       disabled:cursor-not-allowed transition bg-dark-blue-6 text-white focus:outline-none outline-2
                       outline-red-500 focus:ring focus:ring-blue-1"
                />
                {/* Show / Hide for password inputs. */}
                {props.hasToggleVisibility &&
                    <ToggleVisibility type={type}
                                      setType={setType}
                                      tabIndex={showContent ? toggleIndex : -1}
                    />
                }
                {/*Clipboard button (If it's enabled)*/}
                {props.hasClipboard &&
                    <ClipboardButton input={input}
                                     tooltip={props.clipboardTooltip}
                                     tooltipDirection={props.tooltipDirection}
                                     tabIndex={showContent ? clipboardIndex : -1}
                    />
                }
            </div>
        </label>
    )
}