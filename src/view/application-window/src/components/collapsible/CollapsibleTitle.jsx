import PropTypes from 'prop-types'

export default function CollapsibleTitle (props) {
  return (
    <div
      tabIndex={props.tabIndex || -1}
      onKeyDown={event => {
        if (event.key === 'Enter' || event.key === ' ') {
          // Pressing enter or space bar triggers the collapsible.
          props.toggleCollapsible()
        }
      }}
      onPointerDown={event => {
        // Prevent the focus outline from appearing on click.
        event.preventDefault()
      }}
      className='flex py-0 px-0 items-center shadow-md focus:outline-none focus:ring focus:ring-[#003D5C]
      transition rounded-sm'
    >
      {props.children}
    </div>
  )
}

CollapsibleTitle.propTypes = {
  tabIndex: PropTypes.number,
  toggleCollapsible: PropTypes.func,
  children: PropTypes.node
}
