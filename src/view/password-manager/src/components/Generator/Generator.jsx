// Sketching
import {images} from "../../App"
import {useEffect, useState} from "react"
import ParameterProvider, {useParameterContext, useParameterContextUpdate} from "./Context/ParameterContext"

export function Generator() {
    return (
        <div className="ml-6 mt-6 flex flex-col text-white">
            <GeneratorHeader/>
            <ParameterProvider>
                <PasswordGenerator/>
                <div className="mt-8 pl-4 pb-4 bg-dark-blue-2 w-[32rem] shadow-md">
                    <GeneratorParameters/>
                </div>
            </ParameterProvider>
        </div>
    )
}

function GeneratorHeader() {
    return (
        <div className="mb-8 no-select">
            <h1 tabIndex="-1"
                className="text-3xl font-semibold pb-2 flex items-center">
                <img src={images.generatorIcon}
                     alt="Generator icon"
                     className="mr-1"/>
                Generator
            </h1>
            <div className="shadow-md ml-[-1.5rem] h-4"></div>
        </div>
    )
}

function PasswordGenerator() {
    // State
    const [password, setPassword] = useState("")

    // Context
    // Length needs to be converted to a number for the password generator function.
    const length = Number(useParameterContext().length)
    const parameters = useParameterContext().parameters

    // Run generatePassword when the component gets mounted for the first time.
    // Otherwise, get the last generated password from localStorage.
    useEffect(() => {
        const localGeneratedPass = window.localStorage.getItem("generatedPass") || ""
        if (localGeneratedPass) {
            setPassword(localGeneratedPass)
        } else {
            generatePassword()
        }
    }, [])

    const generatePassword = () => {
        const generatedPass = window.utility.generateRandomPassword(parameters, length)
        setPassword(generatedPass)
        // Save the last generated password in localStorage.
        window.localStorage.setItem("generatedPass", generatedPass)
    }

    return (
        <div className="flex space-x-4">
            <div>
                <input readOnly
                       type="text"
                       value={password}
                       onClick={(event) => {
                           // Copy to clipboard.
                           navigator.clipboard.writeText(event.target.value).then()
                       }}
                       className="text-black pl-2 w-[32rem] py-1.5 text-lg focus:outline-gray-200"/>
            </div>
            <div>
                <button disabled={parameters.length === 0}
                        onClick={generatePassword}
                        className="bg-dark-blue-1 px-8 py-2 shadow-md hover:bg-blue-1 transition active:bg-blue-2
                        focus:outline-gray-200">
                    Generate
                </button>
            </div>
        </div>
    )
}

function GeneratorParameters() {
    // State (Default parameters
    const [useLower, setUseLower] = useState(true)
    const [useUpper, setUseUpper] = useState(true)
    const [useNumbers, setUseNumbers] = useState(true)
    const [useSymbols, setUseSymbols] = useState(false)

    // Context
    const length = useParameterContext().length
    const update = useParameterContextUpdate()

    // Load parameter settings from localStorage.
    useEffect(() => {
        // Checkboxes
        const localLower = window.localStorage.getItem("useLower")
        const localUpper = window.localStorage.getItem("useUpper")
        const localNumbers = window.localStorage.getItem("useNumbers")
        const localSymbols = window.localStorage.getItem("useSymbols")

        // If the values exist in localStorage, use them, otherwise, use the default state.
        if (localLower !== null) {
            setUseLower(Boolean(localLower))
        }
        if (localUpper !== null) {
            setUseUpper(Boolean(localUpper))
        }
        if (localNumbers !== null) {
            setUseNumbers(Boolean(localNumbers))
        }
        if (localSymbols !== null) {
            setUseSymbols(Boolean(localSymbols))
        }

    }, [])

    return (
        <div>
            <div className="my-4 pr-4">
                <p className="text-sm no-select">
                    Length ({length})
                </p>
                <input type="range"
                       min="4"
                       max="48"
                       value={length}
                       onChange={(e) => {
                           update.updateLength(e.target.value)
                           window.localStorage.setItem("passLength", e.target.value)
                       }}
                       className="custom-slider slider-progress w-full cursor-pointer focus:outline-gray-200"/>
            </div>
            <div className="flex flex-col space-y-4">
                <div className="space-x-2 flex items-center">
                    <input type="checkbox"
                           checked={useLower}
                           onClick={() => {
                               if (!useLower) {
                                   update.addParameter("LOWERCASE")
                                   // Save setting on local storage.
                                   window.localStorage.setItem("useLower", "true")
                               } else {
                                   update.delParameter("LOWERCASE")
                                   window.localStorage.setItem("useLower", "")
                               }
                               setUseLower(!useLower)
                           }}
                           className="checkbox checkbox-sm checkbox-primary rounded-none border-2"/>
                    <span className="no-select">
                        Lowercase
                    </span>
                </div>
                <div className="space-x-2 flex items-center">
                    <input type="checkbox"
                           checked={useUpper}
                           onClick={() => {
                               if (!useUpper) {
                                   update.addParameter("UPPERCASE")
                                   window.localStorage.setItem("useUpper", "true")
                               } else {
                                   update.delParameter("UPPERCASE")
                                   window.localStorage.setItem("useUpper", "")
                               }
                               setUseUpper(!useUpper)
                           }}
                           className="checkbox checkbox-sm checkbox-primary rounded-none border-2"/>
                    <span className="no-select">
                        Uppercase
                    </span>
                </div>
                <div className="space-x-2 flex items-center">
                    <input type="checkbox"
                           checked={useNumbers}
                           onClick={() => {
                               if (!useNumbers) {
                                   update.addParameter("NUMBERS")
                                   window.localStorage.setItem("useNumbers", "true")
                               } else {
                                   update.delParameter("NUMBERS")
                                   window.localStorage.setItem("useNumbers", "")
                               }
                               setUseNumbers(!useNumbers)
                           }}
                           className="checkbox checkbox-sm checkbox-primary rounded-none border-2"/>
                    <span className="no-select">
                        Numbers
                    </span>
                </div>
                <div className="space-x-2 flex items-center">
                    <input type="checkbox"
                           checked={useSymbols}
                           onClick={() => {
                               if (!useSymbols) {
                                   update.addParameter("SYMBOLS")
                                   window.localStorage.setItem("useSymbols", "true")
                               } else {
                                   update.delParameter("SYMBOLS")
                                   window.localStorage.setItem("useSymbols", "")
                               }
                               setUseSymbols(!useSymbols)
                           }}
                           className="checkbox checkbox-sm checkbox-primary rounded-none border-2"/>
                    <span className="no-select">
                        Symbols
                    </span>
                </div>
            </div>
        </div>
    )
}