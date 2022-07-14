import PrimaryButton from "../../../components/buttons/PrimaryButton"

export function AddAccountButton() {

    const addAccount = () => {
        // Click on the label to show the add account modal.
        const addModal = document.getElementById(`open-add-account`)
        addModal.click()
        // Focus on the form.
        const newWebsite = document.getElementById("new-website")
        newWebsite.focus()
    }

    return (
        <label htmlFor="add-modal"
               id="open-add-account">
            <PrimaryButton type="button"
                           tabIndex={0}
                           hoverColor="blue-1"
                           activeColor="blue-2"
                           onClick={addAccount}
            >
                Add New Account
            </PrimaryButton>
        </label>
    )
}