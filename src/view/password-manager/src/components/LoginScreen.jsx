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
        setIsMP(isMasterPassword)
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
                    transition bg-dark-blue-4 "/>
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
        }
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
                    transition bg-dark-blue-4"/>
                    </label>
                    <label htmlFor="confirmMasterPassword" className="space-y-2 text-white">
                        <p>Confirm your Master Password:</p>
                        <input id="confirmPassword" name="confirmPassword" type="password" className="pl-2 rounded-sm h-8
                    transition bg-dark-blue-4"/>
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