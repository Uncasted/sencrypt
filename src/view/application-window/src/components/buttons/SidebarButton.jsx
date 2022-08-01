import { useEffect, useRef } from 'react'
import PropTypes from 'prop-types'

export default function SidebarButton (props) {
  const buttonRef = useRef(null)

  // Select the default section (Accounts).
  useEffect(() => {
    if (props.defaultSelected) {
      const button = buttonRef.current
      button.classList.remove('hover:bg-dark-blue-2')
      button.classList.add('bg-blue-1', 'hover:bg-blue-2')
    }
  }, [])

  const changeFocus = name => {
    // Switch the menu
    props.changeSelected(name)

    // Remove selected from any other buttons.
    const menuButtons = document.querySelectorAll('[data-focus="change-focus"]')
    menuButtons.forEach(button => {
      button.classList.remove('bg-blue-1', 'hover:bg-blue-2')
      button.classList.add('hover:bg-dark-blue-2')
    })
    // Select the current button.
    const currentButton = buttonRef.current
    currentButton.classList.remove('hover:bg-dark-blue-2')
    currentButton.classList.add('bg-blue-1', 'hover:bg-blue-2')
  }

  return (
    <button
      id={`${props.title}-section`}
      ref={buttonRef}
      onClick={() => {
        changeFocus(props.section)
      }}
      data-focus='change-focus'
      className='w-full text-start pl-[10px] py-3 hover:bg-dark-blue-2 transition flex focus:outline-gray-200'
    >
      <img
        src={props.icon}
        alt='Accounts section'
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
