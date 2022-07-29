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
      <div className='mb-4 pr-4'>
        <Slider
          title='Length:'
          min={4}
          max={48}
          defaultLength={length}
          onChange={event => {
            update.updateLength(event.target.value)
          }}
          enableInput
          inputOnChange={handleLength}
          inputOnKeyDown={event => {
            // Prevent user from creating decimal numbers.
            if (event.key === '.') {
              event.preventDefault()
            }
          }}
        />
      </div>
      <div className='flex flex-col space-y-4'>
        {GENERATOR_INPUTS.map(({ id, label, type, value }) => {
          return (
            <Checkbox
              key={id}
              title={label}
              checked={parameters.includes(value)}
              onClick={() => {
                updateParameter(type, value)
              }}
              onKeyDown={event => {
                if (event.key === 'Enter') {
                  updateParameter(type, value)
                }
              }}
            />
          )
        })}
      </div>
      <div className='absolute bottom-4 right-4'>
        {/* Generate password button. */}
        <SecondaryButton
          type='button'
          disabled={parameters.length === 0 || length === 0}
          hoverColor='blue-1'
          activeColor='blue-2'
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
