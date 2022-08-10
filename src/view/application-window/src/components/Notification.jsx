import PropTypes from 'prop-types'

export default function Notification (props) {
  return (
    <div
      id='app-notification'
      className='flex fixed items-center justify-center bg-[#003d5c] w-fit px-4 h-[40px] max-h-0 rounded-[25px]
         bottom-[-20rem] right-[50%] left-[50%] overflow-hidden shadow-sm'
    >
      {props.icon
        ? (
          <div className='flex justify-content space-x-2'>
            <img
              src={props.icon}
              alt='Success.'
              className='w-4 h-4'
            />
            <h1 className='text-white text-sm'>
              {props.title}
            </h1>
          </div>
          )
        : (
          <h1 className='text-white text-sm'>
            {props.title}
          </h1>
          )}
    </div>
  )
}

Notification.PropTypes = {
  title: PropTypes.string,
  icon: PropTypes.string
}
