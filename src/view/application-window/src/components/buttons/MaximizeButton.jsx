import { IMAGES } from '../../data/constants'
import { useEffect, useState } from 'react'

export default function MaximizeButton () {
  const [icon, setIcon] = useState(IMAGES.MAXIMIZE_ICON)

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
      className='hover:bg-[#00141F] px-4 transition'
    >
      <img
        src={icon}
        alt='Maximize'
        className='w-[20px] h-[20px]'
      />
    </button>
  )
}
