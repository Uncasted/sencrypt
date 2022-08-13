import Option from '../../../components/Option'
import Checkbox from '../../../components/Checkbox'
import { useToggleTrayContext, useToggleTrayContextUpdate } from '../../../context/settings/ToggleTrayContext'

export default function MinimizeToTray () {
  // Context
  const toggleTray = useToggleTrayContext()
  const handleTray = useToggleTrayContextUpdate()

  return (
    <Option label='Minimize To System Tray On Close'>
      <Checkbox
        id='minToTray-option'
        checked={toggleTray}
        onClick={handleTray}
        onKeyDown={event => {
          if (event.key === 'Enter') {
            // This is bad, but if I don't do this it doesn't work.
            const checkbox = document.getElementById('minToTray-option')
            checkbox.click()
          }
        }}
      />
    </Option>
  )
}
