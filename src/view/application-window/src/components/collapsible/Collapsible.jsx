import { useState, cloneElement } from 'react'
import CollapsibleTitle from './CollapsibleTitle'
import PropTypes from 'prop-types'

export default function Collapsible (props) {
  // State.
  const [open, setOpen] = useState(false)

  const toggleCollapsible = () => {
    setOpen(prevOpen => !prevOpen)
  }

  return (
    <>
      <div onClick={toggleCollapsible} className='title cursor-pointer'>
        <CollapsibleTitle
          toggleCollapsible={toggleCollapsible}
          tabIndex={props.tabIndex}
        >
          {/* We need to clone the title to pass props to it. */}
          {cloneElement(props.title, { isOpen: open })}
        </CollapsibleTitle>
      </div>
      {/* Display the children if showContent is true. */}
      <div className={open ? 'content show' : 'content'}>{props.children}</div>
    </>
  )
}

Collapsible.propTypes = {
  tabIndex: PropTypes.number,
  title: PropTypes.node,
  children: PropTypes.node
}
