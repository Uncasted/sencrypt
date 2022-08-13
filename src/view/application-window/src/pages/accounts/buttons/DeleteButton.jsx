import { useIndexContext } from '../../../context/accounts/IndexContext'
import SecondaryButton from '../../../components/buttons/SecondaryButton'
import { useRef } from 'react'
import { playWarningSound } from '../../../utils/utility'

export function DeleteButton () {
  // Ref
  const warningRef = useRef(null)

  // Context
  const index = useIndexContext()

  const deleteWarning = () => {
    // Click on the label to show the warning.
    const warning = warningRef.current
    warning.click()
    // Focus the "delete modal".
    const delModal = document.getElementById(`delete-box-${index}`)
    delModal.focus()
    // Play the sound warning.
    playWarningSound()
  }

  return (
    <>
      <label
        htmlFor={`delete-modal-${index}`}
        className='hidden'
        ref={warningRef}
      />
      <SecondaryButton
        type='button'
        tabIndex={31}
        hoverColor='[#003D5C]'
        activeColor='[#00293d]'
        offsetColor='[#001b29]'
        onClick={deleteWarning}
      >
        Delete Account
      </SecondaryButton>
    </>
  )
}
