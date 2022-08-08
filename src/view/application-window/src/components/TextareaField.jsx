import { forwardRef } from 'react'
import PropTypes from 'prop-types'

const TextareaField = forwardRef((props, ref) => {
  const bgColor = `bg-${props.bgColor}`

  return (
    <label htmlFor={props.fieldId} className='space-y-3 w-full'>
      {props.title && <p className='text-md text-white'>{props.title}</p>}
      <textarea
        id={props.id}
        tabIndex={props.tabIndex}
        name={props.name}
        ref={ref}
        rows={props.rows}
        placeholder={props.placeholder}
        value={props.value}
        disabled={props.isEditable}
        data-outline={props.dataOutline}
        onChange={event => {
          props?.handleClick()
          props?.onChange(event.target.value)
        }}
        onClick={props?.handleClick}
        onKeyDown={props?.onKeyDown}
        className={`${bgColor} px-2 rounded-sm transition text-white text-white focus:outline-none outline-2 
      outline-red-500 focus:ring focus:ring-[#003D5C] w-full placeholder:text-[#00293d] disabled:text-[#00293d] 
      disabled:cursor-not-allowed overflow-scroll resize-none`}
      />
    </label>
  )
})

TextareaField.propTypes = {
  bgColor: PropTypes.string,
  title: PropTypes.string,
  tabIndex: PropTypes.number,
  type: PropTypes.string,
  id: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.string,
  placeholder: PropTypes.string,
  rows: PropTypes.number,
  isEditable: PropTypes.bool,
  dataOutline: PropTypes.string,
  handleClick: PropTypes.func,
  onChange: PropTypes.func,
  onKeyDown: PropTypes.func
}

TextareaField.displayName = 'TextareaField'
export default TextareaField
