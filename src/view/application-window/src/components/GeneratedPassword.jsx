import React, { useState } from 'react'
import ToggleVisibility from './buttons/ToggleVisibility'
import ClipboardButton from './buttons/ClipboardButton'
import PropTypes from 'prop-types'

export default function GeneratedPassword (props) {
  // State
  const [type, setType] = useState('password')
  // If it's the first element, add a top border.
  const borderWidth = props.index === 0 ? 'border-y-2' : 'border-b-2'

  return (
    <div className={`${borderWidth} border-[#003a57] flex justify-between items-center w-full rounded-sm py-2`}>
      <input
        readOnly
        type={type}
        tabIndex={props.tabIndex}
        value={props.value}
        className='text-white text-md h-10 w-full bg-transparent focus:outline-none'
      />
      <div className='space-x-4 w-16 flex items-center justify-center relative z-50'>
        <ToggleVisibility
          setType={setType}
          tabIndex={props.toggleIndex}
          theme='light'

        />
        <ClipboardButton
          value={props.value}
          tooltip={props.clipboardTooltip}
          tooltipDirection={props.tooltipDirection}
          tabIndex={props.clipboardIndex}
        />
      </div>
    </div>
  )
}

GeneratedPassword.propTypes = {
  value: PropTypes.string,
  tabIndex: PropTypes.number,
  toggleIndex: PropTypes.number,
  clipboardIndex: PropTypes.number,
  clipboardTooltip: PropTypes.string,
  tooltipDirection: PropTypes.string,
  index: PropTypes.number
}
