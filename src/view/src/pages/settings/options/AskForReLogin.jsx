import Checkbox from "../../../components/Checkbox"
import InputNumberBox from "../../../components/InputNumberBox"
import Option from "../../../components/Option"
import {
  useSettingsContext,
  useSettingsContextUpdate,
} from "../../../context/settings/SettingsContext"
import { useState } from "react"
import { getMinMaxValue } from "../../../utils/utility"

export default function AskForReLogin() {
  // Context
  const { loginTimeout, loginTimeoutTime } = useSettingsContext()
  const updateSetting = useSettingsContextUpdate()

  // State
  // We need to use local state for the checkbox, or it doesn't work.
  const [toggleTimeout, setToggleTimeout] = useState(loginTimeout || false)
  const [time, setTime] = useState(() => {
    // Convert the time into minutes
    const time = loginTimeoutTime / 60 || 30
    // Convert it to a string.
    return String(time)
  })

  const updateTime = value => {
    // Get the min max value.
    const newTime = getMinMaxValue(0, 60, value)
    // Convert the time to seconds.
    const timeInSeconds = newTime * 60
    // Update the setting.
    updateSetting("loginTimeoutTime", timeInSeconds).then(() => {
      // Update the state.
      setTime(String(newTime))
    })
  }

  return (
    <Option label="Require Login After Some Time (mins):">
      <div className="flex space-x-4">
        <Checkbox
          checked={toggleTimeout}
          onClick={() => {
            // Update the setting.
            updateSetting("loginTimeout", !loginTimeout)
            // Update the local state.
            setToggleTimeout(toggleTimeout => !toggleTimeout)
          }}
          onKeyDown={event => {
            if (event.key === "Enter") {
              // Update the setting.
              updateSetting("loginTimeout", !loginTimeout)
              // Update the local state.
              setToggleTimeout(toggleTimeout => !toggleTimeout)
            }
          }}
        />
        <div className="bg-dark-blue-2">
          <InputNumberBox
            min={1}
            max={60}
            value={time}
            onChange={event => {
              updateTime(event.target.value)
            }}
            onKeyDown={event => {
              // Prevent user from creating decimal numbers.
              if (event.key === ".") {
                event.preventDefault()
              }
            }}
          />
        </div>
      </div>
    </Option>
  )
}
