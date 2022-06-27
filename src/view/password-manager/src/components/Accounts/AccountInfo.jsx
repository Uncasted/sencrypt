export function AccountInfo() {
    return (
        <div className="collapse collapse-plus transition shadow-total">
            <input type="checkbox"/>
            <CollapsibleTitle/>
            <CollapsibleInfo/>
        </div>
    );
}

function CollapsibleTitle() {
    return (
        <div className="flex collapse-title py-0 px-0 items-center border-b-2">
            <div className="ml-2 w-12 h-full flex items-center justify-center">
                <img src="https://icon.horse/icon/mail.google.com" className="w-7 h-7"/>
            </div>
            <div className="ml-2">
                <h1 className="text-md">google.com</h1>
                <h2 className="text-xs text-gray-500">username@gmail.com</h2>
            </div>
            <div className="absolute right-12">
                <button className=" px-1 py-1 tooltip tooltip-left" data-tip="Copy Password."><img
                    src="/public/clipboard-icon.png"
                /></button>
            </div>
        </div>
    );
}

function CollapsibleInfo() {
    return (
        <div className="collapse-content flex">
            <div className="flex flex-col space-y-4 mt-2">
                <Website/>
                <Username/>
                <Password/>
            </div>
            <div className="absolute right-4 mt-4 space-x-4">
                <EditButton/>
                <DeleteButton/>
            </div>
        </div>
    );
}

function Website() {
    return (
        <label htmlFor="website">
            <p className="text-lg">Website:</p>
            <input type="text" id="website" name="website"
                   className="input bg-white border-gray-500 rounded-none h-8"/>
        </label>
    );
}

function Username() {
    return (
        <label htmlFor="username">
            <p className="text-lg">Username:</p>
            <div className="flex space-x-2">
                <input type="text" id="username" name="username"
                       className="input bg-white border-gray-500 rounded-none h-8" required/>
                <button className="px-1 py-1 tooltip tooltip-right" data-tip="Copy to clipboard."><img
                    src="/public/clipboard-icon.png"
                /></button>
            </div>
        </label>
    )
}

function Password() {
    return (
        <label htmlFor="password">
            <p className="text-lg">Password:</p>
            <div className="flex space-x-2">
                <input type="password" id="password" name="password"
                       className="input bg-white border-gray-500 rounded-none h-8" required/>
                <button className=" px-1 py-1"><img
                    src="/public/show-password-icon.png"
                /></button>
                <button className=" px-1 py-1 tooltip tooltip-right" data-tip="Copy to clipboard."><img
                    src="/public/clipboard-icon.png"
                /></button>
            </div>
        </label>
    );
}

function EditButton() {
    return (
        <button
            className="bg-green-500 text-white px-4 py-2 hover:bg-green-400 active:bg-green-600 shadow-lg
                        transition">Edit Account
        </button>
    );
}

function DeleteButton() {
    return (
        <button
            className="bg-red-500 text-white px-4 py-2 hover:bg-red-400 active:bg-red-600 shadow-lg
                        transition">Delete Account
        </button>
    )
}