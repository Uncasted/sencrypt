import { useState } from 'react'
import { IMAGES } from '../../data/constants'
import PropTypes from 'prop-types'

export default function ToggleVisibility (props) {
  // State
  const [icon, setIcon] = useState(IMAGES.HIDE_PASSWORD)

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
      tabIndex={props.tabIndex}
      onClick={toggleVisibility}
      className='px-1 py-1 focus:outline-gray-200'
    >
      <img src={icon} alt='Show/hide password.' />
    </button>
  )
}

ToggleVisibility.propTypes = {
  setType: PropTypes.func,
  tabIndex: PropTypes.number
}
