import {useIndexContext} from "../../../context/accounts/IndexContext"
import SecondaryButton from "../../../components/buttons/SecondaryButton"


export function DeleteButton() {
    // Context
    const index = useIndexContext()

    const deleteWarning = () => {
        // Click on the label to show the warning.
        const warning = document.getElementById(`delete-warn-${index}`)
        warning.click()
        // Focus the "delete modal".
        const delModal = document.getElementById(`delete-box-${index}`)
        delModal.focus()
    }

    return (
        <>
            <label htmlFor={`delete-modal-${index}`}
                   id={`delete-warn-${index}`}
                   className="hidden">
            </label>
            <SecondaryButton type="button"
                             tabIndex={29}
                             hoverColor="red-500"
                             activeColor="red-600"
                             onClick={deleteWarning}
            >
                Delete Account
            </SecondaryButton>
        </>
    )
}
