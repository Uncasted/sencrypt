import { IMAGES } from '../../data/constants'
import { useRef } from 'react'

export default function MinimizeButton () {
  // Ref
  const buttonRef = useRef(null)

  const handleMinimize = () => {
    // Minimize the window.
    window.mainWin.minimize()
  }

  return (
    <button
      onClick={handleMinimize}
      tabIndex='-1'
      className='hover:bg-[#00293d] px-4 transition'
      ref={buttonRef}
    >
      <div
        tabIndex='7'
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
          src={IMAGES.MINIMIZE_ICON}
          alt='Minimize'
          className='w-[20px] h-[20px]'
        />
      </div>
    </button>
  )
}
