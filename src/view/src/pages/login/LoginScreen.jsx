import {useState, useEffect} from "react"
import NewUserForm from "./NewUserForm"
import LoginForm from "./LoginForm"

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


