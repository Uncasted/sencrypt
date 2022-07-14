export default function PrimaryButton(props) {
    const hoverColor = `hover:bg-${props.hoverColor}`
    const activeColor = `active:bg-${props.activeColor}`

    return (
        <button type={props.type || "button"}
                form={props.form || null}
                tabIndex={props.tabIndex || 0}
                disabled={props.disabled || false}
                onClick={props.onClick || null}
                className={`ml-4 modal-button bg-dark-blue-1 px-4 py-3 text-white ${hoverColor} ${activeColor}
               transition hover:cursor-pointer shadow-md focus:outline-gray-200 disabled:bg-dark-blue-7 
               disabled:cursor-not-allowed disabled:text-gray-300`}
        >
            {props.children}
        </button>
    )
}