import {useState, useEffect} from "react"
import NewUserForm from "./NewUserForm"
import LoginForm from "./LoginForm"
import PropTypes from "prop-types"

export default function LoginScreen(props) {
    // State
    const [isNewUser, setIsNewUser] = useState(false)

    useEffect(() => {
        window.database.checkIsNew().then(isNew => setIsNewUser(isNew))
    }, [])

    return (
        <>
            {isNewUser ?
                <NewUserForm children={props.children}/>
                : <LoginForm children={props.children}/>
            }
        </>
    )
}

LoginScreen.propTypes = {
    children: PropTypes.node
}
