export function DeleteAccountModal(props) {
    return (
        <div>
            <input type="checkbox" id={`delete-modal-${props.accountIndex}`} className="modal-toggle"/>
            <div className="modal">
                <div className="modal-box bg-white rounded-none px-0 py-0 w-[400px] h-[200px]">
                    <DeleteModalHeader accountIndex={props.accountIndex}/>
                    <DeleteModalWarning accountIndex={props.accountIndex}
                                        removeAccount={props.removeAccount}/>
                </div>
            </div>
        </div>
    )
}

function DeleteModalHeader(props) {
    return (
        <div className="bg-black text-white w-full py-4 pl-4 mb-4">
            <label htmlFor={`delete-modal-${props.accountIndex}`}
                   className="btn bg-transparent border-none absolute right-2 top-1 text-white rounded-none
                           hover:bg-black">✕</label>
            <h1 className="text-xl">Delete Account:</h1>
        </div>
    );
}

function DeleteModalWarning(props) {
    return (
        <div className="flex flex-col space-y-4">
            <div>
                <h1 className="text-lg ml-4">Are you sure you want to delete this account?</h1>
            </div>
            <div className="absolute right-4 bottom-4">
                <label htmlFor={`delete-modal-${props.accountIndex}`}
                       className="bg-red-600 text-white px-4 py-2 hover:bg-red-500 active:bg-red-700
                                   shadow-lg transition hover:cursor-pointer"
                       onClick={() => props.removeAccount(props.accountIndex)}
                >Delete Account
                </label>
            </div>
        </div>
    );
}