import { useEffect } from 'react'
import { NAVBAR_BUTTONS } from '../../data/constants'
import NavbarButton from '../../components/buttons/NavbarButton'
import PropTypes from 'prop-types'

export function Navbar (props) {
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
    <nav className='bg-dark-blue-1 text-white inset-0 w-[250px] h-[100vh] pt-4 fixed z-0'>
      <ul id='section-list' className='flex flex-col text-lg mt-8'>
        {NAVBAR_BUTTONS.map(button => {
          return (
            <li key={button.title}>
              <NavbarButton
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

Navbar.propTypes = {
  changeSelected: PropTypes.func
}
