import { IMAGES } from '../../data/constants'
import { useEffect, useState, useRef } from 'react'

export default function MaximizeButton () {
  // State
  const [icon, setIcon] = useState(IMAGES.MAXIMIZE_ICON)

  // Ref
  const buttonRef = useRef(null)

  // Event listener for changing the state on window resize.
  useEffect(() => {
    window.addEventListener('resize', () => {
      if (isMaximized()) {
        setIcon(IMAGES.UNMAXIMIZE_ICON)
      } else {
        setIcon(IMAGES.MAXIMIZE_ICON)
      }
    })
  }, [])

  // Check if the window is maximized.
  const isMaximized = () => {
    const isMaxWidth = screen.availWidth === window.innerWidth
    const isMaxHeight = screen.availHeight === window.innerHeight
    return isMaxWidth && isMaxHeight
  }

  const handleMaximize = () => {
    // Maximize the window.
    window.mainWin.maximize()
    // Toggle the button icon.
    setIcon(prevIcon => {
      return prevIcon === IMAGES.MAXIMIZE_ICON ? IMAGES.UNMAXIMIZE_ICON : IMAGES.MAXIMIZE_ICON
    })
  }

  return (
    <button
      onClick={handleMaximize}
      ref={buttonRef}
      tabIndex='-1'
      className='hover:bg-[#00141F] px-4 transition'
    >
      <div
        tabIndex='8'
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
          src={icon}
          alt='Maximize'
          className='w-[20px] h-[20px]'
        />
      </div>
    </button>
  )
}
