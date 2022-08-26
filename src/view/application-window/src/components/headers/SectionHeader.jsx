import PropTypes from 'prop-types'
import { animated, useSpring, easings } from 'react-spring'
import { useAnimationStateContext, useAnimationStateContextUpdate } from '../../context/AnimationStateContext'

export default function SectionHeader (props) {
  // Context
  const animations = useAnimationStateContext()
  const { toggleAnimState } = useAnimationStateContextUpdate()

  // Animations.
  const styles = useSpring({
    from: { opacity: 0, left: '25px' },
    to: { opacity: 1, left: '0' },
    cancel: animations.appSection,
    onRest: () => {
      // Toggle the animation for the sidebar. (Only once).
      if (animations.sidebar) {
        toggleAnimState('sidebar')
      }
    },
    config: {
      duration: 400,
      easing: easings.easeInOutQuad
    }
  })

  return (
    <>
      <div className='bg-[#00141f] text-white fixed w-full py-8 pl-4 shadow-md z-10'>
        <animated.div style={styles} className='no-select flex items-center relative'>
          <h1
            tabIndex='-1'
            className='text-3xl font-semibold pb-2 flex items-center'
          >
            <img src={props.icon} alt='icon' className='mr-4' />
            {props.children}
          </h1>
        </animated.div>
      </div>
    </>
  )
}

SectionHeader.propTypes = {
  icon: PropTypes.string,
  children: PropTypes.node
}
