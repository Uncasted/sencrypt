import {useState} from "react"
import {IMAGES} from "../../data/constants"
import InputField from "../../components/forms/InputField"
import SecondaryButton from "../../components/buttons/SecondaryButton"

export default function NewUserForm(props) {
    // State
    const [isCreatedMP, setIsCreatedMP] = useState(false)
    const [password, setPassword] = useState("")
    const [confirmPass, setConfirmPass] = useState("")

    const createPassword = async (event) => {
        event.preventDefault()

        if (password === confirmPass) {
            // Initialize the database with the new password.
            const isCreated = await window.controller.createMasterPassword(password)
            setIsCreatedMP(isCreated)
        } else {
            // Display warning.
            const warning = document.getElementById("no-match-mp")
            warning.classList.remove("invisible")
            // Add red outlines to inputs.
            const fields = document.querySelectorAll(`[data-outline="new-user"]`)

            for (const field of fields) {
                field.classList.remove("focus:ring", "focus:ring-blue-1")
                field.classList.add("outline", "focus:outline", "focus:outline-red-500")
            }
        }
    }

    const removeWarning = () => {
        // Remove the warning for invalid form.
        const warning = document.getElementById("no-match-mp")
        warning.classList.add("invisible")

        const fields = document.querySelectorAll(`[data-outline="new-user"]`)

        for (const field of fields) {
            field.classList.remove("outline", "focus:outline", "focus:outline-red-500")
            field.classList.add("focus:ring", "focus:ring-blue-1")
        }
    }

    return (
        <>
            {!isCreatedMP ?
                <div className="bg-dark-blue-1 w-[100vw] h-[100vh] flex flex-col items-center justify-center space-y-10"
                >
                    <div>
                        <img src={IMAGES.LOGO}
                             alt="Sencrypt"
                             className="w-72"/>
                    </div>
                    <form onSubmit={createPassword}
                          className="flex flex-col space-y-6 items-center">
                        <label htmlFor="masterPassword"
                               className="gap-y-2 text-white">
                            <InputField autoFocus={true}
                                        title="Create your Master Password:"
                                        type="password"
                                        fieldId="masterPassword"
                                        name="masterPassword"
                                        dataOutline="new-user"
                                        minLength={1}
                                        maxLength={32}
                                        input={password}
                                        setInput={setPassword}
                                        removeWarning={removeWarning}
                            />
                        </label>
                        <label htmlFor="confirmMasterPassword"
                               className="gap-y-2 text-white"
                        >
                            <InputField title="Confirm your Master Password:"
                                        type="password"
                                        fieldId="confirmPassword"
                                        name="confirmPassword"
                                        dataOutline="new-user"
                                        minLength={1}
                                        maxLength={32}
                                        input={confirmPass}
                                        setInput={setConfirmPass}
                                        removeWarning={removeWarning}
                            />
                            <p id="no-match-mp"
                               className="invisible text-red-500 mt-2">
                                The passwords do not match.
                            </p>
                        </label>
                        <SecondaryButton type="submit"
                                         disabled={!password || !confirmPass}
                                         hoverColor="blue-1"
                                         activeColor="blue-2"
                        >
                            Sign up
                        </SecondaryButton>
                    </form>
                </div>
                // Render the rest of the app after creating the master password.
                : props.children
            }
        </>
    )
}