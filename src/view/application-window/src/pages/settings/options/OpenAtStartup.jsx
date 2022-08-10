import Checkbox from '../../../components/Checkbox'
import Option from '../../../components/Option'
import { useSettingsContext, useSettingsContextUpdate } from '../../../context/settings/SettingsContext'
import { useState } from 'react'

export default function OpenAtStartup () {
  // Context
  const { openAtStartup } = useSettingsContext()
  const updateSetting = useSettingsContextUpdate()

  // State
  const [toggleStartup, setIsStartup] = useState(openAtStartup ?? false)

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
    </Option>
  )
}
