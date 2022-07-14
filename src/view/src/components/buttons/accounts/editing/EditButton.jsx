export function EditButton(props) {
    return (
        <button type="button"
                tabIndex={props.showContent ? 27 : -1}
                onClick={props.toggleMode}
                className="bg-blue-3 text-white px-4 py-2 hover:bg-green-500 active:bg-green-600 shadow-md transition
                focus:outline-gray-200 h-10 mb-4">
            {props.buttonText}
        </button>
    )
}