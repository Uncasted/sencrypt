import { AddAccountButton } from '../pages/accounts/buttons/AddAccountButton'
import { useTransition, animated, easings } from 'react-spring'
import PropTypes from 'prop-types'

// This gets rendered when there aren't any buttons in the app.
export default function EmptyPlaceholder (props) {
  // Animations.
  const placeholderAnim = useTransition(props.accsLength, {
    from: { opacity: 0, top: '25vh', pointerEvents: 'none', userSelect: 'none' },
    enter: { opacity: 1, top: '20vh', pointerEvents: 'auto', userSelect: 'auto' },
    leave: { opacity: 0, top: '25vh', pointerEvents: 'none', userSelect: 'none' },
    immediate: !props.isMounted,
    config: {
      duration: 250,
      easing: easings.easeInOutQuad
    }
  })

  return (
    <>
      {placeholderAnim((style, accounts) => !accounts &&
        <animated.div
          style={style}
          className='w-full h-[50vh] flex flex-col items-center justify-center absolute inset-0'
        >
          <h1 className='text-lg lg:text-2xl text-gray-300'>
            There isn't any accounts to show.
          </h1>
          <h1 className='text-md lg:text-lg text-gray-300 pb-6'>
            Add a new account by clicking on the "Add new account" button.
          </h1>
          <AddAccountButton />
        </animated.div>
      )}
    </>
  )
}

EmptyPlaceholder.propTypes = {
  accsLength: PropTypes.number,
  isMounted: PropTypes.bool
}
