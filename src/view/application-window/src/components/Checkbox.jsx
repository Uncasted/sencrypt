import PropTypes from 'prop-types'

export default function Checkbox (props) {
  return (
    <div className='space-x-2 flex items-center'>
      <input
        type='checkbox'
        checked={props.checked || null}
        onClick={props.onClick || null}
        onKeyDown={props.onKeyDown || null}
        className='checkbox checkbox-sm checkbox-primary rounded-none border-2'
      />
      {props.title && <span className='no-select'>{props.title}</span>}
    </div>
  )
}

Checkbox.propTypes = {
  checked: PropTypes.bool,
  onClick: PropTypes.func,
  onKeyDown: PropTypes.func,
  title: PropTypes.string
}
