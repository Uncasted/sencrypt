import PrimaryButton from '../../../components/buttons/PrimaryButton'
import { useRef } from 'react'

export function AddAccountButton () {
  // Ref
  const addModalRef = useRef(null)

  const addAccount = () => {
    // Click on the label to show the add account modal.
    const addModal = addModalRef.current
    addModal.click()
    // Focus on the form. (If I don't do this it doesn't work).
    const newWebsite = document.getElementById('new-website')
    newWebsite.focus()
  }

  return (
    <label htmlFor='add-modal' ref={addModalRef} className='ml-4'>
      <PrimaryButton
        type='button'
        tabIndex={0}
        hoverColor='blue-1'
        activeColor='blue-2'
        onClick={addAccount}
        width={44}
      >
        Add New Account
      </PrimaryButton>
    </label>
  )
}
