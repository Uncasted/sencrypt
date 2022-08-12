import PropTypes from 'prop-types'

export default function DropdownButton (props) {
  const bgColor = `bg-${props.bgColor}`
  const hoverColor = `hover:bg-${props.hoverColor}`

  return (
    <button
      onClick={(event) => {
        // Prevents the button from toggling the dropdown again when clicked.
        event.stopPropagation()
      }}
      className={`${bgColor} ${hoverColor} w-full transition rounded-md px-2 py-1 text-white pointer-events-auto`}
    >
      {props.children}
    </button>
  )
}

DropdownButton.propTypes = {
  children: PropTypes.node,
  bgColor: PropTypes.string
}
