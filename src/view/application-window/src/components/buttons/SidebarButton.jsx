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
      tabIndex='-1'
      data-focus='change-focus'
      className='w-full text-start pl-[10px] py-3 hover:bg-[#00141F] transition flex'
    >
      <div
        tabIndex={props.tabIndex}
        onPointerDown={event => {
          // Prevent the focus outline from appearing on click.
          event.preventDefault()
        }}
        onKeyDown={(event => {
          // Press the button when they key is Enter or Space.
          if (event.key === 'Enter' || event.key === ' ') {
            const button = buttonRef.current
            button.click()
          }
        })}
        className='focus:outline-none focus:ring focus:ring-[#003D5C] rounded-sm transition flex w-[70%]'
      >
        <img
          src={props.icon}
          alt={props.title}
          className='w-7 h-7 mr-4 no-select'
        />
        {props.title}
      </div>
    </button>
  )
}

SidebarButton.propTypes = {
  changeSelected: PropTypes.func,
  defaultSelected: PropTypes.bool,
  title: PropTypes.string,
  section: PropTypes.string,
  icon: PropTypes.string,
  tabIndex: PropTypes.number
}
