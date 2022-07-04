import {useState} from "react"
import {images} from "../App"

export default function LoginScreen(props) {
    const [isMP, setIsMP] = useState(false)

    const verifyMasterPassword = async (input) => {
        const result = await window.controller.verifyMasterPassword(input)
        setIsMP(result)
    }

    return (
        <>
            {!isMP ? <LoginForm verifyMP={verifyMasterPassword}/> : props.children}
        </>
    )
}

function LoginForm(props) {
    const submitPassword = (event) => {
        event.preventDefault()
        const form = event.target.elements
        props.verifyMP(form['masterPassword'].value)
    }

    return (
        <div className="bg-dark-blue-1 w-[100vw] h-[100vh] flex flex-col items-center justify-center
        space-y-10">
            <div>
                <img src={images.logo} className="w-72"/>
            </div>
            <form onSubmit={submitPassword} className="flex flex-col space-y-6 items-center">
                <label htmlFor="masterPassword" className="space-y-2 text-white">
                    <p>Enter your Master Password:</p>
                    <input id="masterPassword" name="masterPassword" type="password" className="pl-2 rounded-sm h-8
                    transition bg-dark-blue-4 "/>
                </label>
                <button className="bg-blue-3 hover:bg-blue-1 transition text-white px-4 py-2 shadow-md">
                    Log in
                </button>
            </form>
        </div>
    )
}