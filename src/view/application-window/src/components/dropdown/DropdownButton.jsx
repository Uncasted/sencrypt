import PropTypes from 'prop-types'

export default function DropdownButton (props) {
  const bgColor = `bg-${props.bgColor}`
  const hoverColor = `hover:bg-${props.hoverColor}`

  return (
    <button
      id={props.id}
      onClick={(event) => {
        // Prevents the button from toggling the dropdown again when clicked.
        event.stopPropagation()
        props.onHandleSelected(props.index, props.children)
      }}
      className={`${bgColor} ${hoverColor} w-full transition rounded-md px-2 py-1 text-white pointer-events-auto`}
    >
      {props.children}
    </button>
  )
}

DropdownButton.propTypes = {
  children: PropTypes.node,
  bgColor: PropTypes.string,
  hoverColor: PropTypes.string,
  id: PropTypes.string,
  number: PropTypes.number,
  onHandleSelected: PropTypes.func
}
