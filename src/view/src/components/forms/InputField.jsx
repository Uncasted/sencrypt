import ClipboardButton from "../buttons/ClipboardButton"
import ToggleVisibility from "../buttons/ToggleVisibility"
import { useState, forwardRef } from "react"
import PropTypes from "prop-types"

const InputField = forwardRef((props, ref) => {
  // Changing the tabIndex depending on the buttons shown.
  const toggleIndex = props.secondaryTabIndex
  const clipboardIndex = props.hasToggleVisibility
    ? props.secondaryTabIndex + 1
    : props.secondaryTabIndex

  // State
  const [type, setType] = useState(props.type)

  return (
    <label htmlFor={props.fieldId} className="space-y-2">
      {props.title && <p className="text-md text-white">{props.title}</p>}
      <div className="flex space-x-2">
        <input
          type={type}
          id={props.fieldId}
          ref={ref || null}
          name={props.name}
          value={props.value || ""}
          minLength={props.minLength || null}
          maxLength={props.maxLength || null}
          tabIndex={props.tabIndex}
          disabled={props.isEditable || false}
          data-outline={props.dataOutline || null}
          autoFocus={props.autoFocus || false}
          onChange={event => {
            props?.removeWarning()
            props?.onChange(event.target.value)
          }}
          onClick={props.removeWarning}
          className="pl-2 rounded-sm h-8 disabled:text-dark-blue-5 disabled:cursor-not-allowed
                       transition bg-dark-blue-6 text-white focus:outline-none outline-2 outline-red-500 focus:ring
                       focus:ring-blue-1"
        />
        {/* Show / Hide for password inputs. (If it's enabled) */}
        {props.hasToggleVisibility && (
          <ToggleVisibility setType={setType} tabIndex={toggleIndex} />
        )}
        {/* Clipboard button (If it's enabled) */}
        {props.hasClipboard && (
          <ClipboardButton
            value={props.value}
            tooltip={props.clipboardTooltip}
            tooltipDirection={props.tooltipDirection}
            tabIndex={clipboardIndex}
          />
        )}
      </div>
    </label>
  )
})

InputField.propTypes = {
  type: PropTypes.string,
  name: PropTypes.string,
  title: PropTypes.string,
  tabIndex: PropTypes.number,
  secondaryTabIndex: PropTypes.number,
  dataOutline: PropTypes.string,
  value: PropTypes.string,
  fieldId: PropTypes.string,
  isEditable: PropTypes.bool,
  hasToggleVisibility: PropTypes.bool,
  hasClipboard: PropTypes.bool,
  clipboardTooltip: PropTypes.string,
  tooltipDirection: PropTypes.string,
  removeWarning: PropTypes.func,
  onChange: PropTypes.func,
  autoFocus: PropTypes.bool,
  minLength: PropTypes.number,
  maxLength: PropTypes.number,
}

InputField.displayName = "InputField"
export default InputField
