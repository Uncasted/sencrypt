import {IMAGES, LOWERCASE, NUMBERS, SYMBOLS, UPPERCASE} from "../../data/constants"
import {useEffect, useState} from "react"
import ParameterProvider, {
    useParameterContext,
    useParameterContextUpdate
} from "../../context/Generator/ParameterContext"
import ClipboardProvider, {useClipboardContext, useClipboardContextUpdate} from "../../context/ClipboardContext"
import PasswordProvider, {usePasswordContext, usePasswordContextUpdate} from "../../context/Generator/PasswordContext"

export function Generator() {
    return (
        <>
            <div className="pl-6 pt-6 bg-dark-blue-2 text-white">
                <GeneratorHeader/>
            </div>
            <div className="ml-6 mt-6 flex flex-col text-white justify-center h-[60vh]">
                <div className="mt-6 mx-auto">
                    <ParameterProvider>
                        <PasswordProvider>
                            <ClipboardProvider>
                                <PasswordGenerator/>
                            </ClipboardProvider>
                            <div className="relative mt-8 px-6 py-6 bg-dark-blue-0 w-[36rem] xl:w-[48rem] xl:py-12
                            shadow-md">
                                <GeneratorParameters/>
                            </div>
                        </PasswordProvider>
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
                <img src={IMAGES.GENERATOR_ICON}
                     alt="Generator icon"
                     className="mr-1"/>
                Generator
            </h1>
            <div className="shadow-md ml-[-1.5rem] h-4"></div>
        </div>
    )
}

function PasswordGenerator() {
    // Context
    const clipboard = useClipboardContext().title
    const addToClipboard = useClipboardContextUpdate()
    const password = usePasswordContext()

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
        <div className="flex space-x-2 items-center">
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
                       className="text-black pl-2 w-[36rem] xl:w-[48rem] py-1.5 text-lg focus:outline-none focus:ring
                       focus:ring-blue-1 transition"/>
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
                    <img src={IMAGES.CLIPBOARD_ICON}
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
    const updatePassword = usePasswordContextUpdate()

    // State
    const [useLower, setUseLower] = useState(parameters.includes(LOWERCASE))
    const [useUpper, setUseUpper] = useState(parameters.includes(UPPERCASE))
    const [useNumbers, setUseNumbers] = useState(parameters.includes(NUMBERS))
    const [useSymbols, setUseSymbols] = useState(parameters.includes(SYMBOLS))

    // Slider progress bar.
    useEffect(() => {
        const parameters = JSON.parse(localStorage.getItem('generator')) ?? {}
        // Progress bar for the password generator length.
        // Thank you https://github.com/toughengineer!
        const slider = document.querySelector('input[type="range"].slider-progress')
        // Get the length from local storage or use the default value.
        slider.style.setProperty('--value', parameters.length ?? slider.value)
        slider.style.setProperty('--min', slider.min === '' ? '0' : slider.min)
        slider.style.setProperty('--max', slider.max === '' ? '100' : slider.max)
        slider.addEventListener('input', () => slider.style.setProperty('--value', slider.value))

        return () => {
            slider.removeEventListener('input', () => {
                slider.style.setProperty('--value', slider.value)
            })
        }
    }, [length])

    const handleLength = (event) => {
        const min = 0
        const max = 48

        // Make sure that the input is between the range.
        const inputLength = Math.max(min, Math.min(max, Number(event.target.value)))
        update.updateLength(String(inputLength))
    }

    const updateParameter = (type) => {
        switch (type) {
            case LOWERCASE:
                if (!useLower) {
                    update.addParameter(LOWERCASE)
                } else {
                    update.delParameter(LOWERCASE)
                }
                setUseLower(!useLower)
                break
            case UPPERCASE:
                if (!useUpper) {
                    update.addParameter(UPPERCASE)
                } else {
                    update.delParameter(UPPERCASE)
                }
                setUseUpper(!useUpper)
                break
            case NUMBERS:
                if (!useNumbers) {
                    update.addParameter(NUMBERS)
                } else {
                    update.delParameter(NUMBERS)
                }
                setUseNumbers(!useNumbers)
                break
            case SYMBOLS:
                if (!useSymbols) {
                    update.addParameter(SYMBOLS)
                } else {
                    update.delParameter(SYMBOLS)
                }
                setUseSymbols(!useSymbols)
        }
    }


    return (
        <div>
            <div className="mb-4 pr-4">
                <div>
                <span className="text-sm no-select">
                    Length:
                </span>
                    <input type="number"
                           min="4"
                           max="48"
                           value={length}
                           onChange={handleLength}
                           onKeyDown={(event) => {
                               // Prevent user from creating decimal numbers.
                               if (event.key === ".") {
                                   event.preventDefault()
                               }
                           }}
                           className="bg-dark-blue-4 ml-2 w-10 text-center rounded-sm focus:outline-gray-200"/>
                </div>
                <input type="range"
                       min="4"
                       max="48"
                       value={length}
                       onChange={(event) => {
                           update.updateLength(event.target.value)
                       }}
                       className="custom-slider slider-progress w-full cursor-pointer focus:outline-gray-200"/>
            </div>
            <div className="flex flex-col space-y-4">
                <div className="space-x-2 flex items-center">
                    <input type="checkbox"
                           checked={useLower}
                           onClick={() => {
                               updateParameter(LOWERCASE)
                           }}
                           onKeyDown={(event) => {
                               if (event.key === "Enter") {
                                   updateParameter(LOWERCASE)
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
                               updateParameter(UPPERCASE)
                           }}
                           onKeyDown={(event) => {
                               if (event.key === "Enter") {
                                   updateParameter(UPPERCASE)
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
                               updateParameter(NUMBERS)
                           }}
                           onKeyDown={(event) => {
                               if (event.key === "Enter") {
                                   updateParameter(NUMBERS)
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
                               updateParameter(SYMBOLS)
                           }}
                           onKeyDown={(event) => {
                               if (event.key === "Enter") {
                                   updateParameter(SYMBOLS)
                               }
                           }}
                           className="checkbox checkbox-sm checkbox-primary rounded-none border-2"/>
                    <span className="no-select">
                        Symbols
                    </span>
                </div>
            </div>
            <div className="absolute bottom-4 right-4">
                <button disabled={parameters.length === 0 || length === 0}
                        onClick={() => {
                            updatePassword(parameters, length)
                        }}
                        className="bg-blue-3 px-8 py-2 shadow-md hover:bg-blue-1 transition active:bg-blue-2
                        focus:outline-gray-200 disabled:text-gray-300 disabled:bg-dark-blue-4
                        disabled:cursor-not-allowed">
                    Generate
                </button>
            </div>
        </div>
    )
}