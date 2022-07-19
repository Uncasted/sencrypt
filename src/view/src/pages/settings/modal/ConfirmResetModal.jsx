import ModalHeader from "../../../components/headers/ModalHeader"
import SecondaryButton from "../../../components/buttons/SecondaryButton"
import InputField from "../../../components/forms/InputField"
import {useRef, useState} from "react"
import {BLUE_OUTLINE, RED_OUTLINE} from "../../../data/constants"

export default function ConfirmResetModal(props) {
    // State
    const [masterPass, setMasterPass] = useState("")

    // Ref
    const warningRef = useRef(null)
    const masterPassRef = useRef(null)

    const removeWarning = () => {
        // Remove the warning from the input field.
        const field = masterPassRef.current
        field.classList.remove(...RED_OUTLINE)
        field.classList.add(...BLUE_OUTLINE)
        // Make the warning invisible.
        const warning = warningRef.current
        warning.classList.add("invisible")
    }

    const resetMasterPassword = () => {
        // Verify the master password.
        window.database.verifyMasterPassword(masterPass).then(isMasterPassword => {
            if (isMasterPassword) {
                // Reset the master password.
                window.database.resetMasterPassword(props.newPassword).then(() => {
                    // Reload the application.
                    window.location.reload()
                })
            } else {
                // Warn the user.
                const field = masterPassRef.current
                field.classList.remove(...BLUE_OUTLINE)
                field.classList.add(...RED_OUTLINE)
                // Show the user the warning.
                const warning = warningRef.current
                warning.classList.remove("invisible")
            }
        })
    }

    return (
        <div>
            <input type="checkbox"
                   id="confirm-reset-modal"
                   tabIndex="-1"
                   className="modal-toggle"
            />
            <div className="modal">
                <div id="confirm-reset-box"
                     tabIndex="30"
                     className="modal-box bg-dark-blue-1 rounded-none px-0 py-0 w-[400px] shadow-sm
                       text-white focus:outline-none"
                >
                    <ModalHeader htmlFor="confirm-reset-modal"
                                 tabIndex={33}
                    >
                        Are you sure?
                    </ModalHeader>
                    <div className="flex flex-col">
                        <div>
                            <h1 className="text-md ml-4">
                                Are you sure you want to reset your master password?
                            </h1>
                        </div>
                        <div className="flex flex-col items-center mt-8 space-y-6 mb-6">
                            <div>
                                <InputField type="password"
                                            name="oldMasterPass"
                                            fieldId="oldMasterPass"
                                            title="Enter your master password:"
                                            tabIndex={31}
                                            ref={masterPassRef}
                                            value={masterPass}
                                            removeWarning={removeWarning}
                                            onChange={(input) => {
                                                setMasterPass(input)
                                            }}
                                />
                                <p ref={warningRef}
                                   className="invisible text-red-500">
                                    Invalid Master Password
                                </p>
                            </div>
                            {/*Reset master password button.*/}
                            <div className="mx-auto">
                                <label htmlFor="confirm-reset-modal">
                                    <SecondaryButton type="button"
                                                     tabIndex={32}
                                                     hoverColor="red-500"
                                                     activeColor="red-600"
                                                     onClick={resetMasterPassword}
                                                     disabled={!masterPass}
                                    >
                                        Reset Master Password
                                    </SecondaryButton>
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}