import { useEffect, useRef, useState } from 'react'
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
import { playWarningSound } from '../../utils/utility'
import { useTransition, animated, useSpring, easings } from 'react-spring'
import { useAnimationStateContext, useAnimationStateContextUpdate } from '../../context/AnimationStateContext'

export default function NewUserForm (props) {
  // State
  const [maxWidth, setMaxWidth] = useState(innerWidth)
  const [isCreatedMP, setIsCreatedMP] = useState(false)
  const [passwords, setPasswords] = useState({
    pass: '',
    confirmPass: ''
  })

  // Ref
  const backgroundRef = useRef(null)
  const warningRef = useRef(null)

  // Context
  const isWeak = useWeakPassContext()
  const animations = useAnimationStateContext()
  const { toggleAnimState } = useAnimationStateContextUpdate()

  // Animations
  const formTransition = useTransition(isCreatedMP, {
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

  const updateMaxWidth = () => {
    setMaxWidth(innerWidth)
  }

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
        // Play the warning sound.
        playWarningSound()
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
    // Create the master password.
    setIsCreatedMP(isCreated)
    // Fade out the login form.
    toggleAnimState('loginForm')
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
      <animated.div
        ref={backgroundRef}
        style={backgroundSpring}
        className='bg-[#000e14] w-[100vw] h-[100vh] absolute z-50'
      />
      <WeakPasswordModal handleButton={createMasterPass} />
      {formTransition((style, isCreatedMP) => !isCreatedMP
        ? <animated.div style={style} className='flex flex-col items-center absolute inset-0 z-50'>
          <div className='pt-24'>
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
                  handleClick={handleWarning}
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
          </animated.div>
        : (
            props.children
          )
      )}
    </>
  )
}

NewUserForm.propTypes = {
  children: PropTypes.node
}
