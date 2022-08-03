import { IMAGES } from '../../data/constants'
import { useRef } from 'react'

export default function CloseButton () {
  // Ref
  const buttonRef = useRef(null)

  const handleClose = () => {
    // Close/Hide the window.
    window.mainWin.closeWindow()
  }

  return (
    <button
      onClick={handleClose}
      ref={buttonRef}
      tabIndex='-1'
      className='hover:bg-red-500 px-4 transition'
    >
      <div
        tabIndex='9'
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
        <img
          src={IMAGES.CLOSE_ICON}
          alt='Minimize'
          className='w-[20px] h-[20px]'
        />
      </div>
    </button>
  )
}
