import {DeleteAccountModal} from "./modal/DeleteAccountModal"
import IdProvider from "../../context/accounts/IdContext"
import EditProvider from "../../context/accounts/EditContext"
import InputProvider from "../../context/accounts/InputContext"
import Collapsible from "../../components/collapsible/Collapsible"
import ClipboardButton from "../../components/buttons/ClipboardButton"
import {COPY_PASSWORD} from "../../data/constants"
import AccountInfo from "./AccountInfo"
import AccountTitle from "./AccountTitle"

export function Account(props) {
    const account = props.account

    return (
        <div>
            <IdProvider>
                <div className="shadow-total bg-dark-blue-0 text-white">
                    <div className="absolute right-14 mt-1">
                        {/*We need to have the clipboard button outside, or it will open the menu when clicked.*/}
                        <ClipboardButton value={account.password}
                                         tooltip={COPY_PASSWORD}
                                         tooltipDirection="left"
                                         tabIndex={2}
                        />
                    </div>
                    <div>
                        <InputProvider username={account.username}
                                       password={account.password}
                                       website={account.website}
                        >
                            <EditProvider>
                                <Collapsible title={<AccountTitle/>}
                                             tabIndex={1}
                                >
                                    <AccountInfo/>
                                </Collapsible>
                            </EditProvider>
                        </InputProvider>
                    </div>
                </div>
                <DeleteAccountModal/>
            </IdProvider>
        </div>
    )
}