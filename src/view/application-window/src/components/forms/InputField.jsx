import ClipboardButton from '../buttons/ClipboardButton'
import ToggleVisibility from '../buttons/ToggleVisibility'
import { useState, forwardRef } from 'react'
import PropTypes from 'prop-types'
import { BAR_COLORS } from '../../data/constants'
import PasswordStrengthBar from 'react-password-strength-bar'
import { useWeakPassContextUpdate } from '../../context/WeakPassContext'

const InputField = forwardRef((props, ref) => {
  // Changing the tabIndex depending on the buttons shown.
  const toggleIndex = props.secondaryTabIndex
  const clipboardIndex = props.hasToggleVisibility
    ? props.secondaryTabIndex + 1
    : props.secondaryTabIndex

  // State
  const [type, setType] = useState(props.type)
  // Context
  const handleWeakUpdate = useWeakPassContextUpdate()

  return (
    <label htmlFor={props.fieldId} className='space-y-3 w-full'>
      {props.title && <p className='text-md text-white'>{props.title}</p>}
      <div className='flex space-x-2 w-full items-center'>
        <input
          type={type}
          placeholder={props.placeholder || ''}
          id={props.fieldId}
          ref={ref || null}
          name={props.name}
          value={props.value || ''}
          minLength={props.minLength || null}
          maxLength={props.maxLength || null}
          tabIndex={props.tabIndex}
          disabled={props.isEditable || false}
          data-outline={props.dataOutline || null}
          autoFocus={props.autoFocus || false}
          onChange={event => {
            props?.handleWarning()
            props?.onChange(event.target.value)
          }}
          onClick={props.handleWarning}
          style={props.hasToggleVisibility ? { paddingRight: '3rem' } : {}}
          className='pl-2 rounded-sm h-10 disabled:text-dark-blue-5 disabled:cursor-not-allowed transition bg-[#001824]
          text-white focus:outline-none outline-2 outline-red-500 focus:ring focus:ring-[#003D5C] w-full
          placeholder:text-[#00293d]'
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
      {/* Password Strength (If enabled). */}
      {props.hasStrengthBar && (
        <PasswordStrengthBar
          password={props.value}
          barColors={BAR_COLORS}
          minLength={1}
          onChangeScore={(score) => {
            // score < 2 === weak password.
            handleWeakUpdate(score)
          }}
        />
      )}
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
  handleWarning: PropTypes.func,
  onChange: PropTypes.func,
  autoFocus: PropTypes.bool,
  minLength: PropTypes.number,
  maxLength: PropTypes.number,
  placeholder: PropTypes.string,
  hasStrengthBar: PropTypes.bool
}

InputField.displayName = 'InputField'
export default InputField
