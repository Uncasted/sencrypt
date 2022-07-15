import ClipboardButton from "../buttons/ClipboardButton"
import ToggleVisibility from "../buttons/ToggleVisibility"
import {useState, forwardRef} from "react"

const InputField = forwardRef((props, ref) => {
    // Changing the tabIndex depending on the buttons shown.
    const toggleIndex = props.secondaryTabIndex
    const clipboardIndex = props.hasToggleVisibility ? props.secondaryTabIndex + 1 : props.secondaryTabIndex

    // State
    const [type, setType] = useState(props.type)

    // Context
    const isEditable = props.isEditable || false

    return (
        <label htmlFor={props.fieldId}
               className="space-y-2"
        >
            {props.title &&
                <p className="text-md text-white">
                    {props.title}
                </p>
            }
            <div className="flex space-x-2">
                <input type={type}
                       id={props.fieldId}
                       ref={ref || null}
                       name={props.name}
                       value={props.value || ""}
                       minLength={props.minLength || null}
                       maxLength={props.maxLength || null}
                       tabIndex={props.tabIndex}
                       disabled={isEditable}
                       data-outline={props.dataOutline || null}
                       autoFocus={props.autoFocus || false}
                       onChange={event => {
                           if (props.hasOwnProperty("removeWarning")) {
                               props.removeWarning()
                           }
                           if (props.hasOwnProperty("onChange")) {
                               props.onChange(event.target.value)
                           }
                       }}
                       onClick={props.removeWarning}
                       className="pl-2 rounded-sm h-8 disabled:text-dark-blue-5 disabled:cursor-not-allowed
                       transition bg-dark-blue-6 text-white focus:outline-none outline-2 outline-red-500 focus:ring
                       focus:ring-blue-1"
                />
                {/* Show / Hide for password inputs. (If it's enabled)*/}
                {props.hasToggleVisibility &&
                    <ToggleVisibility type={type}
                                      setType={setType}
                                      tabIndex={toggleIndex}
                    />
                }
                {/*Clipboard button (If it's enabled)*/}
                {props.hasClipboard &&
                    <ClipboardButton value={props.value}
                                     tooltip={props.clipboardTooltip}
                                     tooltipDirection={props.tooltipDirection}
                                     tabIndex={clipboardIndex}
                    />
                }
            </div>
        </label>
    )
})

// We have to export it like this otherwise it doesn't work.
export default InputField