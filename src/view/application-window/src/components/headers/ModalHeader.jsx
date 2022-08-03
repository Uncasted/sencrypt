import { useRef } from 'react'
import PropTypes from 'prop-types'

export default function ModalHeader (props) {
  const headerRef = useRef(null)
  const buttonRef = useRef(null)

  const closeModal = () => {
    // Close the modal by clicking on the label.
    const headerButton = headerRef.current
    headerButton.click()
  }

  return (
    <div className='bg-[#00141f] text-white w-full py-4 pl-4 mb-4'>
      <label htmlFor={props.htmlFor} ref={headerRef}>
        <button
          type='button'
          tabIndex='-1'
          ref={buttonRef}
          onClick={closeModal}
          className='btn bg-transparent border-none absolute right-1 top-1 text-white rounded-none
          hover:bg-transparent focus:outline-gray-200'
        >
          <div
            tabIndex={props.tabIndex || 0}
            onPointerDown={event => {
              // Prevent the focus outline from appearing on click.
              event.preventDefault()
            }}
            onKeyDown={(event => {
              // Press the button when they key is Enter or Space.
              if (event.key === 'Enter' || event.key === ' ') {
                const button = buttonRef.current
                button.click()
              }
            })}
            className='focus:outline-none focus:ring focus:ring-[#003D5C] px-1 py-1 rounded-sm transition'
          >
            <span>
              ✕
            </span>
          </div>
        </button>
      </label>
      <h1 className='text-lg'>{props.children}</h1>
    </div>
  )
}

ModalHeader.propTypes = {
  htmlFor: PropTypes.string,
  tabIndex: PropTypes.number,
  children: PropTypes.node
}
