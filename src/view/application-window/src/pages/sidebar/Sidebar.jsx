import { useEffect } from 'react'
import { IMAGES, SIDEBAR_BUTTONS } from '../../data/constants'
import SidebarButton from '../../components/buttons/SidebarButton'
import PropTypes from 'prop-types'
import { useSidebarContext } from '../../context/SidebarContext'
import { useAnimationStateContext } from '../../context/AnimationStateContext'
import { useSpring, animated, easings } from 'react-spring'

export function Sidebar (props) {
  // Context
  const { isCollapsed } = useSidebarContext()
  const animations = useAnimationStateContext()

  // Animations.
  const sidebarAnimation = useSpring({
    from: { opacity: 0, left: '25px', pointerEvents: 'none', userSelect: 'none' },
    to: { opacity: 1, left: '0', pointerEvents: 'auto', userSelect: 'auto' },
    cancel: animations.sidebar,
    config: {
      duration: 400,
      easing: easings.easeInOutQuad
    }
  })

  const logoutBtnAnimation = useSpring({
    from: { opacity: 0, left: '25px', pointerEvents: 'none', userSelect: 'none' },
    to: { opacity: 1, left: '10px', pointerEvents: 'auto', userSelect: 'auto' },
    cancel: animations.sidebar,
    config: {
      duration: 400,
      easing: easings.easeInOutQuad
    }
  })

  useEffect(() => {
    const sectionList = document.getElementById('section-list')
    sectionList.addEventListener('focusout', event => {
      event.stopPropagation()

      if (sectionList.contains(event.relatedTarget)) {
        return
      }

      sectionList.focus()
    })
  }, [])

  const handleLogout = () => {
    // Reload the window, effectively logging out the user.
    location.reload()
  }

  return (
    <nav className={` ${isCollapsed} bg-[#000E14] text-white inset-0 h-[100vh] pt-2 fixed z-10`}>
      <animated.ul style={sidebarAnimation} id='section-list' className='flex flex-col text-lg mt-8 relative'>
        {SIDEBAR_BUTTONS.map(button => {
          return (
            <li key={button.title}>
              <SidebarButton
                tabIndex={button.tabIndex}
                title={button.title}
                section={button.section}
                icon={button.icon}
                changeSelected={props.changeSelected}
                defaultSelected={button.defaultSelected}
              />
            </li>
          )
        })}
      </animated.ul>
      <animated.button
        style={logoutBtnAnimation}
        onClick={handleLogout}
        onPointerDown={(event) => {
          // Prevent the focus ring from appearing.
          event.preventDefault()
        }}
        className='absolute left-3 bottom-4 focus:outline-none focus:ring focus:ring-[#003D5C]
        transition rounded-sm'
      >
        <img
          src={IMAGES.LOGOUT_ICON}
          alt='log out'
          className='w-7 h-7'
        />
      </animated.button>
    </nav>
  )
}

Sidebar.propTypes = {
  changeSelected: PropTypes.func
}
