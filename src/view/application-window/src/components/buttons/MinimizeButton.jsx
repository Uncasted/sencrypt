import { IMAGES } from '../../data/constants'

export default function MinimizeButton () {
  const handleMinimize = () => {
    // Minimize the window.
    window.mainWin.minimize()
  }

  return (
    <button
      onClick={handleMinimize}
      className='hover:bg-[#00141F] px-4 transition'
    >
      <img
        src={IMAGES.MINIMIZE_ICON}
        alt='Minimize'
        className='w-[20px] h-[20px]'
      />
    </button>
  )
}
