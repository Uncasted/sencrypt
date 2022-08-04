import PropTypes from 'prop-types'

export default function SecondaryButton (props) {
  const hoverColor = `hover:bg-${props.hoverColor}`
  const activeColor = `active:bg-${props.activeColor}`

  return (
    <button
      type={props.type || 'button'}
      form={props.form || null}
      tabIndex={props.tabIndex || 0}
      disabled={props.disabled || false}
      onPointerDown={event => {
        // Prevent the focus outline from appearing on click.
        event.preventDefault()
      }}
      onClick={props.onClick || null}
      className={`bg-[#00293d] text-white shadow-md transition ${hoverColor} ${activeColor} h-10 w-full 
      focus:outline-none focus:ring focus:ring-[#003D5C] focus:ring-offset-4 focus:ring-offset-[#000e14] 
      disabled:text-gray-300 disabled:bg-[#001824] disabled:cursor-not-allowed rounded-sm`}
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
  children: PropTypes.node
}
