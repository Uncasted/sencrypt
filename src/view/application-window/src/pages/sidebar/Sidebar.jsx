import { useEffect } from 'react'
import { IMAGES, SIDEBAR_BUTTONS } from '../../data/constants'
import SidebarButton from '../../components/buttons/SidebarButton'
import PropTypes from 'prop-types'
import { useSidebarContext } from '../../context/SidebarContext'

export function Sidebar (props) {
  // Context
  const { isCollapsed } = useSidebarContext()

  useEffect(() => {
    const sectionList = document.getElementById('section-list')
    sectionList.addEventListener('focusout', event => {
      event.stopPropagation()

      if (sectionList.contains(event.relatedTarget)) {
        return
      }

      sectionList.focus()
    })
  }, [])

  const handleLogout = () => {
    // Reload the window, effectively logging out the user.
    location.reload()
  }

  return (
    <nav className={` ${isCollapsed} bg-[#000E14] text-white inset-0 h-[100vh] pt-2 fixed z-10`}>
      <ul id='section-list' className='flex flex-col text-lg mt-8'>
        {SIDEBAR_BUTTONS.map(button => {
          return (
            <li key={button.title}>
              <SidebarButton
                tabIndex={button.tabIndex}
                title={button.title}
                section={button.section}
                icon={button.icon}
                changeSelected={props.changeSelected}
                defaultSelected={button.defaultSelected}
              />
            </li>
          )
        })}
      </ul>
      <button
        onClick={handleLogout}
        className='absolute left-3 bottom-4'
      >
        <img
          src={IMAGES.LOGOUT_ICON}
          alt='log out'
          className='w-7 h-7'
        />
      </button>
    </nav>
  )
}

Sidebar.propTypes = {
  changeSelected: PropTypes.func
}
