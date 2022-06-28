import {useState, useId} from "react";
import {DeleteAccountModal} from "./DeleteAccount";

export function AccountInfo(props) {
    // Unique identifiers for each account.
    const websiteID = useId();
    const usernameID = useId();
    const passwordID = useId();
    const editFormID = useId();

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

    const saveAccountData = (data) => {
        setAccountData(data);
    }

    const addToClipboard = (data) => {
        // By doing this we can set the state on either tooltip with one function.
        setClipboardText("Copied!");
        setTitleClipboard("Copied!");
        navigator.clipboard.writeText(data);
    }

    // Change clipboard text when the mouse stops hovering over it.
    const onTooltipOut = () => {
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
                                  onTooltipOut={onTooltipOut}/>
                {showInfo && <CollapsibleInfo accountIndex={props.index}
                                              accountData={accountData}
                                              websiteID={websiteID}
                                              usernameID={usernameID}
                                              passwordID={passwordID}
                                              editFormID={editFormID}
                                              clipboardText={clipboardText}
                                              addToClipboard={addToClipboard}
                                              onTooltipOut={onTooltipOut}
                                              isEditable={isEditable}
                                              setEditMode={setEditMode}
                                              saveAccountData={saveAccountData}/>}
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
                        onMouseOut={props.onTooltipOut}
                        data-tip={props.clipboardText}
                        tabIndex="-1"><img
                    src="/public/clipboard-icon.png"
                /></button>
            </div>
        </div>
    );
}

function CollapsibleInfo(props) {
    const saveChanges = (event) => {
        event.preventDefault();
        // Get data from form.
        const form = event.target.elements;

        const data = {
            website: form['website'].value,
            username: form['username'].value,
            password: form['password'].value
        }

        props.saveAccountData(data);
    }

    return (
        <div className="collapse-content flex">
            <form className="flex flex-col space-y-4 mt-2" id={props.editFormID} onSubmit={saveChanges}>
                <Website website={props.accountData.website}
                         websiteID={props.websiteID}
                         isEditable={props.isEditable}/>
                <Username username={props.accountData.username}
                          usernameID={props.usernameID}
                          clipboardText={props.clipboardText}
                          addToClipboard={props.addToClipboard}
                          onTooltipOut={props.onTooltipOut}
                          isEditable={props.isEditable}/>
                <Password password={props.accountData.password}
                          passwordID={props.passwordID}
                          clipboardText={props.clipboardText}
                          addToClipboard={props.addToClipboard}
                          onTooltipOut={props.onTooltipOut}
                          isEditable={props.isEditable}/>
            </form>
            <div className="absolute right-4 mt-4 space-x-4">
                <EditButton setEditMode={props.setEditMode}
                            editFormId={props.editFormID}/>
                <DeleteButton accountIndex={props.accountIndex}/>
            </div>
        </div>
    );
}

function Website(props) {
    return (
        <label htmlFor={props.websiteID}>
            <p className="text-lg">Website:</p>
            <input type="text" id={props.websiteID} defaultValue={props.website} name="website"
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
                <input type="text" id={props.usernameID} defaultValue={props.username} name="username"
                       className="border-[1px] pl-2 border-gray-500 rounded-none h-8 disabled:bg-gray-300
                       disabled:text-gray-400 disabled:cursor-not-allowed transition"
                       disabled={props.isEditable} required/>
                <button className="px-1 py-1 tooltip tooltip-right" data-tip={props.clipboardText}
                        tabIndex="-1"
                        onClick={() => {
                            props.addToClipboard(props.username)
                        }}
                        onMouseOut={props.onTooltipOut}><img
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
                       disabled={props.isEditable} name="password"
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
                        onMouseOut={props.onTooltipOut}><img
                    src="/public/clipboard-icon.png"
                /></button>
            </div>
        </label>
    );
}

function EditButton(props) {
    const editLabel = "Edit Account";
    const saveLabel = "Save Changes";

    const [buttonText, setButtonText] = useState(editLabel);

    const handleButtonText = () => {
        setButtonText(buttonText === editLabel ? saveLabel : editLabel);
    }

    return (
        <button type="submit" form={props.editFormId}
                className="bg-black text-white px-4 py-1.5 hover:bg-green-500 active:bg-green-700 shadow-lg
                        transition"
                onClick={() => {
                    props.setEditMode();
                    handleButtonText();
                }}>{buttonText}
        </button>
    );
}

function DeleteButton(props) {
    return (
        <label htmlFor={`delete-modal-${props.accountIndex}`}
               className="bg-black text-white px-4 py-2 hover:bg-red-500 active:bg-red-700 shadow-lg
                        transition hover:cursor-pointer"
        >Delete Account
        </label>
    )
}
