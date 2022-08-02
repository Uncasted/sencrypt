import { useRef, useState } from 'react'
import { IMAGES } from '../../data/constants'
import PropTypes from 'prop-types'

export default function ToggleVisibility (props) {
  // State
  const [icon, setIcon] = useState(IMAGES.SHOW_PASSWORD)

  // Ref
  const buttonRef = useRef(null)

  const toggleVisibility = () => {
    // Toggle the input visibility and the icon.
    props.setType(prevType => (prevType === 'password' ? 'text' : 'password'))
    setIcon(prevIcon =>
      prevIcon === IMAGES.HIDE_PASSWORD
        ? IMAGES.SHOW_PASSWORD
        : IMAGES.HIDE_PASSWORD
    )
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
