import { useState } from 'react'
import Option from '../../../components/Option'
import Checkbox from '../../../components/Checkbox'
import { useSettingsContext, useSettingsContextUpdate } from '../../../context/settings/SettingsContext'

export default function MinimizeToTray () {
  // Context
  const { minToTray } = useSettingsContext()
  const updateSetting = useSettingsContextUpdate()

  // State
  const [toggleTray, setToggleTray] = useState(minToTray ?? false)

  const handleTray = () => {
    // Toggle the tray menu process.
    window.tray.toggleTray(!minToTray)
    // Update the setting.
    updateSetting('minToTray', !minToTray)
    // Update the local state.
    setToggleTray(toggleTray => !toggleTray)
  }

  return (
    <Option label='Minimize To System Tray On Close'>
      <Checkbox
        id='minToTray-option'
        checked={toggleTray}
        onClick={handleTray}
        onKeyDown={event => {
          if (event.key === 'Enter') {
            // This is bad, but if I don't do this it doesn't work. Properly.
            const checkbox = document.getElementById('minToTray-option')
            checkbox.click()
          }
        }}
      />
    </Option>
  )
}
