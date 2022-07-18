import {createContext, useState, useContext, useEffect} from "react"
import PropTypes from "prop-types"

const SettingsContext = createContext()
const SettingsContextUpdate = createContext()

export function useSettingsContext() {
    return useContext(SettingsContext)
}

export function useSettingsContextUpdate() {
    return useContext(SettingsContextUpdate)
}

export default function SettingsProvider(props) {
    const [settings, setSettings] = useState({})
    // Get the settings from the settings file.
    useEffect(() => {
        window.settings.getSettings().then(settings => {
            setSettings(settings)
        })
    }, [])

    const updateSetting = async (option, value) => {
        // Update the settings file.
        await window.settings.updateSetting(option, value)
        // Update the state.
        setSettings(prevSettings => {
            const newSettings = {...prevSettings}
            newSettings[option] = value
            return newSettings
        })
    }

    return (
        <SettingsContext.Provider value={settings}>
            <SettingsContextUpdate.Provider value={updateSetting}>
                {props.children}
            </SettingsContextUpdate.Provider>
        </SettingsContext.Provider>
    )
}

SettingsContext.propTypes = {
    children: PropTypes.node
}