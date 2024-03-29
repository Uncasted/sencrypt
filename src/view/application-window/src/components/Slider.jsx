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
          <div className='bg-[#00293d] rounded-sm'>
            <InputNumberBox
              tabIndex={props.tabIndex}
              min={props.min || null}
              max={props.max || null}
              value={props.defaultLength}
              onChange={props.handleInputChange || null}
              onKeyDown={props.inputOnKeyDown || null}
              onBlur={props.handleInputBlur}
            />
          </div>
        )}
      </div>
      <input
        type='range'
        tabIndex={props.tabIndex + 1}
        min={props.min || null}
        max={props.max || null}
        value={props.defaultLength || null}
        onChange={props.onChange || null}
        className='custom-slider slider-progress w-full cursor-pointer focus:outline-none transition rounded-sm'
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
  handleInputChange: PropTypes.func,
  inputOnKeyDown: PropTypes.func,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  tabIndex: PropTypes.number
}
