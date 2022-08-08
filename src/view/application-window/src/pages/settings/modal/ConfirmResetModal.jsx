import ModalHeader from '../../../components/headers/ModalHeader'
import PrimaryButton from '../../../components/buttons/PrimaryButton'

export default function ConfirmResetModal (props) {
  const resetMasterPassword = () => {
    // Reset the master password.
    window.database.resetMasterPassword(props.newPassword).then(() => {
      // Reload the application.
      window.location.reload()
    })
  }

  return (
    <div>
      <input
        type='checkbox'
        id='confirm-reset-modal'
        tabIndex='-1'
        className='modal-toggle'
      />
      <div className='modal'>
        <div
          id='confirm-reset-box'
          tabIndex='31'
          className='modal-box bg-[#00111a] rounded-none px-0 py-0 w-[400px] h-[200px] shadow-sm text-white
          focus:outline-none'
        >
          <ModalHeader htmlFor='confirm-reset-modal' tabIndex={33}>
            Are you sure?
          </ModalHeader>
          <div className='flex flex-col'>
            <div>
              <h1 className='text-md ml-4'>
                Are you sure you want to reset your master password?
              </h1>
            </div>
            {/* Reset master password button. */}
            <div className='absolute right-4 bottom-4'>
              <label htmlFor='confirm-reset-modal'>
                <PrimaryButton
                  type='button'
                  tabIndex={32}
                  hoverColor='red-600'
                  activeColor='red-700'
                  offsetColor='[#00111a]'
                  width={28}
                  height={10}
                  onClick={resetMasterPassword}
                >
                  Yes, I am
                </PrimaryButton>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
