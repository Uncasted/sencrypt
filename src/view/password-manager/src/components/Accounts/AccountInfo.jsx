import {useState, useId} from "react";
import {DeleteAccountModal} from "./DeleteAccount";

export function AccountInfo(props) {
    // Unique identifiers for each account.
    const websiteID = useId();
    const usernameID = useId();
    const passwordID = useId();

    // State.
    const [isEditable, setIsEditable] = useState(true);
    const [showInfo, setShowInfo] = useState(false);
    const [titleClipboard, setTitleClipboard] = useState("Copy Password.");
    const [clipboardText, setClipboardText] = useState("Copy to clipboard.");
    const [accountData, setAccountData] = useState({
        website: props.website,
        username: props.username,
        password: props.password
    });

    const handleAccountData = (data) => {
        setAccountData(data);
    }

    const addToClipboard = (data) => {
        // By doing this we can set the state on either tooltip with one function.
        setClipboardText("Copied!");
        setTitleClipboard("Copied!");
        navigator.clipboard.writeText(data);
    }

    // Change clipboard text when the mouse stops hovering over it.
    const tooltipOut = () => {
        setTimeout(() => {
            setClipboardText("Copy to clipboard.");
            setTitleClipboard("Copy Password.");
        }, 250);
    }

    // Make fields editable.
    const setEditMode = () => {
        setIsEditable(!isEditable);
    }

    return (
        <div>
            <div className="collapse collapse-plus shadow-total">
                <input type="checkbox" onClick={() => {
                    setShowInfo(!showInfo)
                }}/>
                <CollapsibleTitle accountData={accountData}
                                  clipboardText={titleClipboard}
                                  addToClipboard={addToClipboard}
                                  tooltipOut={tooltipOut}/>
                {showInfo ?
                    <CollapsibleInfo accountIndex={props.index}
                                     accountData={accountData}
                                     websiteID={websiteID}
                                     usernameID={usernameID}
                                     passwordID={passwordID}
                                     clipboardText={clipboardText}
                                     addToClipboard={addToClipboard}
                                     tooltipOut={tooltipOut}
                                     isEditable={isEditable}
                                     setEditMode={setEditMode}
                                     handleAccountData={handleAccountData}/> : null}
            </div>
            <DeleteAccountModal accountIndex={props.index}
                                removeAccount={props.removeAccount}/>
        </div>
    );
}

function CollapsibleTitle(props) {

    return (
        <div className="flex collapse-title py-0 px-0 items-center border-b-2" tabIndex="-1">
            <div className="ml-2 w-12 h-full flex items-center justify-center">
                <img src={`https://icon.horse/icon/${props.accountData.website}`} className="w-7 h-7"/>
            </div>
            <div className="ml-2">
                <h1 className="text-md">{props.accountData.website}</h1>
                <h2 className="text-xs text-gray-500">{props.accountData.username}</h2>
            </div>
            <div className="absolute right-12">
                <button className=" px-1 py-1 tooltip tooltip-left"
                        onClick={() => {
                            props.addToClipboard(props.accountData.password)
                        }}
                        onMouseOut={props.tooltipOut}
                        data-tip={props.clipboardText}
                        tabIndex="-1"><img
                    src="/public/clipboard-icon.png"
                /></button>
            </div>
        </div>
    );
}

function CollapsibleInfo(props) {
    return (
        <div className="collapse-content flex">
            <div className="flex flex-col space-y-4 mt-2">
                <Website website={props.accountData.website}
                         websiteID={props.websiteID}
                         isEditable={props.isEditable}/>
                <Username username={props.accountData.username}
                          usernameID={props.usernameID}
                          clipboardText={props.clipboardText}
                          addToClipboard={props.addToClipboard}
                          tooltipOut={props.tooltipOut}
                          isEditable={props.isEditable}/>
                <Password password={props.accountData.password}
                          passwordID={props.passwordID}
                          clipboardText={props.clipboardText}
                          addToClipboard={props.addToClipboard}
                          tooltipOut={props.tooltipOut}
                          isEditable={props.isEditable}/>
            </div>
            <div className="absolute right-4 mt-4 space-x-4">
                <EditButton setEditMode={props.setEditMode}
                            websiteID={props.websiteID}
                            usernameID={props.usernameID}
                            passwordID={props.passwordID}
                            handleAccountData={props.handleAccountData}/>
                <DeleteButton accountIndex={props.accountIndex}/>
            </div>
        </div>
    );
}

function Website(props) {
    return (
        <label htmlFor={props.websiteID}>
            <p className="text-lg">Website:</p>
            <input type="text" id={props.websiteID} defaultValue={props.website}
                   className="border-[1px] pl-2 border-gray-500 rounded-none h-8 disabled:bg-gray-300
                   disabled:text-gray-400 disabled:cursor-not-allowed transition"
                   disabled={props.isEditable}/>
        </label>
    );
}

function Username(props) {

    return (
        <label htmlFor={props.usernameID}>
            <p className="text-lg">Username:</p>
            <div className="flex space-x-2">
                <input type="text" id={props.usernameID} defaultValue={props.username}
                       className="border-[1px] pl-2 border-gray-500 rounded-none h-8 disabled:bg-gray-300
                       disabled:text-gray-400 disabled:cursor-not-allowed transition"
                       disabled={props.isEditable} required/>
                <button className="px-1 py-1 tooltip tooltip-right" data-tip={props.clipboardText}
                        tabIndex="-1"
                        onClick={() => {
                            props.addToClipboard(props.username)
                        }}
                        onMouseOut={props.tooltipOut}><img
                    src="/public/clipboard-icon.png"
                /></button>
            </div>
        </label>
    )
}

function Password(props) {
    const [showPassword, setShowPassword] = useState("password");
    const [passwordIcon, setPasswordIcon] = useState("/public/hide-password-icon.png");

    const passwordVisibility = () => {
        const showIcon = "/public/show-password-icon.png";
        const hideIcon = "/public/hide-password-icon.png";

        // Change the password to type text so the user can see it.
        setShowPassword(showPassword === "password" ? "text" : "password");
        setPasswordIcon(passwordIcon === hideIcon ? showIcon : hideIcon);
    }

    return (
        <label htmlFor={props.passwordID}>
            <p className="text-lg">Password:</p>
            <div className="flex space-x-2">
                <input type={showPassword} id={props.passwordID} defaultValue={props.password}
                       disabled={props.isEditable}
                       className="border-[1px] pl-2 border-gray-500 rounded-none h-8 disabled:bg-gray-300
                       disabled:text-gray-400 disabled:cursor-not-allowed transition" required/>
                <button className="px-1 py-1" onClick={passwordVisibility} tabIndex="-1"><img
                    src={passwordIcon}
                /></button>
                <button className=" px-1 py-1 tooltip tooltip-right" data-tip={props.clipboardText}
                        tabIndex="-1"
                        onClick={() => {
                            props.addToClipboard(props.password)
                        }}
                        onMouseOut={props.tooltipOut}><img
                    src="/public/clipboard-icon.png"
                /></button>
            </div>
        </label>
    );
}

function EditButton(props) {
    const editText = "Edit Account";
    const saveText = "Save Changes";

    const [buttonText, setButtonText] = useState(editText);

    const handleButtonText = () => {
        setButtonText(buttonText === editText ? saveText : editText);
    }

    const saveChanges = () => {
        const website = document.getElementById(props.websiteID).value;
        const username = document.getElementById(props.usernameID).value;
        const password = document.getElementById(props.passwordID).value;

        const data = {
            "website": website,
            "username": username,
            "password": password
        }

        props.handleAccountData(data);
    }

    return (
        <button
            className="bg-green-500 text-white px-4 py-2 hover:bg-green-400 active:bg-green-600 shadow-lg
                        transition"
            onClick={() => {
                props.setEditMode();
                handleButtonText();
                saveChanges();
            }}>{buttonText}
        </button>
    );
}

function DeleteButton(props) {
    return (
        <label htmlFor={`delete-modal-${props.accountIndex}`}
               className="bg-red-500 text-white px-4 py-2 hover:bg-red-400 active:bg-red-600 shadow-lg
                        transition hover:cursor-pointer"
        >Delete Account
        </label>
    )
}
