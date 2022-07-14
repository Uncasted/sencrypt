import {useState, useEffect} from "react"
import NewUserForm from "../../components/login/NewUserForm"
import LoginForm from "../../components/login/LoginForm"

export default function LoginScreen(props) {
    // State
    const [isNewUser, setIsNewUser] = useState(false)

    useEffect(() => {
        window.controller.checkIsNew().then(isNew => setIsNewUser(isNew))
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


