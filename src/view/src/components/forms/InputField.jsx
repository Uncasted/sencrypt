import ClipboardButton from "../buttons/ClipboardButton"
import ToggleVisibility from "../buttons/ToggleVisibility"
import {useState} from "react"

export default function InputField(props) {
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
            {props.title &&
                <p className="text-md">
                    {props.title}
                </p>
            }
            <div className="flex space-x-2">
                <input type={type}
                       id={props.fieldId}
                       name={props.name}
                       value={input}
                       minLength={props.minLength || null}
                       maxLength={props.maxLength || null}
                       tabIndex={props.tabIndex}
                       disabled={isEditable}
                       data-outline={props.dataOutline || null}
                       autoFocus={props.autoFocus || false}
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
                                      tabIndex={toggleIndex}
                    />
                }
                {/*Clipboard button (If it's enabled)*/}
                {props.hasClipboard &&
                    <ClipboardButton input={input}
                                     tooltip={props.clipboardTooltip}
                                     tooltipDirection={props.tooltipDirection}
                                     tabIndex={clipboardIndex}
                    />
                }
            </div>
        </label>
    )
}