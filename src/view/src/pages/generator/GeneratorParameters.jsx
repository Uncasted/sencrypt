import {useParameterContext, useParameterContextUpdate} from "../../context/generator/ParameterContext"
import {usePasswordContextUpdate} from "../../context/generator/PasswordContext"
import {useEffect, useState} from "react"
import {GENERATOR_INPUTS, LOWERCASE, NUMBERS, SYMBOLS, UPPERCASE} from "../../data/constants"
import Slider from "../../components/Slider"
import Checkbox from "../../components/Checkbox"
import SecondaryButton from "../../components/buttons/SecondaryButton"

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
                <Slider title="Length:"
                        min={4}
                        max={48}
                        defaultLength={length}
                        onChange={(event) => {
                            update.updateLength(event.target.value)
                        }}
                        enableInput={true}
                        inputOnChange={handleLength}
                        inputOnKeyDown={(event) => {
                            // Prevent user from creating decimal numbers.
                            if (event.key === ".") {
                                event.preventDefault()
                            }
                        }}
                />
            </div>
            <div className="flex flex-col space-y-4">
                {GENERATOR_INPUTS.map(({ label, value }) => {
                    return (
                        <Checkbox title={label}
                          checked={parameters.includes(value)}
                          onClick={() => {
                              updateParameter(value)
                          }}
                          onKeyDown={(event) => {
                              if (event.key === "Enter") {
                                  updateParameter(value)
                              }
                          }}
                        />
                    )
                })}
            </div>
            <div className="absolute bottom-4 right-4">
                {/*Generate password button.*/}
                <SecondaryButton type="button"
                                 disabled={parameters.length === 0 || length === 0}
                                 hoverColor="blue-1"
                                 activeColor="blue-2"
                                 onClick={() => {
                                     updatePassword(parameters, length)
                                 }}
                >
                    Generate
                </SecondaryButton>
            </div>
        </div>
    )
}