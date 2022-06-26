export function AddAccount() {
    return (
        <label htmlFor="my-modal"
               className="ml-4 modal-button bg-black px-6 py-3 text-white hover:bg-black-1 active:bg-black
               transition hover:cursor-pointer">
            Add new account
        </label>
    );
}

export function AccountModal() {
    return (
        <>
            <input type="checkbox" id="my-modal" className="modal-toggle"/>
            <div className="modal">
                <div className="modal-box bg-white rounded-none px-0 py-0 w-[400px]">
                    <div className="bg-black text-white w-full py-4 pl-4 mb-4">
                        <label htmlFor="my-modal"
                               className="btn bg-transparent border-none absolute right-2 top-1 text-white rounded-none
                           hover:bg-black">✕</label>
                        <h1 className="text-xl">Add new Account:</h1>
                    </div>
                    <form className="flex flex-col items-center space-y-4">
                        <label htmlFor="website">
                            <p className="text-lg">Website:</p>
                            <input type="text" id="website" name="website"
                                   className="input bg-white border-black rounded-none"/>
                        </label><label htmlFor="username">
                        <p className="text-lg">Username:</p>
                        <input type="text" id="username" name="username"
                               className="input bg-white border-black rounded-none" required/>
                    </label><label htmlFor="password">
                        <p className="text-lg">Password:</p>
                        <input type="password" id="password" name="password"
                               className="input bg-white border-black rounded-none" required/>
                    </label>
                        <div className="modal-action">
                            <label htmlFor="my-modal" className="bg-black px-6 py-3 text-white hover:bg-black-1
                            active:bg-black transition hover:cursor-pointer mb-4 mt-4">Add Account</label>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}