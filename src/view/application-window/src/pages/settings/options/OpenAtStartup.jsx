import Checkbox from '../../../components/Checkbox'
import Option from '../../../components/Option'
import { useSettingsContext, useSettingsContextUpdate } from '../../../context/settings/SettingsContext'
import { useEffect, useState } from 'react'
import Dropdown from '../../../components/dropdown/Dropdown'
import { OPTIONS_LIST } from '../../../data/constants'
import { useToggleTrayContext } from '../../../context/settings/ToggleTrayContext'

export default function OpenAtStartup () {
  // Context
  const { openAtStartup } = useSettingsContext()
  const updateSetting = useSettingsContextUpdate()
  const toggleTray = useToggleTrayContext()

  // State
  const [toggleStartup, setIsStartup] = useState(openAtStartup ?? false)
  const [selected, setSelected] = useState(OPTIONS_LIST[0].title)

  // Updating the minimized setting.
  useEffect(() => {
    updateSetting('startupMinimized', selected === 'Minimized')
  }, [selected])

  // Updating the setting if the toggle tray value changes.
  useEffect(() => {
    if (!toggleTray) {
      handleSelected(0, 'Full')
    }
  }, [toggleTray])

  const handleSelected = (index, value) => {
    // Changing the background back to default in the options.
    for (const option of OPTIONS_LIST) {
      option.bgColor = '[#00293d]'
    }
    // Changing the background of the selected value.
    const selectedOption = OPTIONS_LIST[index]
    selectedOption.bgColor = '[#003d5c]'
    // Setting the selected value.
    setSelected(() => value)
  }

  const handleStartup = () => {
    // Update the startup value in the main process.
    window.settings.toggleStartup(!openAtStartup)
    // Update the setting.
    updateSetting('openAtStartup', !openAtStartup)
    // Update the local state.
    setIsStartup(openAtStartup => !openAtStartup)
  }

  return (
    <Option label='Open at startup'>
      <div className='flex'>
        <Dropdown
          options={OPTIONS_LIST}
          selected={selected}
          handleSelected={handleSelected}
          disabled={!toggleStartup || !toggleTray}
        />
        <Checkbox
          id='openStartup-option'
          checked={toggleStartup}
          onClick={handleStartup}
          onKeyDown={event => {
            if (event.key === 'Enter') {
              // This is bad, but if I don't do this it doesn't work.
              const checkbox = document.getElementById('openStartup-option')
              checkbox.click()
            }
          }}
        />
      </div>
    </Option>
  )
}
