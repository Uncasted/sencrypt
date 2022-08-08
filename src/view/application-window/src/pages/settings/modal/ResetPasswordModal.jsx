import { useRef, useState } from 'react'
import {
  BLUE_OUTLINE,
  RED_OUTLINE,
  RESET_PASS_FIELDS
} from '../../../data/constants'
import ModalHeader from '../../../components/headers/ModalHeader'
import InputField from '../../../components/forms/InputField'
import ConfirmResetModal from './ConfirmResetModal'
import PrimaryButton from '../../../components/buttons/PrimaryButton'

export function ResetPasswordModal () {
  // State
  const [passwords, setPasswords] = useState({
    newMasterPass: '',
    confirmNewMasterPass: '',
    oldMasterPass: ''
  })

  const [warning, setWarning] = useState('The passwords do not match.')

  // Ref
  const warningRef = useRef(null)

  const updateField = (field, value) => {
    // Set new password.
    setPasswords(passwords => {
      const newPasswords = { ...passwords }
      newPasswords[field] = value
      return newPasswords
    })
  }

  const handleWarning = () => {
    // Remove the warning for the input fields.
    const fields = document.querySelectorAll(
      '[data-outline="reset-modal-outline"]'
    )
    // Remove the red outline.
    for (const field of fields) {
      field.classList.remove(...RED_OUTLINE)
      field.classList.add(...BLUE_OUTLINE)
    }
    // Make the warning invisible.
    const warning = warningRef.current
    warning.classList.add('invisible')
    // Reset warning to default value.
    setWarning('The passwords do not match.')
  }

  const submitData = event => {
    event.preventDefault()
    // Verify the old master password.
    window.database.verifyMasterPassword(passwords.oldMasterPass).then(isMasterPass => {
      if (passwords.newMasterPass === passwords.confirmNewMasterPass && isMasterPass) {
        // Open the confirmation modal.
        let confirmModal = document.getElementById('confirm-reset-modal')
        confirmModal.click()
        // Focus on the modal
        confirmModal = document.getElementById('confirm-reset-box')
        confirmModal.focus()
      } else {
        // Warn the user.

        // Display the warning depending on what's wrong.
        if (!isMasterPass) {
          if (passwords.newMasterPass !== passwords.confirmNewMasterPass) {
            setWarning('All fields are invalid.')
          } else {
            setWarning('Invalid Master password.')
          }
        }

        const fields = document.querySelectorAll(
          '[data-outline="reset-modal-outline"]'
        )

        // Make the outline of the fields red.
        for (const field of fields) {
          field.classList.remove(...BLUE_OUTLINE)
          field.classList.add(...RED_OUTLINE)
        }

        // Show the user the warning.
        const warning = warningRef.current
        warning.classList.remove('invisible')
      }
    })
  }

  return (
    <>
      <input
        type='checkbox'
        id='reset-modal'
        tabIndex='-1'
        className='modal-toggle'
        onChange={() => {
          setPasswords(() => {
            // Set the fields empty when you close the modal.
            return {
              newMasterPass: '',
              confirmNewMasterPass: '',
              oldMasterPass: ''
            }
          })
          // Remove the warning when closing the modal.
          handleWarning()
        }}
      />
      <div className='modal'>
        <div className='modal-box bg-[#00111a] text-white rounded-none px-0 py-0 w-[350px] shadow-sm'>
          <ModalHeader htmlFor='reset-modal' tabIndex={14}>
            Reset Master Password:
          </ModalHeader>
          <form
            id='reset-form'
            onSubmit={submitData}
            className='flex flex-col items-center space-y-4 px-12'
          >
            {RESET_PASS_FIELDS.map(field => {
              return (
                <InputField
                  autoFocus={field.autofocus}
                  key={field.id}
                  bgColor='[#001824]'
                  type={field.type}
                  name={field.name}
                  fieldId={field.id}
                  title={field.title}
                  tabIndex={field.tabIndex}
                  dataOutline='reset-modal-outline'
                  value={passwords[field.value]}
                  handleClick={handleWarning}
                  onChange={input => {
                    updateField(field.value, input)
                  }}
                />
              )
            })}
            <p ref={warningRef} className='invisible text-red-500'>
              {warning}
            </p>
            {/* Add account button. */}
            <div className='modal-action w-full'>
              <label
                htmlFor='reset-modal'
                id='reset-modal-button'
                className='mb-6 mt-[-1rem] w-full'
              >
                <PrimaryButton
                  type='submit'
                  form='reset-form'
                  tabIndex={13}
                  disabled={
                    !passwords.newMasterPass || !passwords.confirmNewMasterPass || !passwords.oldMasterPass
                  }
                  hoverColor='red-600'
                  activeColor='red-700'
                  offsetColor='[#00111a]'
                  width='full'
                  height={14}
                >
                  Reset Master Password
                </PrimaryButton>
              </label>
            </div>
          </form>
        </div>
      </div>
      {/* Confirm reset Modal. */}
      <ConfirmResetModal newPassword={passwords.newMasterPass} />
    </>
  )
}
