import PropTypes from "prop-types"

export default function Option(props) {
    return (
        <div className="border-t-2 border-blue-3 mx-20 text-white">
            <div className="flex justify-between items-center">
                <div className="py-10">
                    <h1 className="text-md">
                        {props.label}
                    </h1>
                </div>
                <div>
                    {props.children}
                </div>
            </div>
        </div>
    )
}

Option.propTypes = {
    label: PropTypes.string,
    children: PropTypes.node
}