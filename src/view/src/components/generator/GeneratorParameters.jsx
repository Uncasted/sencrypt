import {useParameterContext, useParameterContextUpdate} from "../../context/generator/ParameterContext"
import {usePasswordContextUpdate} from "../../context/generator/PasswordContext"
import {useEffect, useState} from "react"
import {LOWERCASE, NUMBERS, SYMBOLS, UPPERCASE} from "../../data/constants"

export default function GeneratorParameters() {
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