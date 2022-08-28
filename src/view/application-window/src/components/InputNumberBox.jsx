import PropTypes from 'prop-types'

export default function InputNumberBox (props) {
  return (
    <input
      type='number'
      tabIndex={props.tabIndex}
      min={props.min || null}
      max={props.max || null}
      value={props.value}
      onChange={props.onChange || null}
      onKeyDown={props.onKeyDown || null}
      onBlur={props.onBlur}
      disabled={props.disabled}
      className='bg-transparent w-8 text-center text-sm rounded-sm focus:outline-none focus:ring focus:ring-[#003D5C]
      disabled:text-gray-300 disabled:cursor-not-allowed'
    />
  )
}

InputNumberBox.propTypes = {
  min: PropTypes.number,
  max: PropTypes.number,
  value: PropTypes.string,
  onChange: PropTypes.func,
  onKeyDown: PropTypes.func,
  onBlur: PropTypes.func,
  disabled: PropTypes.bool,
  tabIndex: PropTypes.number
}
