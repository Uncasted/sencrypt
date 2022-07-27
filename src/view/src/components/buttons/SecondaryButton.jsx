import PropTypes from "prop-types"

export default function SecondaryButton(props) {
  const hoverColor = `hover:bg-${props.hoverColor}`
  const activeColor = `active:bg-${props.activeColor}`

  return (
    <button
      type={props.type || "button"}
      form={props.form || null}
      tabIndex={props.tabIndex || 0}
      disabled={props.disabled || false}
      onClick={props.onClick || null}
      className={`bg-blue-3 text-white px-4 py-2 shadow-md transition ${hoverColor} ${activeColor} h-10
                focus:outline-gray-200 disabled:text-gray-300 disabled:bg-dark-blue-4 disabled:cursor-not-allowed`}
    >
      {props.children}
    </button>
  )
}

SecondaryButton.propTypes = {
  hoverColor: PropTypes.string,
  activeColor: PropTypes.string,
  type: PropTypes.any,
  form: PropTypes.string,
  tabIndex: PropTypes.number,
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
  children: PropTypes.node,
}
