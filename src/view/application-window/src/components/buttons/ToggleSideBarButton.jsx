import { IMAGES } from '../../data/constants'

export default function ToggleSideBarButton () {
  return (
    <button>
      <img
        src={IMAGES.SIDEBAR_ICON}
        alt='Sidebar icon'
        className='w-[20px] h-[20px]'
      />
    </button>
  )
}
