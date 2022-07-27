import { useState, useEffect } from "react"
import NewUserForm from "./NewUserForm"
import LoginForm from "./LoginForm"
import PropTypes from "prop-types"

export default function LoginScreen({ children }) {
  // State
  const [isNewUser, setIsNewUser] = useState(false)

  useEffect(() => {
    window.database.checkIsNew().then(isNew => setIsNewUser(isNew))
  }, [])

  return (
    <>
      {isNewUser ? (
        <NewUserForm>{children}</NewUserForm>
      ) : (
        <LoginForm>{children}</LoginForm>
      )}
    </>
  )
}

LoginScreen.propTypes = {
  children: PropTypes.node,
}
