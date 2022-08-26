import { IMAGES } from '../../data/constants'
import { useSidebarContextUpdate } from '../../context/SidebarContext'
import { useRef } from 'react'
import { useAnimationStateContext } from '../../context/AnimationStateContext'
import { easings, useSpring, animated } from 'react-spring'

export default function ToggleSideBarButton () {
  // Ref
  const buttonRef = useRef(null)

  // Context
  const { handleCollapse, handleMargin } = useSidebarContextUpdate()
  const animations = useAnimationStateContext()

  // Animations
  const showButton = useSpring({
    from: { opacity: 0, userSelect: 'none', pointerEvents: 'none' },
    to: { opacity: 1, userSelect: 'auto', pointerEvents: 'auto' },
    cancel: animations.sidebar,
    config: {
      duration: 400
    }
  })

  // Toggle the margin and the Sidebar.
  const handleSidebar = () => {
    handleCollapse()
    handleMargin()
  }

  return (
    <animated.button
      style={showButton}
      onClick={handleSidebar}
      onPointerDown={event => {
        // Prevent the focus outline from appearing on click.
        event.preventDefault()
      }}
      onKeyDown={(event) => {
        // If the key is Space, then click the button.
        if (event.key === ' ') {
          const button = buttonRef.current
          button.click()
        }
      }}
      ref={buttonRef}
      tabIndex='6'
      className='focus:outline-none focus:ring focus:ring-[#003D5C] h-[20px] rounded-sm
            focus:ring-offset-[#000e14] focus:ring-offset-2 transition'
    >
      <img
        src={IMAGES.SIDEBAR_ICON}
        alt='Sidebar icon'
        className='w-[20px] h-[20px]'
      />
    </animated.button>
  )
}
