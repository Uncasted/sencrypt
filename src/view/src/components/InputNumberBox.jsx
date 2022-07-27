import PropTypes from 'prop-types'

export default function InputNumberBox (props) {
  return (
    <input
      type='number'
      min={props.min || null}
      max={props.max || null}
      value={props.value}
      onChange={props.onChange || null}
      onKeyDown={props.onKeyDown || null}
      className='bg-transparent w-8 text-center text-sm rounded-sm focus:outline-gray-200'
    />
  )
}

InputNumberBox.propTypes = {
  min: PropTypes.number,
  max: PropTypes.number,
  value: PropTypes.string,
  onChange: PropTypes.func,
  onKeyDown: PropTypes.func
}
