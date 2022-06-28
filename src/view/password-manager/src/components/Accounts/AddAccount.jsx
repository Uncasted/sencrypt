export function AddAccountButton() {
    return (
        <label htmlFor="add-modal"
               className="ml-4 modal-button bg-black px-6 py-3 text-white hover:bg-black-1 active:bg-black
               transition hover:cursor-pointer shadow-lg">
            Add new account
        </label>
    );
}

export function AccountModal(props) {
    const submitData = (event) => {
        event.preventDefault();
        const form = event.target.elements;

        // Get each value from the form.
        props.createAccount({
            website: form["new-website"].value,
            username: form["new-username"].value,
            password: form["new-password"].value
        });

        // We need to click the label to close the modal.
        const addModalLabel = document.querySelector("#add-modal-label");
        addModalLabel.click();

        // Clear the value of the elements after adding the account.
        for (let element of form) {
            element.value = "";
        }

    }

    return (
        <>
            <input type="checkbox" id="add-modal" className="modal-toggle"/>
            <div className="modal">
                <div className="modal-box bg-white rounded-none px-0 py-0 w-[400px]">
                    <ModalHeader/>
                    <form className="flex flex-col items-center space-y-4" id="add-form" onSubmit={submitData}>
                        <Website/>
                        <Username/>
                        <Password/>
                        <div className="modal-action">
                            <SubmitAccount/>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

function ModalHeader() {
    return (
        <div className="bg-black text-white w-full py-4 pl-4 mb-4">
            <label htmlFor="add-modal"
                   className="btn bg-transparent border-none absolute right-2 top-1 text-white rounded-none
                           hover:bg-black">✕</label>
            <h1 className="text-xl">Add new Account:</h1>
        </div>
    );
}

function Website() {
    return (
        <label htmlFor="new-website">
            <p className="text-lg">Website:</p>
            <input type="text" id="new-website" name="new-website"
                   className="border-[1px] pl-2 border-gray-500 rounded-none h-10" required/>
        </label>
    )
}

function Username() {
    return (
        <label htmlFor="new-username">
            <p className="text-lg">Username:</p>
            <input type="text" id="new-username" name="new-username"
                   className="border-[1px] pl-2 border-gray-500 rounded-none h-10" required/>
        </label>
    );
}

function Password() {
    return (
        <label htmlFor="new-password">
            <p className="text-lg">Password:</p>
            <input type="password" id="new-password" name="new-password"
                   className="border-[1px] pl-2 border-gray-500 rounded-none h-10" required/>
        </label>
    );
}

function SubmitAccount() {
    return (
        <label htmlFor="add-modal" id="add-modal-label">
            <input className="bg-black px-6 py-3 text-white hover:bg-black-1 active:bg-black transition
            hover:cursor-pointer mb-4 mt-4"
                   type="submit"
                   value="Add Account"/>
        </label>
    );
}