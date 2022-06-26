export function Navbar() {

    const changeFocus = (e) => {
        const buttons = document.querySelectorAll(".change-focus");
        buttons.forEach(element => element.classList.remove("bg-black-1"));
        e.target.classList.add("bg-black-1");
    }

    return (
        <nav className="bg-black text-white inset-0 w-[250px] h-[100vh] pt-4 fixed">
            <h2 className="text-2xl text-center">SENCRYPT</h2>
            <ul className="flex flex-col text-xl mt-8">
                <li>
                    <button onClick={changeFocus}
                            className="bg-black-1 change-focus w-full text-start pl-8 py-3 hover:bg-black-1 transition">Accounts
                    </button>
                </li>
                <li>
                    <button onClick={changeFocus}
                            className="change-focus w-full text-start pl-8 py-3 hover:bg-black-1 transition">Generator
                    </button>
                </li>
                <li>
                    <button onClick={changeFocus}
                            className="change-focus w-full text-start pl-8 py-3 hover:bg-black-1 transition">Settings
                    </button>
                </li>
            </ul>
        </nav>
    )
}
