export function Navbar() {

    const changeFocus = (event) => {
        const buttons = document.querySelectorAll(".change-focus")
        buttons.forEach(element => element.classList.remove("bg-black-1"))
        event.target.classList.add("bg-black-1")
    }

    return (
        <nav className="bg-black text-white inset-0 w-[250px] h-[100vh] pt-4 fixed">
            <img src="/public/logo.png" className="h-7 mx-auto"/>
            <ul className="flex flex-col text-lg mt-8">
                <li>
                    <button onClick={changeFocus}
                            className="bg-black-1 change-focus w-full text-start pl-8 py-3 hover:bg-black-1 transition flex">
                        <img src="/public/password-icon.png" className="w-7 h-7 mr-4"/>
                        Accounts
                    </button>
                </li>
                <li>
                    <button onClick={changeFocus}
                            className="change-focus w-full text-start pl-8 py-3 hover:bg-black-1 transition flex">
                        <img src="/public/generator-icon.png" className="w-7 h-7 mr-4"/>
                        Generator
                    </button>
                </li>
                <li>
                    <button onClick={changeFocus}
                            className="change-focus w-full text-start pl-8 py-3 hover:bg-black-1 transition flex">
                        <img src="/public/settings-icon.png" className="w-7 h-7 mr-4"/>
                        Settings
                    </button>
                </li>
            </ul>
        </nav>
    )
}
