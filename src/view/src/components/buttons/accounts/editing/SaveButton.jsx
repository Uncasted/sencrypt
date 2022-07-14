import {useIDContext} from "../../../../context/accounts/IDContext"
import {useEditContext} from "../../../../context/accounts/EditContext"
import {useInputContext} from "../../../../context/accounts/InputContext"

export function SaveButton(props) {
    // Context
    const editFormID = useIDContext().editFormID
    const isEditable = useEditContext()
    const input = useInputContext()

    return (
        <button type="submit"
                form={editFormID}
                tabIndex={props.showContent ? 28 : -1}
                disabled={isEditable || (!input.username || !input.password || !input.website)}
                className="bg-blue-3 text-white px-4 py-2 hover:bg-green-500 active:bg-green-600 shadow-md
                transition disabled:text-gray-300 disabled:bg-dark-blue-4 disabled:cursor-not-allowed
                focus:outline-gray-200">
            Save Changes
        </button>
    )
}
