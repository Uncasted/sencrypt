import {useState} from "react"
import {IMAGES} from "../../data/constants"

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
                               className="space-y-2 text-white">
                            <p>
                                Create your Master Password:
                            </p>
                            <input autoFocus
                                   id="masterPassword"
                                   name="masterPassword"
                                   type="password"
                                   minLength="1"
                                   maxLength="32"
                                   data-outline="new-user"
                                   value={password}
                                   onChange={e => {
                                       removeWarning()
                                       setPassword(e.target.value)
                                   }}
                                   onClick={removeWarning}
                                   className="pl-2 rounded-sm h-8 transition bg-dark-blue-4 outline-2 outline-red-500
                                   focus:outline-none focus:ring focus:ring-blue-1"/>
                        </label>
                        <label htmlFor="confirmMasterPassword"
                               className="space-y-2 text-white">
                            <p>
                                Confirm your Master Password:
                            </p>
                            <input id="confirmPassword"
                                   name="confirmPassword"
                                   type="password"
                                   minLength="1"
                                   maxLength="32"
                                   data-outline="new-user"
                                   value={confirmPass}
                                   onChange={e => {
                                       removeWarning()
                                       setConfirmPass(e.target.value)
                                   }}
                                   onClick={removeWarning}
                                   className="pl-2 rounded-sm h-8 transition bg-dark-blue-4 outline-2 outline-red-500
                                   focus:outline-none focus:ring focus:ring-blue-1"/>
                            <p id="no-match-mp"
                               className="invisible text-red-500">
                                The passwords do not match.
                            </p>
                        </label>
                        <button type="submit"
                                disabled={!password || !confirmPass}
                                className="bg-blue-3 hover:bg-blue-1 transition text-white px-4 py-2 shadow-md
                            disabled:text-gray-300 disabled:bg-dark-blue-4 disabled:cursor-not-allowed
                            focus:outline-gray-200">
                            Sign up
                        </button>
                    </form>
                </div>
                : props.children
            }
        </>
    )
}