import { useRef, useState } from 'react'
import {
  BLUE_OUTLINE,
  IMAGES,
  LOGIN_FIELDS,
  RED_OUTLINE
} from '../../data/constants'
import InputField from '../../components/forms/InputField'
import PropTypes from 'prop-types'
import { useWeakPassContext } from '../../context/WeakPassContext'
import { WeakPasswordModal } from './WeakPasswordModal'
import PrimaryButton from '../../components/buttons/PrimaryButton'

export default function NewUserForm (props) {
  // State
  const [isCreatedMP, setIsCreatedMP] = useState(false)
  const [passwords, setPasswords] = useState({
    pass: '',
    confirmPass: ''
  })
  // Context
  const isWeak = useWeakPassContext()

  // Ref
  const warningRef = useRef(null)

  const updatePassword = (field, input) => {
    setPasswords(prevPasswords => {
      const newPasswords = { ...prevPasswords }
      newPasswords[field] = input
      return newPasswords
    })
  }

  const verifyPasswords = event => {
    event.preventDefault()
    if (passwords.pass === passwords.confirmPass) {
      if (isWeak) {
        // If the password is weak open the modal for confirmation.
        const modal = document.getElementById('weak-pass-modal')
        modal.click()
        // Focus on the modal when it's opened.
        const modalBox = document.getElementById('weak-pass-box')
        modalBox.focus()
      } else {
        // Create the master password.
        createMasterPass().then()
      }
    } else {
      // Display warning.
      const warning = warningRef.current
      warning.classList.remove('invisible')
      // Add red outlines to inputs.
      const fields = document.querySelectorAll('[data-outline="new-user"]')

      for (const field of fields) {
        field.classList.remove(...BLUE_OUTLINE)
        field.classList.add(...RED_OUTLINE)
      }
    }
  }

  const createMasterPass = async () => {
    // Initialize the database with the new password.
    const isCreated = await window.database.createMasterPassword(
      passwords.pass
    )
    // Initialize the settings file.
    await window.settings.init()
    // Create the master password.
    setIsCreatedMP(isCreated)
  }

  const handleWarning = () => {
    // Remove the warning for invalid form.
    const warning = warningRef.current
    warning.classList.add('invisible')

    const fields = document.querySelectorAll('[data-outline="new-user"]')
    // Remove the red outline.
    for (const field of fields) {
      field.classList.remove(...RED_OUTLINE)
      field.classList.add(...BLUE_OUTLINE)
    }
  }

  return (
    <>
      {!isCreatedMP
        ? (
          <div className='bg-[#000e14] w-[100vw] h-[95vh] flex flex-col items-center'>
            <WeakPasswordModal handleButton={createMasterPass} />
            <div className='pt-36'>
              <img src={IMAGES.LOGO} alt='Sencrypt' className='w-[500px]' />
            </div>
            <form
              onSubmit={verifyPasswords}
              className='flex flex-col space-y-6 items-center mt-24 w-72'
            >
              {LOGIN_FIELDS.map(field => {
                return (
                  <InputField
                    key={field.fieldId}
                    bgColor='[#001824]'
                    tabIndex={field.tabIndex}
                    secondaryTabIndex={field.secondaryTabIndex}
                    autoFocus={field.autofocus}
                    title={field.title}
                    type={field.type}
                    fieldId={field.fieldId}
                    name={field.name}
                    dataOutline={field.dataOutline}
                    minLength={field.minLength}
                    maxLength={field.maxLength}
                    value={passwords[field.value]}
                    onChange={input => {
                      updatePassword(field.value, input)
                    }}
                    handleWarning={handleWarning}
                    hasToggleVisibility
                    hasStrengthBar
                  />
                )
              })}
              <p ref={warningRef} className='invisible text-red-500 mt-2'>
                The passwords do not match.
              </p>
              <PrimaryButton
                type='submit'
                disabled={!passwords.pass || !passwords.confirmPass}
                hoverColor='[#003D5C]'
                activeColor='[#00293d]'
                tabIndex={3}
                width='full'
                offsetColor='[#000e14]'
              >
                Create Vault
              </PrimaryButton>
            </form>
          </div>
          )
        : (
            props.children
          )}
    </>
  )
}

NewUserForm.propTypes = {
  children: PropTypes.node
}
