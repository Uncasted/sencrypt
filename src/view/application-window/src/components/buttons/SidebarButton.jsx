import { useEffect, useRef } from 'react'
import PropTypes from 'prop-types'

export default function SidebarButton (props) {
  const buttonRef = useRef(null)

  // Select the default section (Accounts).
  useEffect(() => {
    if (props.defaultSelected) {
      const button = buttonRef.current
      button.classList.remove('hover:bg-[#00141F]')
      button.classList.add('bg-[#00293D]', 'hover:bg-[#003D5C]')
    }
  }, [])

  const changeFocus = name => {
    // Switch the menu
    props.changeSelected(name)

    // Remove selected from any other buttons.
    const menuButtons = document.querySelectorAll('[data-focus="change-focus"]')
    menuButtons.forEach(button => {
      button.classList.remove('bg-[#00293D]', 'hover:bg-[#003D5C]')
      button.classList.add('hover:bg-[#00141F]')
    })
    // Select the current button.
    const currentButton = buttonRef.current
    currentButton.classList.remove('hover:bg-[#00141F]')
    currentButton.classList.add('bg-[#00293D]', 'hover:bg-[#003D5C]')
  }

  return (
    <button
      id={`${props.title}-section`}
      ref={buttonRef}
      onClick={() => {
        changeFocus(props.section)
      }}
      data-focus='change-focus'
      className='w-full text-start pl-[10px] py-3 hover:bg-[#00141F] transition flex focus:outline-gray-200'
    >
      <img
        src={props.icon}
        alt={props.title}
        className='w-7 h-7 mr-4 no-select'
      />
      {props.title}
    </button>
  )
}

SidebarButton.propTypes = {
  changeSelected: PropTypes.func,
  defaultSelected: PropTypes.bool,
  title: PropTypes.string,
  section: PropTypes.string,
  icon: PropTypes.string
}
