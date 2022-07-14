import {DeleteAccountModal} from "./modal/DeleteAccountModal"
import IDProvider from "../../context/accounts/IDContext"
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
            <IDProvider>
                <div className="shadow-total bg-dark-blue-0 text-white">
                    <div className="absolute right-14 mt-1">
                        <ClipboardButton input={account.password}
                                         tooltip={COPY_PASSWORD}
                                         tooltipDirection="tooltip-left"
                                         tabIndex={1}
                        />
                    </div>
                    <div>
                        <InputProvider username={account.username}
                                       password={account.password}
                                       website={account.website}
                        >
                            <EditProvider>
                                <Collapsible title={<AccountTitle/>}>
                                    <AccountInfo/>
                                </Collapsible>
                            </EditProvider>
                        </InputProvider>
                    </div>
                </div>
                <DeleteAccountModal/>
            </IDProvider>
        </div>
    )
}