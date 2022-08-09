import { useRef, useState } from 'react'
import { IMAGES } from '../../data/constants'
import PropTypes from 'prop-types'

export default function ToggleVisibility (props) {
  // State
  const [icon, setIcon] = useState(props.theme === 'light'
    ? IMAGES.HIDE_PASSWORD_LIGHT
    : IMAGES.HIDE_PASSWORD_DARK)

  // Ref
  const buttonRef = useRef(null)

  const toggleVisibility = () => {
    // Toggle the input visibility and the icon.
    props.setType(prevType => (prevType === 'password' ? 'text' : 'password'))
    setIcon(prevIcon => {
      if (props.theme === 'light') {
        return prevIcon === IMAGES.HIDE_PASSWORD_LIGHT
          ? IMAGES.SHOW_PASSWORD_LIGHT
          : IMAGES.HIDE_PASSWORD_LIGHT
      }

      return prevIcon === IMAGES.HIDE_PASSWORD_DARK
        ? IMAGES.SHOW_PASSWORD_DARK
        : IMAGES.HIDE_PASSWORD_DARK
    })
  }

  return (
    <button
      type='button'
      ref={buttonRef}
      tabIndex={props.tabIndex}
      onPointerDown={event => {
        // Prevent the focus outline from appearing on click.
        event.preventDefault()
      }}
      onClick={toggleVisibility}
      style={{ marginLeft: '-2rem' }}
      className='focus:outline-none focus:ring focus:ring-[#003D5C] focus:ring-offset-1 focus:ring-offset-[#00293d]
      transition rounded-sm h-6'
    >
      <img
        src={icon}
        alt='Show/hide password.'
        className='w-6 h-6'
      />
    </button>
  )
}

ToggleVisibility.propTypes = {
  setType: PropTypes.func,
  tabIndex: PropTypes.number
}
