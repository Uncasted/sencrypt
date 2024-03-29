import { useRef, useState } from 'react'
import {
  ACCOUNT_FIELDS,
  BLUE_OUTLINE,
  CANCEL_LABEL,
  EDIT_LABEL,
  HOSTNAME_REGEX, IMAGES,
  RED_OUTLINE
} from '../../data/constants'
import { useIndexContext } from '../../context/accounts/IndexContext'
import {
  useAccountsContext,
  useAccountsContextUpdate
} from '../../context/accounts/AccountsContext'
import {
  useInputContext,
  useInputContextUpdate
} from '../../context/accounts/InputContext'
import {
  useEditContext,
  useEditContextUpdate
} from '../../context/accounts/EditContext'
import { useIdContext } from '../../context/accounts/IdContext'
import InputField from '../../components/forms/InputField'
import { DeleteButton } from './buttons/DeleteButton'
import SecondaryButton from '../../components/buttons/SecondaryButton'
import TextareaField from '../../components/TextareaField'
import { useNotificationContextUpdate } from '../../context/NotificationContext'

export default function AccountInfo () {
  // State
  const [editTitle, setEditTitle] = useState(EDIT_LABEL)

  // Ref
  const warningRef = useRef(null)

  // Context
  const index = useIndexContext()
  const accounts = useAccountsContext()
  const account = useAccountsContext()[index]
  const { updateAccount } = useAccountsContextUpdate()
  const accountInput = useInputContext()
  const { setInputs, updateInput } = useInputContextUpdate()
  const isEditable = useEditContext()
  const toggleEditing = useEditContextUpdate()
  const accountIds = useIdContext()
  const { handleTitle, handleIcon, handleShow } = useNotificationContextUpdate()

  const toggleMode = () => {
    // Revert the inputs back when you cancel that changes.
    setInputs(() => account)

    // Toggle Editing
    toggleEditing()
    setEditTitle(editTitle === EDIT_LABEL ? CANCEL_LABEL : EDIT_LABEL)
  }

  const handleWarning = () => {
    // Remove the warning for already existing account.
    const fields = document.querySelectorAll(
      `[data-outline="account-${index}"]`
    )

    for (const field of fields) {
      field.classList.remove(...RED_OUTLINE)
      field.classList.add(...BLUE_OUTLINE)
    }

    // Hide the warning.
    const warning = warningRef.current
    warning.classList.add('hidden')
  }

  const submitChanges = event => {
    event.preventDefault()

    const fields = document.querySelectorAll(
      `[data-outline="account-${index}"]`
    )

    // Get only the hostname from the URL.
    const url = accountInput.website
    const [, hostname] = url.match(HOSTNAME_REGEX)

    const accountData = {
      website: hostname,
      username: accountInput.username,
      password: accountInput.password,
      notes: accountInput.notes
    }
    console.log(accountData)

    // Prevent account duplication.
    const isNotDuplicate = accounts.every((account, accIndex) => {
      // If the account index is the same then we can assume it's not a duplicate because it is
      // the same account and not another account.
      if (index === accIndex) {
        return true
      }
      return (
        account.username !== accountData.username ||
        account.website !== accountData.website
      )
    })

    if (isNotDuplicate) {
      // Update the account list.
      updateAccount(index, accountData).then(() => {
        // Toggle the editing off.
        toggleMode()
        // Show the notification.
        handleTitle('Account Saved')
        handleIcon(IMAGES.SUCCESS_ICON)
        handleShow()
      })
    } else {
      // Warn the user that the account already exists.
      const warning = warningRef.current
      warning.classList.remove('hidden')

      // Add red outline to the fields.
      for (const field of fields) {
        field.classList.remove(...BLUE_OUTLINE)
        field.classList.add(...RED_OUTLINE)
      }
    }
  }

  return (
    <div className='flex justify-between'>
      <form
        id={accountIds.editFormId}
        onSubmit={submitChanges}
        className='flex flex-col space-y-4 mt-2 ml-4 mb-4'
      >
        {ACCOUNT_FIELDS.map(field => {
          return (
            <InputField
              key={field.id}
              bgColor='[#00141F]'
              type={field.type}
              name={field.name}
              placeholder={field.placeholder}
              title={field.title}
              tabIndex={field.tabIndex}
              secondaryTabIndex={field.secondaryTabIndex}
              dataOutline={`account-${index}`}
              value={accountInput[field.value]}
              fieldId={accountIds[field.id]}
              isEditable={isEditable}
              hasToggleVisibility={field.hasToggleVisibility}
              hasClipboard={field.hasClipboard}
              clipboardTooltip={field.clipboardTooltip}
              tooltipDirection={field.tooltipDirection}
              handleClick={handleWarning}
              onChange={input => {
                updateInput(field.value, input)
              }}
            />
          )
        })}
        <TextareaField
          bgColor='[#00141f]'
          tabIndex={26}
          id='notes'
          name='notes'
          rows={5}
          placeholder='Notes...'
          title='Notes'
          dataOutline={`account-${index}`}
          value={accountInput.notes}
          handleClick={handleWarning}
          isEditable={isEditable}
          onChange={input => {
            updateInput('notes', input)
          }}
        />
        <p ref={warningRef} className='hidden text-red-500'>
          This account already exists.
        </p>
      </form>
      <div className='mt-4 mr-4 flex flex-col gap-y-4 w-80 pl-40 lg:pl-0 lg:flex-row lg:space-x-4'>
        {/* Edit button. */}
        <SecondaryButton
          type='button'
          tabIndex={29}
          hoverColor='[#003D5C]'
          activeColor='[#00293d]'
          offsetColor='[#001b29]'
          onClick={toggleMode}
        >
          {editTitle}
        </SecondaryButton>
        {/* We have to use inline styles here, otherwise it doesn't work. */}
        <div style={{ marginTop: '0px' }} className='flex flex-col gap-y-4 w-full'>
          {/* Save changes button. */}
          <SecondaryButton
            type='submit'
            form={accountIds.editFormId}
            tabIndex={30}
            disabled={
              isEditable ||
              !accountInput.username ||
              !accountInput.password ||
              !accountInput.website
            }
            hoverColor='[#003D5C]'
            activeColor='[#00293d]'
            offsetColor='[#001b29]'
          >
            Save Changes
          </SecondaryButton>
          <DeleteButton />
        </div>
      </div>
    </div>
  )
}
