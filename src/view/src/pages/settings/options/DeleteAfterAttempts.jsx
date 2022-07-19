import Checkbox from "../../../components/Checkbox"
import InputNumberBox from "../../../components/InputNumberBox"
import Option from "../../../components/Option"
import {useSettingsContext, useSettingsContextUpdate} from "../../../context/settings/SettingsContext"
import {useState} from "react"
import {getMinMaxValue} from "../../../utils/utility"

export default function DeleteAfterAttempts() {
    // Context
    const {deleteAttempts, deleteAfterAttempts} = useSettingsContext()
    const updateSetting = useSettingsContextUpdate()

    // State
    const [toggleDeleteAttempts, setToggleDeleteAttempts] = useState(deleteAfterAttempts || false)
    const [attempts, setAttempts] = useState(String(deleteAttempts || 10))

    const updateAttempts = (value) => {
        // Get the min max value.
        const newAttempts = getMinMaxValue(0, 99, value)
        // Update the settings file.
        updateSetting("deleteAttempts", newAttempts).then(() => {
            // Update the state.
            setAttempts(String(newAttempts))
        })
    }

    return (
        <Option label="Delete Accounts After Failing To Log In (tries):">
            <div className="flex space-x-4">
                <Checkbox checked={toggleDeleteAttempts}
                          onClick={() => {
                              // Update the setting.
                              updateSetting("deleteAfterAttempts", !deleteAfterAttempts)
                              // Update the local state.
                              setToggleDeleteAttempts(toggleDeleteAttempts => !toggleDeleteAttempts)
                          }}
                          onKeyDown={(event) => {
                              if (event.key === "Enter") {
                                  // Update the setting.
                                  updateSetting("deleteAfterAttempts", !deleteAfterAttempts)
                                  // Update the local state.
                                  setToggleDeleteAttempts(toggleDeleteAttempts => !toggleDeleteAttempts)
                              }
                          }}
                />
                <div className="bg-dark-blue-2">
                    <InputNumberBox min={5}
                                    max={99}
                                    value={attempts}
                                    onChange={(event) => {
                                        updateAttempts(event.target.value)
                                    }}
                                    onKeyDown={(event) => {
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