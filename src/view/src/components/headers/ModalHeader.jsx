import {useRef} from "react"
import PropTypes from "prop-types"

export default function ModalHeader(props) {
    const headerRef = useRef(null)

    const closeModal = () => {
        // Close the modal by clicking on the label.
        const headerButton = headerRef.current
        headerButton.click()
    }

    return (
        <div className="bg-blue-3 text-white w-full py-4 pl-4 mb-4">
            <label htmlFor={props.htmlFor}
                   ref={headerRef}
            >
                <button type="button"
                        tabIndex={props.tabIndex || 0}
                        onClick={closeModal}
                        className="btn bg-transparent border-none absolute right-2 top-1 text-white rounded-none
                           hover:bg-transparent focus:outline-gray-200"
                >
                    ✕
                </button>
            </label>
            <h1 className="text-lg">
                {props.children}
            </h1>
        </div>
    )
}

ModalHeader.propTypes = {
    htmlFor: PropTypes.string,
    tabIndex: PropTypes.number,
    children: PropTypes.node
}