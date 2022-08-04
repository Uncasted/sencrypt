import { useRef, useState, useEffect } from 'react'
import { BLUE_OUTLINE, IMAGES, RED_OUTLINE } from '../../data/constants'
import InputField from '../../components/forms/InputField'
import PropTypes from 'prop-types'
import PrimaryButton from '../../components/buttons/PrimaryButton'

export default function LoginForm (props) {
  // State
  const [isMP, setIsMP] = useState(false)
  const [masterPassword, setMasterPassword] = useState('')
  const [deleteAfterAttempts, setDeleteAfterAttempts] = useState(false)
  const [deleteAttempts, setDeleteAttempts] = useState(0)

  // Ref
  const warningRef = useRef(null)
  const masterPassRef = useRef(null)

  useEffect(() => {
    // Load the settings at startup.
    window.settings.getSettings().then(settings => {
      setDeleteAfterAttempts(settings.deleteAfterAttempts)
      setDeleteAttempts(settings.deleteAttempts)
    })
    // Reset the count when the password is verified.
  }, [isMP])

  useEffect(() => {
    // If the count reaches 0, delete all the accounts in the database.
    if (deleteAfterAttempts && !deleteAttempts) {
      window.database.clearDatabase().then()
    }
  }, [deleteAttempts])

  const verifyMasterPassword = async event => {
    event.preventDefault()
    // Verify the master password in the database.
    const isMasterPassword = await window.database.verifyMasterPassword(
      masterPassword
    )

    if (isMasterPassword) {
      // Start the settings.
      await window.settings.start()
      // Log in.
      setIsMP(isMasterPassword)
    } else {
      // Invalid master password warning.
      const warning = warningRef.current
      const masterPass = masterPassRef.current

      // Show warning and make outline of input red.
      warning.classList.remove('invisible')
      masterPass.classList.remove(...BLUE_OUTLINE)
      masterPass.classList.add(...RED_OUTLINE)

      // If deleteAfterAttempts is enabled, reduce the attempt remaining count by one.
      if (deleteAfterAttempts) {
        setDeleteAttempts(prevAttempts => prevAttempts - 1)
      }
    }
  }

  const handleWarning = () => {
    // Remove the red warning for the login form.
    const warning = warningRef.current
    const masterPass = masterPassRef.current

    warning.classList.add('invisible')
    masterPass.classList.remove(...RED_OUTLINE)
    masterPass.classList.add(...BLUE_OUTLINE)
  }

  return (
    <>
      {!isMP
        ? (
          <div className='bg-[#000e14] w-[100vw] h-[95vh] flex flex-col items-center'>
            <div className='pt-36'>
              <img src={IMAGES.LOGO} alt='Sencrypt' className='w-[500px]' />
            </div>
            <form
              onSubmit={verifyMasterPassword}
              className='flex flex-col space-y-6 items-center mt-24 w-72'
            >
              <InputField
                autoFocus
                bgColor='[#001824]'
                tabIndex={1}
                secondaryTabIndex={3}
                placeholder='Enter Master Password...'
                title='Enter your Master Password'
                type='password'
                fieldId='masterPassword'
                ref={masterPassRef}
                name='masterPassword'
                minLength={1}
                maxLength={32}
                value={masterPassword}
                handleWarning={handleWarning}
                onChange={input => {
                  setMasterPassword(input)
                }}
                hasToggleVisibility
              />
              <p ref={warningRef} className='invisible text-red-500'>
                Invalid Master Password.
              </p>
              <PrimaryButton
                type='submit'
                tabIndex={2}
                disabled={!masterPassword}
                hoverColor='[#003D5C]'
                activeColor='[#00293d]'
                width='full'
              >
                Log in
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

LoginForm.propTypes = {
  children: PropTypes.node
}
