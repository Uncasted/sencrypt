import { IMAGES } from '../../data/constants'
import { useSidebarContextUpdate } from '../../context/SidebarContext'

export default function ToggleSideBarButton () {
  // Context
  const { handleCollapse, handleMargin } = useSidebarContextUpdate()
  // Toggle the margin and the Sidebar.
  const handleSidebar = () => {
    handleCollapse()
    handleMargin()
  }

  return (
    <button onClick={handleSidebar}>
      <img
        src={IMAGES.SIDEBAR_ICON}
        alt='Sidebar icon'
        className='w-[20px] h-[20px]'
      />
    </button>
  )
}
