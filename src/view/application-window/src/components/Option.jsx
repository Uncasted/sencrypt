import PropTypes from 'prop-types'

export default function Option (props) {
  return (
    <div className='flex justify-between items-center'>
      <div className='py-8'>
        <h1 className='text-md'>{props.label}</h1>
      </div>
      <div>{props.children}</div>
    </div>
  )
}

Option.propTypes = {
  label: PropTypes.string,
  children: PropTypes.node
}
