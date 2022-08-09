import PropTypes from 'prop-types'

export default function SectionHeader (props) {
  return (
    <div className='bg-[#00141f] text-white fixed w-full py-8 pl-4 shadow-md z-10'>
      <div className='no-select flex items-center'>
        <h1
          tabIndex='-1'
          className='text-3xl font-semibold pb-2 flex items-center'
        >
          <img src={props.icon} alt='icon' className='mr-4' />
          {props.children}
        </h1>
      </div>
    </div>
  )
}

SectionHeader.propTypes = {
  icon: PropTypes.string,
  children: PropTypes.node
}
