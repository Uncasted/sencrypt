import ModalHeader from '../../components/headers/ModalHeader'
import PropTypes from 'prop-types'
import PrimaryButton from '../../components/buttons/PrimaryButton'

export function WeakPasswordModal (props) {
  return (
    <div>
      <input
        type='checkbox'
        id='weak-pass-modal'
        tabIndex='-1'
        className='modal-toggle'
      />
      <div className='modal'>
        <div
          id='weak-pass-box'
          tabIndex='11'
          className='modal-box bg-[#00111a] rounded-none px-0 py-0 w-[400px] h-[200px] shadow-sm
                       text-white focus:outline-none'
        >
          <ModalHeader
            htmlFor='weak-pass-modal'
            tabIndex={13}
          >
            Warning: Weak Password
          </ModalHeader>
          <div className='flex flex-col'>
            <div>
              <h1 className='text-md mx-4'>
                This is a weak password, are you sure you want to continue?
              </h1>
            </div>
            <div className='absolute right-4 bottom-4 w-32'>
              <label htmlFor='weak-pass-modal' className='w-full'>
                <PrimaryButton
                  type='button'
                  tabIndex={12}
                  hoverColor='[#003D5C]'
                  activeColor='[#00293d]'
                  offsetColor='[#00111a]'
                  onClick={() => {
                    const modal = document.getElementById('weak-pass-modal')
                    // Click on the modal to make sure it closes.
                    modal.click()
                    // Create the master password.
                    props.handleButton()
                  }}
                  width='full'
                  height={10}
                >
                  Continue
                </PrimaryButton>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

WeakPasswordModal.propTypes = {
  handleButton: PropTypes.func
}
