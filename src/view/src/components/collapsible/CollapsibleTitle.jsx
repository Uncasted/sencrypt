import {useIndexContext} from "../../context/accounts/IndexContext"
import {useAccountsContext} from "../../context/accounts/AccountsContext"

export default function CollapsibleTitle(props) {
    // Context
    const index = useIndexContext()
    const account = useAccountsContext()[index]

    return (
        <div tabIndex="0"
             onKeyDown={(event) => {
                 if (event.key === "Enter") {
                     props.toggleCollapsible()
                 }
             }}
             className="flex py-0 px-0 items-center shadow-md pb-1 focus:outline-gray-200"
        >
            <div className="ml-2 w-12 h-full flex items-center justify-center">
                <img src={`https://icon.horse/icon/${account.website}`}
                     alt="Account icon"
                     className="w-7 h-7 no-select"
                />
            </div>
            <div className="ml-2">
                <h1 className="text-md">
                    {account.website}
                </h1>
                <h2 className="text-xs text-blue-0">
                    {account.username}
                </h2>
            </div>
            <div className="absolute right-6">
                <span>
                    {props.isOpen ? "-" : "+"}
                </span>
            </div>
        </div>
    )
}