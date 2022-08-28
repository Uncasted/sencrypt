import { COPIED, IMAGES } from '../../data/constants'
import { useState } from 'react'
import PropTypes from 'prop-types'

export default function ClipboardButton (props) {
  const [tooltip, setTooltip] = useState(props.tooltip)
  const tooltipDirection = `tooltip-${props.tooltipDirection}`

  const addToClipboard = input => {
    // Copy to clipboard and tell the user.
    navigator.clipboard.writeText(input).then(() => {
      setTooltip(() => COPIED)
      // Reset the tooltip text after 2 seconds.
      setTimeout(() => {
        setTooltip(() => props.tooltip)
      }, 2000)
    })
  }

  return (
    <div className={`tooltip tooltip-bg ${tooltipDirection}`} data-tip={tooltip}>
      <button
        type='button'
        tabIndex={props.tabIndex}
        onFocus={event => {
          event.target.classList.add('tooltip-open')
        }}
        onBlur={event => {
          event.target.classList.remove('tooltip-open')
        }}
        onMouseOut={event => {
          event.target.classList.remove('tooltip-open')
        }}
        onClick={() => {
          addToClipboard(props.value)
        }}
        onPointerDown={event => {
          // Prevent the focus outline from appearing on click.
          event.preventDefault()
        }}
        className='px-1 py-1 focus:outline-none focus:ring focus:ring-[#003D5C]
        transition rounded-sm'
      >
        <img src={IMAGES.CLIPBOARD_ICON} alt='Copy username to clipboard.' className='w-6 h-6' />
      </button>
    </div>
  )
}

ClipboardButton.propTypes = {
  value: PropTypes.string,
  tabIndex: PropTypes.number,
  tooltip: PropTypes.string,
  tooltipDirection: PropTypes.string
}
