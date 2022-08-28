import {
  useParameterContext,
  useParameterContextUpdate
} from '../../context/generator/ParameterContext'
import { usePasswordContextUpdate } from '../../context/generator/PasswordContext'
import { useEffect, useState } from 'react'
import {
  GENERATOR_INPUTS,
  LOWERCASE,
  NUMBERS,
  SYMBOLS,
  UPPERCASE
} from '../../data/constants'
import Slider from '../../components/Slider'
import Checkbox from '../../components/Checkbox'
import SecondaryButton from '../../components/buttons/SecondaryButton'
import { getMinMaxValue, sliderProgress } from '../../utils/utility'

export default function GeneratorParameters () {
  // Context
  const { length, parameters } = useParameterContext()
  const update = useParameterContextUpdate()
  const updatePassword = usePasswordContextUpdate()

  // State
  const [useParams, setUseParams] = useState({
    useLower: parameters.includes(LOWERCASE),
    useUpper: parameters.includes(UPPERCASE),
    useNumbers: parameters.includes(NUMBERS),
    useSymbols: parameters.includes(SYMBOLS)
  })

  // Slider progress bar.
  useEffect(sliderProgress, [length])

  const handleLength = event => {
    // Make sure that the input is between the range.
    const newLength = getMinMaxValue(0, 48, event.target.value)
    update.updateLength(String(newLength))
  }

  const updateParameter = (type, parameter) => {
    if (!useParams[type]) {
      update.addParameter(parameter)
    } else {
      update.delParameter(parameter)
    }
    setUseParams(oldUseParams => {
      const newUseParams = { ...oldUseParams }
      newUseParams[type] = !newUseParams[type]
      return newUseParams
    })
  }

  return (
    <div>
      <div className="mb-4 pr-1">
        <Slider
          tabIndex={10}
          title="Length:"
          min={4}
          max={48}
          defaultLength={length}
          onChange={event => {
            update.updateLength(event.target.value)
          }}
          enableInput
          handleInputChange={handleLength}
          inputOnKeyDown={event => {
            // Prevent user from creating decimal numbers.
            if (event.key === '.') {
              event.preventDefault()
            }
          }}
          handleInputBlur={() => {
            // Prevent the user from inputting a value outside of the range.
            if (length < 4) update.updateLength('4')
          }}
        />
      </div>
      <div className="flex flex-col space-y-4">
        {GENERATOR_INPUTS.map((checkbox) => {
          return (
            <Checkbox
              key={checkbox.key}
              tabIndex={checkbox.tabIndex}
              id={checkbox.id}
              title={checkbox.label}
              checked={parameters.includes(checkbox.value)}
              onClick={() => {
                updateParameter(checkbox.type, checkbox.value)
              }}
              onKeyDown={event => {
                // This checkbox already has an event key listener for spacebar (for some reason).
                if (event.key === 'Enter') {
                  // This is bad. But it doesn't work properly if I don't do this.
                  const element = document.getElementById(checkbox.id)
                  element.click()
                }
              }}
            />
          )
        })}
        {/* Generate password button. */}
        <div style={{ marginTop: '2rem' }}>
          <SecondaryButton
            tabIndex={17}
            type="button"
            disabled={parameters.length === 0 || length === 0}
            hoverColor="[#003D5C]"
            activeColor="[#00293d]"
            offsetColor="[#00111a]"
            onClick={() => {
              updatePassword(parameters, length)
            }}
          >
            Generate
          </SecondaryButton>
        </div>
      </div>
    </div>
  )
}
