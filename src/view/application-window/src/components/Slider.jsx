import PropTypes from 'prop-types'
import InputNumberBox from './InputNumberBox'

export default function Slider (props) {
  return (
    <>
      <div className='flex items-center space-x-2'>
        {props.title && (
          <span className='text-sm no-select'>{props.title}</span>
        )}
        {props.enableInput && (
          <div className='bg-dark-blue-5'>
            <InputNumberBox
              min={props.min || null}
              max={props.max || null}
              value={props.defaultLength}
              onChange={props.inputOnChange || null}
              onKeyDown={props.inputOnKeyDown || null}
            />
          </div>
        )}
      </div>
      <input
        type='range'
        min={props.min || null}
        max={props.max || null}
        value={props.defaultLength || null}
        onChange={props.onChange || null}
        className='custom-slider slider-progress w-full cursor-pointer focus:outline-gray-200'
      />
    </>
  )
}

Slider.propTypes = {
  title: PropTypes.string,
  enableInput: PropTypes.bool,
  min: PropTypes.number,
  max: PropTypes.number,
  defaultLength: PropTypes.string,
  inputOnChange: PropTypes.func,
  inputOnKeyDown: PropTypes.func,
  onChange: PropTypes.func
}
