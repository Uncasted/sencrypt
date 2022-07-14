import {useIndexContext} from "../../context/accounts/IndexContext"
import DeleteModalHeader from "../headers/DeleteModalHeader"
import DeleteModalWarning from "./DeleteModalWarning"

export function DeleteAccountModal() {
    // Context
    const index = useIndexContext()

    return (
        <div>
            <input type="checkbox"
                   id={`delete-modal-${index}`}
                   tabIndex="-1"
                   className="modal-toggle"/>
            <div className="modal">
                <label id={`delete-box-${index}`}
                       tabIndex="30"
                       className="modal-box bg-dark-blue-1 rounded-none px-0 py-0 w-[400px] h-[200px] shadow-sm
                       text-white focus:outline-none"
                >
                    <DeleteModalHeader/>
                    <DeleteModalWarning/>
                </label>
            </div>
        </div>
    )
}



