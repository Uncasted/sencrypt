import { useIndexContext } from '../../../context/accounts/IndexContext'
import SecondaryButton from '../../../components/buttons/SecondaryButton'
import { useRef } from 'react'

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
        tabIndex={30}
        hoverColor='[#003D5C]'
        activeColor='[#00293d]'
        onClick={deleteWarning}
      >
        Delete Account
      </SecondaryButton>
    </>
  )
}
