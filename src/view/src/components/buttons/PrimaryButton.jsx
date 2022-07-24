import PropTypes from "prop-types"

export default function PrimaryButton(props) {
  const hoverColor = `hover:bg-${props.hoverColor}`
  const activeColor = `active:bg-${props.activeColor}`
  const width = `w-${props.width}`

  return (
    <button
      type={props.type || "button"}
      form={props.form || null}
      tabIndex={props.tabIndex || 0}
      disabled={props.disabled || false}
      onClick={props.onClick || null}
      className={`${width} modal-button bg-dark-blue-1 px-4 py-3 text-white ${hoverColor} ${activeColor}
               transition hover:cursor-pointer shadow-md focus:outline-gray-200 disabled:bg-dark-blue-7 
               disabled:cursor-not-allowed disabled:text-gray-300`}
    >
      {props.children}
    </button>
  )
}

PrimaryButton.propTypes = {
  width: PropTypes.number,
  hoverColor: PropTypes.string,
  activeColor: PropTypes.string,
  type: PropTypes.any,
  form: PropTypes.string,
  tabIndex: PropTypes.number,
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
  children: PropTypes.node,
}
