import {
  useAccountsContext,
  useAccountsContextUpdate
} from '../../../context/accounts/AccountsContext'
import {
  ADD_MODAL_FIELDS,
  BLUE_OUTLINE,
  HOSTNAME_REGEX,
  RED_OUTLINE
} from '../../../data/constants'
import { useRef, useState } from 'react'
import InputField from '../../../components/forms/InputField'
import ModalHeader from '../../../components/headers/ModalHeader'
import PrimaryButton from '../../../components/buttons/PrimaryButton'

export function AddAccountModal () {
  // State
  const [newAccount, setNewAccount] = useState({
    website: '',
    username: '',
    password: ''
  })

  // Ref
  const warningRef = useRef(null)
  const addModalRef = useRef(null)

  // Context
  const accounts = useAccountsContext()
  const { createAccount } = useAccountsContextUpdate()

  const updateField = (field, input) => {
    setNewAccount(prevState => {
      const newState = { ...prevState }
      newState[field] = input
      return newState
    })
  }

  const handleWarning = () => {
    // Remove the warning for already existing account.
    const fields = document.querySelectorAll(
      '[data-outline="add-modal-outline"]'
    )
    // Remove the red outline.
    for (const field of fields) {
      field.classList.remove(...RED_OUTLINE)
      field.classList.add(...BLUE_OUTLINE)
    }
    // Make the warning invisible.
    const warning = warningRef.current
    warning.classList.add('invisible')
  }

  const submitData = event => {
    event.preventDefault()

    // Get only the hostname from the URL.
    const [, website] = newAccount.website.match(HOSTNAME_REGEX)

    // Get each value from the form.
    const newAccountData = {
      website,
      username: newAccount.username,
      password: newAccount.password
    }

    const isNotDuplicate = accounts.every(account => {
      return (
        account.username !== newAccountData.username ||
        account.website !== newAccountData.website
      )
    })

    // If there isn't a duplicate. Create the account.
    if (isNotDuplicate) {
      // Creating account in the local state.
      createAccount(newAccountData).then(() => {
        // We need to click the label to close the modal.
        const addModalLabel = addModalRef.current
        addModalLabel.click()

        // Clear the value of the elements after adding the account.
        setNewAccount(() => {
          return {
            website: '',
            username: '',
            password: ''
          }
        })
      })
    } else {
      // Warn the user.
      const fields = document.querySelectorAll(
        '[data-outline="add-modal-outline"]'
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
  }

  return (
    <>
      <input
        type='checkbox'
        id='add-modal'
        tabIndex='-1'
        className='modal-toggle'
      />
      <div className='modal'>
        <div className='modal-box bg-[#00111a] text-white rounded-none px-0 py-0 w-[350px] shadow-sm'>
          <ModalHeader htmlFor='add-modal' tabIndex={14}>
            Add New Account:
          </ModalHeader>
          <form
            id='add-form'
            onSubmit={submitData}
            className='flex flex-col items-center space-y-4 px-12'
          >
            {ADD_MODAL_FIELDS.map(field => {
              return (
                <InputField
                  key={field.name}
                  bgColor='[#001824]'
                  type={field.type}
                  name={field.name}
                  fieldId={field.id}
                  title={field.title}
                  tabIndex={field.tabIndex}
                  dataOutline='add-modal-outline'
                  value={newAccount[field.value]}
                  handleWarning={handleWarning}
                  onChange={input => {
                    updateField(field.value, input)
                  }}
                />
              )
            })}
            <p ref={warningRef} className='invisible text-red-500'>
              This account already exists.
            </p>
            {/* Add account button. */}
            <div className='modal-action w-full'>
              <label
                htmlFor='add-modal'
                ref={addModalRef}
                className='w-full mb-8 mt-[-1rem]'
              >
                <PrimaryButton
                  type='submit'
                  form='add-form'
                  tabIndex={13}
                  disabled={
                    !newAccount.username ||
                    !newAccount.password ||
                    !newAccount.website
                  }
                  hoverColor='[#003D5C]'
                  activeColor='[#00293d]'
                  width='full'
                  height={14}
                  offsetColor='[#00111a]'
                >
                  Add Account
                </PrimaryButton>
              </label>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}
