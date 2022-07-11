// Sketching
import {images} from "../../App"
import {useEffect, useState} from "react"
import ParameterProvider, {useParameterContext, useParameterContextUpdate} from "./Context/ParameterContext"
import ClipboardProvider, {useClipboardContext, useClipboardContextUpdate} from "../Global Context/ClipboardContext"

export function Generator() {
    return (
        <>
            <div className="pl-6 pt-6 bg-dark-blue-2 text-white">
                <GeneratorHeader/>
            </div>
            <div className="ml-6 mt-6 flex flex-col text-white">
                <div className="mt-6 mx-auto">
                    <ParameterProvider>
                        <ClipboardProvider>
                            <PasswordGenerator/>
                        </ClipboardProvider>
                        <div className="mt-8 px-6 py-6 bg-dark-blue-2 w-[32rem] shadow-md">
                            <GeneratorParameters/>
                        </div>
                    </ParameterProvider>
                </div>
            </div>
        </>
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
    const clipboard = useClipboardContext().title
    const addToClipboard = useClipboardContextUpdate()

    // Run generatePassword when the component gets mounted for the first time.
    // Otherwise, get the last generated password from localStorage.
    useEffect(() => {
        const localGeneratedPass = window.localStorage.getItem("generatedPass") ?? ""
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

    const selectToClipboard = () => {
        // Copy to clipboard.
        navigator.clipboard.writeText(password).then()
        // Show the tooltip.
        const tooltip = document.getElementById("gen-pass-tooltip")
        tooltip.classList.add("tooltip", "tooltip-open")
        setTimeout(() => {
            tooltip.classList.remove("tooltip", "tooltip-open")
        }, 2000)
    }

    return (
        <div className="flex space-x-4 items-center">
            <div data-tip="Copied!"
                 id="gen-pass-tooltip"
                 className="tooltip-bg">
                <input readOnly
                       type="text"
                       value={password}
                       onClick={selectToClipboard}
                       onKeyDown={(event) => {
                           if (event.key === "Enter") {
                               selectToClipboard()
                           }
                       }}
                       className="text-black pl-2 w-[32rem] py-1.5 text-lg focus:outline-none focus:ring
                       focus:ring-blue-1 transition"/>
            </div>
            <div>
                <button disabled={parameters.length === 0}
                        onClick={generatePassword}
                        className="bg-dark-blue-1 px-8 py-2 shadow-md hover:bg-blue-1 transition active:bg-blue-2
                        focus:outline-gray-200">
                    Generate
                </button>
            </div>
            <div>
                <button data-tip={clipboard}
                        onFocus={(event) => {
                            event.target.classList.add("tooltip-open")
                        }}
                        onBlur={(event) => {
                            event.target.classList.remove("tooltip-open")
                        }}
                        onMouseOut={(event) => {
                            event.target.classList.remove("tooltip-open")
                        }}
                        onClick={() => {
                            addToClipboard('title', password)
                        }}
                        className="px-1 py-1 tooltip tooltip-right tooltip-bg focus:outline-gray-200">
                    <img src={images.clipboardIcon}
                         alt="Copy password to clipboard."/>
                </button>
            </div>
        </div>
    )
}

function GeneratorParameters() {
    // Context
    const {length, parameters} = useParameterContext()
    const update = useParameterContextUpdate()

    // State
    const [useLower, setUseLower] = useState(parameters.includes("LOWERCASE"))
    const [useUpper, setUseUpper] = useState(parameters.includes("UPPERCASE"))
    const [useNumbers, setUseNumbers] = useState(parameters.includes("NUMBERS"))
    const [useSymbols, setUseSymbols] = useState(parameters.includes("SYMBOLS"))

    const updateParameter = (type) => {
        switch (type) {
            case "LOWERCASE":
                if (!useLower) {
                    update.addParameter("LOWERCASE")
                } else {
                    update.delParameter("LOWERCASE")
                }
                setUseLower(!useLower)
                break
            case "UPPERCASE":
                if (!useUpper) {
                    update.addParameter("UPPERCASE")
                } else {
                    update.delParameter("UPPERCASE")
                }
                setUseUpper(!useUpper)
                break
            case "NUMBERS":
                if (!useNumbers) {
                    update.addParameter("NUMBERS")
                } else {
                    update.delParameter("NUMBERS")
                }
                setUseNumbers(!useNumbers)
                break
            case "SYMBOLS":
                if (!useSymbols) {
                    update.addParameter("SYMBOLS")
                } else {
                    update.delParameter("SYMBOLS")
                }
                setUseSymbols(!useSymbols)
        }
    }

    return (
        <div>
            <div className="mb-4 pr-4">
                <p className="text-sm no-select">
                    Length ({length})
                </p>
                <input type="range"
                       min="4"
                       max="48"
                       value={length}
                       onChange={(e) => {
                           update.updateLength(e.target.value)
                       }}
                       className="custom-slider slider-progress w-full cursor-pointer focus:outline-gray-200"/>
            </div>
            <div className="flex flex-col space-y-4">
                <div className="space-x-2 flex items-center">
                    <input type="checkbox"
                           checked={useLower}
                           onClick={() => {
                               updateParameter("LOWERCASE")
                           }}
                           onKeyDown={(event) => {
                               if (event.key === "Enter") {
                                   updateParameter("LOWERCASE")
                               }
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
                               updateParameter("UPPERCASE")
                           }}
                           onKeyDown={(event) => {
                               if (event.key === "Enter") {
                                   updateParameter("UPPERCASE")
                               }
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
                               updateParameter("NUMBERS")
                           }}
                           onKeyDown={(event) => {
                               if (event.key === "Enter") {
                                   updateParameter("NUMBERS")
                               }
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
                               updateParameter("SYMBOLS")
                           }}
                           onKeyDown={(event) => {
                               if (event.key === "Enter") {
                                   updateParameter("SYMBOLS")
                               }
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