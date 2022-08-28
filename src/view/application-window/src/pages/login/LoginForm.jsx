import { useRef, useState, useEffect } from 'react'
import { BLUE_OUTLINE, IMAGES, RED_OUTLINE } from '../../data/constants'
import InputField from '../../components/forms/InputField'
import PropTypes from 'prop-types'
import PrimaryButton from '../../components/buttons/PrimaryButton'
import { useTransition, animated, useSpring, easings } from 'react-spring'
import { useAnimationStateContext, useAnimationStateContextUpdate } from '../../context/AnimationStateContext'

export default function LoginForm (props) {
  // State
  const [isMP, setIsMP] = useState(false)
  const [masterPassword, setMasterPassword] = useState('')
  const [deleteAfterAttempts, setDeleteAfterAttempts] = useState(false)
  const [deleteAttempts, setDeleteAttempts] = useState(0)
  const [maxWidth, setMaxWidth] = useState(innerWidth)

  // Ref
  const warningRef = useRef(null)
  const masterPassRef = useRef(null)
  const backgroundRef = useRef(null)

  // Context
  const animations = useAnimationStateContext()
  const { toggleAnimState } = useAnimationStateContextUpdate()

  // Animations
  const formTransition = useTransition(isMP, {
    from: { opacity: 0, left: '100px' },
    enter: { opacity: 1, left: '0' },
    leave: { opacity: 0, left: '-100px' },
    config: {
      duration: 400,
      easing: easings.easeInOutQuad
    }
  })

  const backgroundSpring = useSpring({
    // We need to use the innerWidth so that we can use pixels with any window size.
    // If we use vw here, the animation won't work.
    from: { maxWidth: `${(maxWidth)}px`, zIndex: 50 },
    to: { maxWidth: '200px', zIndex: 0 },
    cancel: animations.loginForm,
    delay: 400,
    onRest: () => {
      // Toggle the next animation.
      toggleAnimState('appSection')
      // Make the previous background hidden.
      const background = backgroundRef.current
      background.classList.add('hidden')
    },
    config: {
      duration: 750,
      easing: easings.easeInOutCubic
    }
  })

  useEffect(() => {
    // We need to update the max width for the animation on resize.
    // If we don't do this the background will remain the same size when resizing the window.
    window.addEventListener('resize', updateMaxWidth)

    return () => {
      window.removeEventListener('resize', updateMaxWidth)
    }
  }, [])

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
      // Log in.
      setIsMP(isMasterPassword)
      // Fade out the login screen.
      toggleAnimState('loginForm')
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

  const updateMaxWidth = () => {
    setMaxWidth(innerWidth)
  }

  return (
    <>
      <animated.div
        ref={backgroundRef}
        style={backgroundSpring}
        className='bg-[#000e14] w-[100vw] h-[100vh] absolute z-50'
      />
      {formTransition((style, isMP) => !isMP
        ? <animated.div style={style} className='flex flex-col items-center absolute inset-0 z-50'>
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
              handleClick={handleWarning}
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
              offsetColor='[#000e14]'
            >
              Log in
            </PrimaryButton>
          </form>
        </animated.div>
        : props.children
      )}
    </>
  )
}

LoginForm.propTypes = {
  children: PropTypes.node
}
