import PropTypes from 'prop-types'

export default function PrimaryButton (props) {
  const hoverColor = `hover:bg-${props.hoverColor}`
  const activeColor = `active:bg-${props.activeColor}`
  const offsetColor = `focus:ring-offset-${props.offsetColor}`
  const width = `w-${props.width || 'full'}`
  const height = `h-${props.height || '12'}`

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
      className={`${width} ${height} modal-button bg-[#00293d] text-white ${hoverColor} ${activeColor}
               transition hover:cursor-pointer shadow-md focus:outline-none focus:ring focus:ring-[#003D5C] 
               focus:ring-offset-4 ${offsetColor} disabled:bg-[#001B29] disabled:cursor-not-allowed 
               disabled:text-gray-300 rounded-sm `}
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
  height: PropTypes.number,
  offsetColor: PropTypes.string
}
