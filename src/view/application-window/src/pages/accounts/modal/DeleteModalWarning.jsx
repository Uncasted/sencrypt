import { useIndexContext } from '../../../context/accounts/IndexContext'
import { useAccountsContextUpdate } from '../../../context/accounts/AccountsContext'
import PrimaryButton from '../../../components/buttons/PrimaryButton'

export default function DeleteModalWarning () {
  // Context
  const index = useIndexContext()
  const { removeAccount } = useAccountsContextUpdate()

  const deleteAccount = () => {
    removeAccount(index).then()
  }

  return (
    <div className='flex flex-col'>
      <div>
        <h1 className='text-md ml-4'>
          Are you sure you want to delete this account?
        </h1>
      </div>
      {/* Delete account button */}
      <div className='absolute right-4 bottom-4'>
        <label htmlFor={`delete-modal-${index}`}>
          <PrimaryButton
            type='button'
            tabIndex={32}
            hoverColor='red-600'
            activeColor='red-700'
            offsetColor='[#00111a]'
            onClick={deleteAccount}
            width={40}
          >
            Delete Account
          </PrimaryButton>
        </label>
      </div>
    </div>
  )
}
