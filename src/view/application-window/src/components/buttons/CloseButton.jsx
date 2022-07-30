import { IMAGES } from '../../data/constants'

export default function CloseButton () {
  const handleClose = () => {
    // Close/Hide the window.
    window.mainWin.closeWindow()
  }

  return (
    <button
      onClick={handleClose}
      className='hover:bg-red-500 px-4 transition'
    >
      <img
        src={IMAGES.CLOSE_ICON}
        alt='Minimize'
        className='w-[20px] h-[20px]'
      />
    </button>
  )
}
