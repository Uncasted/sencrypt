import { useEffect } from 'react'
import { TRAY_BUTTONS } from './data/constants.js'
import TrayButton from './components/TrayButton.jsx'
import PropTypes from 'prop-types'

export default function TrayMenu () {
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
    <nav className='text-white inset-0'>
      <ul id='section-list' className='flex flex-col'>
        {TRAY_BUTTONS.map(button => {
          return (
            <li key={button.title}>
              <TrayButton
                title={button.title}
                icon={button.icon}
                altIcon={button.altIcon}
              />
            </li>
          )
        })}
      </ul>
    </nav>
  )
}

TrayMenu.propTypes = {
  changeSelected: PropTypes.func
}
