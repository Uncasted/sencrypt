import {useState, useEffect} from "react"
import {images} from "../App"

export default function LoginScreen(props) {
    const [isNewUser, setIsNewUser] = useState(false)

    useEffect(() => {
        window.controller.checkIsNew().then(isNew => setIsNewUser(isNew))
    }, [])

    return (
        <>
            {isNewUser ? <NewUserForm children={props.children}/> : <LoginForm children={props.children}/>}
        </>
    )
}

function LoginForm(props) {
    const [isMP, setIsMP] = useState(false)

    const verifyMasterPassword = async (event) => {
        event.preventDefault()
        const form = event.target.elements
        const password = form['masterPassword'].value

        const isMasterPassword = await window.controller.verifyMasterPassword(password)
        if (isMasterPassword) {
            setIsMP(isMasterPassword)
        } else {
            // Invalid master password warning.
            const warning = document.getElementById("invalid-mp")
            const masterPass = document.getElementById("masterPassword")

            // Show warning and make outline of input red.
            warning.classList.remove("invisible")
            masterPass.classList.add("outline")
        }
    }

    const removeOutline = () => {
        // Remove the red outline when you click on the password.
        const masterPass = document.getElementById("masterPassword")
        masterPass.classList.remove("outline")
    }

    return (
        <>
            {!isMP ? <div className="bg-dark-blue-1 w-[100vw] h-[100vh] flex flex-col items-center justify-center
        space-y-10">
                <div>
                    <img src={images.logo} className="w-72"/>
                </div>
                <form onSubmit={verifyMasterPassword} className="flex flex-col space-y-6 items-center">
                    <label htmlFor="masterPassword" className="space-y-2 text-white">
                        <p>Enter your Master Password:</p>
                        <input id="masterPassword" name="masterPassword" type="password" className="pl-2 rounded-sm h-8
                    transition bg-dark-blue-4 outline-2 outline-red-500 focus:outline-none" minLength="1"
                               maxLength="32" onClick={removeOutline}/>
                        <p id="invalid-mp" className="invisible text-red-500">Invalid Master Password.</p>
                    </label>
                    <button type="submit"
                            className="bg-blue-3 hover:bg-blue-1 transition text-white px-4 py-2 shadow-md">
                        Log in
                    </button>
                </form>
            </div> : props.children}
        </>
    )
}

function NewUserForm(props) {
    const [isCreatedMP, setIsCreatedMP] = useState(false)

    const createPassword = async (event) => {
        event.preventDefault()
        const form = event.target.elements

        if (form['masterPassword'].value === form['confirmPassword'].value) {
            const password = form['masterPassword'].value
            const isCreated = await window.controller.createMasterPassword(password)
            setIsCreatedMP(isCreated)
        } else {
            // If the passwords are not the same, warn the user.
            const masterPass = document.getElementById("masterPassword")
            const confirmPass = document.getElementById("confirmPassword")
            const warning = document.getElementById("no-match-mp")
            // Display warning.
            warning.classList.remove("invisible")
            // Add red outlines to inputs.
            masterPass.classList.add("outline")
            confirmPass.classList.add("outline")
        }
    }

    const removeOutline = () => {
        // Remove the outline when one of the input elements is clicked.
        const masterPass = document.getElementById("masterPassword")
        const confirmPass = document.getElementById("confirmPassword")

        masterPass.classList.remove("outline")
        confirmPass.classList.remove("outline")
    }

    return (
        <>
            {!isCreatedMP ? <div className="bg-dark-blue-1 w-[100vw] h-[100vh] flex flex-col items-center justify-center
        space-y-10">
                <div>
                    <img src={images.logo} className="w-72"/>
                </div>
                <form onSubmit={createPassword} className="flex flex-col space-y-6 items-center">
                    <label htmlFor="masterPassword" className="space-y-2 text-white">
                        <p>Create your Master Password:</p>
                        <input id="masterPassword" name="masterPassword" type="password" className="pl-2 rounded-sm h-8
                    transition bg-dark-blue-4 outline-2 outline-red-500 focus:outline-none" minLength="1"
                               maxLength="32" onClick={removeOutline}/>
                    </label>
                    <label htmlFor="confirmMasterPassword" className="space-y-2 text-white">
                        <p>Confirm your Master Password:</p>
                        <input id="confirmPassword" name="confirmPassword" type="password" className="pl-2 rounded-sm h-8
                    transition bg-dark-blue-4 outline-2 outline-red-500 focus:outline-none" minLength="1"
                               maxLength="32" onClick={removeOutline}/>
                        <p id="no-match-mp" className="invisible text-red-500">The passwords do not match.</p>
                    </label>
                    <button type="submit"
                            className="bg-blue-3 hover:bg-blue-1 transition text-white px-4 py-2 shadow-md">
                        Start
                    </button>
                </form>
            </div> : props.children}
        </>
    )
}