import PropTypes from "prop-types"

export default function SectionHeader(props) {
    return (
        <div className="mb-8 no-select">
            <h1 tabIndex="-1"
                className="text-3xl font-semibold pb-2 flex items-center"
            >
                <img src={props.icon}
                     alt="Generator icon"
                     className="mr-1"
                />
                {props.children}
            </h1>
            {/*Header border*/}
            <div className="shadow-md ml-[-1.5rem] h-4"></div>
        </div>
    )
}

SectionHeader.propTypes = {
    icon: PropTypes.string,
    children: PropTypes.node
}