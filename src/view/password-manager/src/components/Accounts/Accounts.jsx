import {AccountModal, AddAccount} from "./AddAccount";
import {AccountInfo} from "./AccountInfo";

export function Accounts() {
    return (
        <div className="mt-8">
            <AddAccount/>
            <AccountModal/>
            <div className="mt-8 space-y-1 px-2">
                {/*This contains placeholder info.*/}
                <AccountInfo/>
            </div>
            {/*<EmptyPlaceholder/>*/}
        </div>
    );
}

// This gets rendered when there aren't any accounts in the app.
function EmptyPlaceholder() {
    return (
        <div className="w-full h-[90vh] flex flex-col items-center justify-center">
            <h1 className="text-2xl text-gray-500">There isn't any accounts to show.</h1>
            <h1 className="text-lg text-gray-500">Add a new account by clicking on the "Add new account" button.</h1>
        </div>
    );
}