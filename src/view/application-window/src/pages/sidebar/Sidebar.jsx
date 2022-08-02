import { useEffect } from 'react'
import { SIDEBAR_BUTTONS } from '../../data/constants'
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

  return (
    <nav className={` ${isCollapsed} bg-[#000e14] text-white inset-0 h-[100vh] pt-2 fixed z-10`}>
      <ul id='section-list' className='flex flex-col text-lg mt-8'>
        {SIDEBAR_BUTTONS.map(button => {
          return (
            <li key={button.title}>
              <SidebarButton
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
    </nav>
  )
}

Sidebar.propTypes = {
  changeSelected: PropTypes.func
}
