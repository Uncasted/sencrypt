import { usePasswordContext } from '../../context/generator/PasswordContext'
import { SHOW_TOOLTIP } from '../../data/constants'
import { useRef } from 'react'
import InputField from '../../components/forms/InputField'

export default function PasswordGenerator () {
  // Ref
  const tooltipRef = useRef(null)

  // Context
  const password = usePasswordContext()

  const selectToClipboard = () => {
    // Copy to clipboard.
    navigator.clipboard.writeText(password).then()
    // Show the tooltip.
    const tooltip = tooltipRef.current
    tooltip.classList.add(...SHOW_TOOLTIP)
    setTimeout(() => {
      tooltip.classList.remove(...SHOW_TOOLTIP)
    }, 2000)
  }

  return (
    <div className='flex space-x-2 items-center'>
      <div data-tip='Copied!' ref={tooltipRef} className='tooltip-bg w-full'>
        <InputField
          tabIndex={10}
          bgColor='[#001824]'
          fieldId='generator-input'
          type='text'
          value={password}
          handleClick={selectToClipboard}
          onKeyDown={event => {
            if (event.key === 'Enter' || event.key === ' ') {
              selectToClipboard()
            }
          }}
          hasToggleVisibility
          readOnly
          hasStrengthBar
        />
      </div>
    </div>
  )
}
