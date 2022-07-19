import {useRef, useState} from "react"
import {BLUE_OUTLINE, RED_OUTLINE, RESET_PASS_FIELDS} from "../../../data/constants"
import ModalHeader from "../../../components/headers/ModalHeader"
import InputField from "../../../components/forms/InputField"
import SecondaryButton from "../../../components/buttons/SecondaryButton"
import ConfirmResetModal from "./ConfirmResetModal"

export function ResetPasswordModal() {
    // State
    const [passwords, setPasswords] = useState({
        newPass: "",
        confirmNewPass: ""
    })

    // Ref
    const warningRef = useRef(null)

    const updateField = (field, value) => {
        // Set new password.
        setPasswords(passwords => {
            const newPasswords = {...passwords}
            newPasswords[field] = value
            return newPasswords
        })
    }

    const removeWarning = () => {
        // Remove the warning for the input fields.
        const fields = document.querySelectorAll(`[data-outline="reset-modal-outline"]`)
        // Remove the red outline.
        for (const field of fields) {
            field.classList.remove(...RED_OUTLINE)
            field.classList.add(...BLUE_OUTLINE)
        }
        // Make the warning invisible.
        const warning = warningRef.current
        warning.classList.add("invisible")
    }

    const submitData = (event) => {
        event.preventDefault()

        if (passwords.newPass === passwords.confirmNewPass) {
            // Open the confirmation modal.
            const confirmModal = document.getElementById("confirm-reset-modal")
            confirmModal.click()
        } else {
            // Warn the user.
            const fields = document.querySelectorAll(`[data-outline="reset-modal-outline"]`)

            // Make the outline of the fields red.
            for (const field of fields) {
                field.classList.remove(...BLUE_OUTLINE)
                field.classList.add(...RED_OUTLINE)
            }

            // Show the user the warning.
            const warning = warningRef.current
            warning.classList.remove("invisible")
        }
    }

    return (
        <>
            <input type="checkbox"
                   id="reset-modal"
                   tabIndex="-1"
                   className="modal-toggle"
            />
            <div className="modal">
                <div
                    className="modal-box bg-dark-blue-1 text-white rounded-none px-0 py-0 w-[350px] shadow-sm">
                    <ModalHeader htmlFor="reset-modal"
                                 tabIndex={14}
                    >
                        Reset Master Password:
                    </ModalHeader>
                    <form id="reset-form"
                          onSubmit={submitData}
                          className="flex flex-col items-center space-y-4"
                    >
                        {RESET_PASS_FIELDS.map(field => {
                            return (
                                <InputField type={field.type}
                                            name={field.name}
                                            fieldId={field.id}
                                            title={field.title}
                                            tabIndex={field.tabIndex}
                                            dataOutline="reset-modal-outline"
                                            value={passwords[field.value]}
                                            removeWarning={removeWarning}
                                            onChange={(input) => {
                                                updateField(field.value, input)
                                            }}
                                />
                            )
                        })}
                        <p ref={warningRef}
                           className="invisible text-red-500"
                        >
                            The passwords do not match.
                        </p>
                        {/*Add account button.*/}
                        <div className="modal-action">
                            <label htmlFor="reset-modal"
                                   id="reset-modal-button"
                                   className="mb-6 mt-[-1rem]"
                            >
                                <SecondaryButton type="submit"
                                                 form="reset-form"
                                                 tabIndex={13}
                                                 disabled={!passwords.newPass || !passwords.confirmNewPass}
                                                 hoverColor="red-500"
                                                 activeColor="red-600"
                                >
                                    Reset Password
                                </SecondaryButton>
                            </label>
                        </div>
                    </form>
                </div>
            </div>
            {/*Confirm reset Modal.*/}
            <ConfirmResetModal newPassword={passwords.newPass}
            />
        </>
    )
}