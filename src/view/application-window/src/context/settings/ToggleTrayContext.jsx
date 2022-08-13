import { createContext, useState, useContext } from 'react'
import { useSettingsContext, useSettingsContextUpdate } from './SettingsContext'
import PropTypes from 'prop-types'

const ToggleTrayContext = createContext()
const ToggleTrayContextUpdate = createContext()

export function useToggleTrayContext () {
  return useContext(ToggleTrayContext)
}

export function useToggleTrayContextUpdate () {
  return useContext(ToggleTrayContextUpdate)
}

export default function ToggleTrayProvider (props) {
  // Context
  const { minToTray } = useSettingsContext()
  const updateSetting = useSettingsContextUpdate()

  // State
  const [toggleTray, setToggleTray] = useState(minToTray ?? false)

  const handleTray = () => {
    // Toggle the tray menu process.
    window.settings.toggleTray(!minToTray)
    // Update the setting.
    updateSetting('minToTray', !minToTray)
    // Update the local state.
    setToggleTray(toggleTray => !toggleTray)
  }

  return (
    <ToggleTrayContext.Provider value={toggleTray}>
      <ToggleTrayContextUpdate.Provider value={handleTray}>
        {props.children}
      </ToggleTrayContextUpdate.Provider>
    </ToggleTrayContext.Provider>
  )
}

ToggleTrayContext.propTypes = {
  children: PropTypes.node
}
