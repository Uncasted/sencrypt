export default function SubmitAccount(props) {
    return (
        <label htmlFor="add-modal"
               id="add-modal-label">
            <input type="submit"
                   value="Add Account"
                   tabIndex="13"
                   disabled={!props.account.username || !props.account.password || !props.account.website}
                   className="bg-blue-3 px-4 py-2 text-white hover:bg-blue-1 active:bg-blue-2 transition
            hover:cursor-pointer mb-4 disabled:text-gray-300 disabled:bg-dark-blue-4 disabled:cursor-not-allowed
            focus:outline-gray-200"/>
        </label>
    )
}