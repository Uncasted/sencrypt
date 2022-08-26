import React, { useState } from 'react'
import Option from '../../../components/Option'
import Checkbox from '../../../components/Checkbox'

export default function EnableAnimations () {
  const [enableAnimations, setEnableAnimations] = useState(
    JSON.parse(localStorage.getItem('enableAnimations')) ?? false
  )

  const handleToggleAnimations = () => {
    // Change value in localstorage.
    localStorage.setItem('enableAnimations', JSON.stringify(!enableAnimations))
    // Change the local state.
    setEnableAnimations(enableAnimations => !enableAnimations)
  }

  return (
    <Option label='Enable Animations'>
      <Checkbox
        id='enableAnimations-option'
        checked={!enableAnimations}
        onClick={handleToggleAnimations}
        onKeyDown={event => {
          if (event.key === 'Enter') {
            // This is bad, but if I don't do this it doesn't work.
            const checkbox = document.getElementById('enableAnimations-option')
            checkbox.click()
          }
        }}
      />
    </Option>
  )
}
