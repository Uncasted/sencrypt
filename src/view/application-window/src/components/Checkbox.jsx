import PropTypes from 'prop-types'

export default function Checkbox (props) {
  return (
    <div className='space-x-2 flex items-center'>
      <input
        type='checkbox'
        id={props.id}
        checked={props.checked || null}
        onClick={props.onClick || null}
        onKeyDown={props.onKeyDown || null}
        className='checkbox checkbox-sm checkbox-primary rounded-sm border-2 transition'
      />
      {props.title && <span className='no-select'>{props.title}</span>}
    </div>
  )
}

Checkbox.propTypes = {
  checked: PropTypes.bool,
  onClick: PropTypes.func,
  onKeyDown: PropTypes.func,
  title: PropTypes.string,
  id: PropTypes.string
}
