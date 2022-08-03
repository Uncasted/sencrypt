import ModalHeader from '../../components/headers/ModalHeader'
import SecondaryButton from '../../components/buttons/SecondaryButton'
import PropTypes from 'prop-types'

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
                <SecondaryButton
                  type='button'
                  tabIndex={12}
                  hoverColor='[#003D5C]'
                  activeColor='[#00293d]'
                  onClick={props.handleButton}
                >
                  Continue
                </SecondaryButton>
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
