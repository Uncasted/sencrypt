import {useState} from "react";
import {AccountModal, AddAccount} from "./AddAccount";
import {AccountInfo} from "./AccountInfo";

export function Accounts() {
    // Placeholder information
    const accounts = [{
        website: "steamcommunity.com",
        username: "username",
        password: "password"
    }, {
        website: "google.com",
        username: "username@gmail.com",
        password: "admin123"
    }];

    const [myAccounts, setMyAccounts] = useState(accounts);

    const removeAccount = (index) => {
        // I have to make a copy of the array or the splice method won't work properly.
        const newState = [...myAccounts];
        newState.splice(index, 1);
        setMyAccounts(newState);
    };

    return (
        <div className="mt-8">
            <AddAccount/>
            <AccountModal/>
            <div className="mt-8 space-y-1 px-2" id="account-list">
                {!myAccounts.length ? <EmptyPlaceholder/> : null}
                {myAccounts.map(account => {
                    return (
                        <AccountInfo key={`${account.username}-${account.website}`}
                                     website={account.website}
                                     username={account.username}
                                     password={account.password}
                                     index={myAccounts.indexOf(account)}
                                     removeAccount={removeAccount}/>
                    );
                })}
            </div>
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