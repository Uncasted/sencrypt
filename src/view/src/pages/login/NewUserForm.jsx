import { useRef, useState } from "react"
import {
  BLUE_OUTLINE,
  IMAGES,
  LOGIN_FIELDS,
  RED_OUTLINE,
} from "../../data/constants"
import InputField from "../../components/forms/InputField"
import SecondaryButton from "../../components/buttons/SecondaryButton"
import PropTypes from "prop-types"

export default function NewUserForm(props) {
  // State
  const [isCreatedMP, setIsCreatedMP] = useState(false)
  const [passwords, setPasswords] = useState({
    pass: "",
    confirmPass: "",
  })

  // Ref
  const warningRef = useRef(null)

  const updatePassword = (field, input) => {
    setPasswords(prevPasswords => {
      const newPasswords = { ...prevPasswords }
      newPasswords[field] = input
      return newPasswords
    })
  }

  const createPassword = async event => {
    event.preventDefault()

    if (passwords.pass === passwords.confirmPass) {
      // Initialize the database with the new password.
      const isCreated = await window.database.createMasterPassword(
        passwords.pass
      )
      // Initialize the settings file.
      await window.settings.init()
      // Create the master password.
      setIsCreatedMP(isCreated)
    } else {
      // Display warning.
      const warning = warningRef.current
      warning.classList.remove("invisible")
      // Add red outlines to inputs.
      const fields = document.querySelectorAll('[data-outline="new-user"]')

      for (const field of fields) {
        field.classList.remove(...BLUE_OUTLINE)
        field.classList.add(...RED_OUTLINE)
      }
    }
  }

  const removeWarning = () => {
    // Remove the warning for invalid form.
    const warning = warningRef.current
    warning.classList.add("invisible")

    const fields = document.querySelectorAll('[data-outline="new-user"]')
    // Remove the red outline.
    for (const field of fields) {
      field.classList.remove(...RED_OUTLINE)
      field.classList.add(...BLUE_OUTLINE)
    }
  }

  return (
    <>
      {!isCreatedMP ? (
        <div className="bg-dark-blue-1 w-[100vw] h-[100vh] flex flex-col items-center justify-center space-y-10">
          <div>
            <img src={IMAGES.LOGO} alt="Sencrypt" className="w-72" />
          </div>
          <form
            onSubmit={createPassword}
            className="flex flex-col space-y-6 items-center"
          >
            {LOGIN_FIELDS.map(field => {
              return (
                <InputField
                  key={field.fieldId}
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
                  removeWarning={removeWarning}
                />
              )
            })}
            <p ref={warningRef} className="invisible text-red-500 mt-2">
              The passwords do not match.
            </p>
            <SecondaryButton
              type="submit"
              disabled={!passwords.pass || !passwords.confirmPass}
              hoverColor="blue-1"
              activeColor="blue-2"
            >
              Sign up
            </SecondaryButton>
          </form>
        </div>
      ) : (
        props.children
      )}
    </>
  )
}

NewUserForm.propTypes = {
  children: PropTypes.node,
}
