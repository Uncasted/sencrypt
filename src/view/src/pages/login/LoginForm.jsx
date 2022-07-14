import {useState} from "react"
import {IMAGES} from "../../data/constants"
import InputField from "../../components/forms/InputField"
import SecondaryButton from "../../components/buttons/SecondaryButton"

export default function LoginForm(props) {
    // State
    const [isMP, setIsMP] = useState(false)
    const [masterPassword, setMasterPassword] = useState("")

    const verifyMasterPassword = async (event) => {
        event.preventDefault()
        // Verify the master password in the database.
        const isMasterPassword = await window.controller.verifyMasterPassword(masterPassword)

        if (isMasterPassword) {
            setIsMP(isMasterPassword)
        } else {
            // Invalid master password warning.
            const warning = document.getElementById("invalid-mp")
            const masterPass = document.getElementById("masterPassword")

            // Show warning and make outline of input red.
            warning.classList.remove("invisible")
            masterPass.classList.remove("focus:ring", "focus:ring-blue-1")
            masterPass.classList.add("outline", "focus:outline", "focus:outline-red-500")
        }
    }

    const removeWarning = () => {
        // Remove the red warning for the login form.
        const masterPass = document.getElementById("masterPassword")
        const warning = document.getElementById("invalid-mp")

        warning.classList.add("invisible")
        masterPass.classList.remove("outline", "focus:outline", "focus:outline-red-500")
        masterPass.classList.add("focus:ring", "focus:ring-blue-1")
    }

    return (
        <>
            {!isMP ?
                <div className="bg-dark-blue-1 w-[100vw] h-[100vh] flex flex-col items-center justify-center space-y-10"
                >
                    <div>
                        <img src={IMAGES.LOGO}
                             alt="Sencrypt"
                             className="w-72"/>
                    </div>
                    <form onSubmit={verifyMasterPassword}
                          className="flex flex-col space-y-6 items-center">
                        <label htmlFor="masterPassword"
                               className="gap-y-2 text-white">
                            <InputField autoFocus={true}
                                        title="Enter your Master Password:"
                                        type="password"
                                        fieldId="masterPassword"
                                        name="masterPassword"
                                        minLength={1}
                                        maxLength={32}
                                        removeWarning={removeWarning}
                                        input={masterPassword}
                                        setInput={setMasterPassword}
                            />
                            <p id="invalid-mp"
                               className="invisible text-red-500">
                                Invalid Master Password.
                            </p>
                        </label>
                        <SecondaryButton type="submit"
                                         disabled={!masterPassword}
                                         hoverColor="blue-1"
                                         activeColor="blue-2"
                        >
                            Log in
                        </SecondaryButton>
                    </form>
                </div>
                // If the master password is valid render the rest of the app.
                : props.children
            }
        </>
    )
}
