import PropTypes from 'prop-types'

export default function TrayButton (props) {
  return (
    <button
      onClick={props?.onClick}
      className='w-full text-start text-xl pl-4 py-4 hover:bg-[#00141F] transition flex focus:outline-gray-200
      hover:cursor-pointer'
    >
      <img
        src={props.icon}
        alt={props.altIcon}
        className='w-7 h-7 mr-4 no-select'
      />
      {props.title}
    </button>
  )
}

TrayButton.propTypes = {
  icon: PropTypes.string,
  altIcon: PropTypes.string,
  title: PropTypes.string,
  onClick: PropTypes.func
}
