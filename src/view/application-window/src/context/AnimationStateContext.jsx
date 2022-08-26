import { createContext, useState, useContext } from 'react'
import PropTypes from 'prop-types'

const AnimationStateContext = createContext()
const AnimationStateContextUpdate = createContext()

export function useAnimationStateContext () {
  return useContext(AnimationStateContext)
}

export function useAnimationStateContextUpdate () {
  return useContext(AnimationStateContextUpdate)
}

export default function AnimationStateProvider (props) {
  // State of the animations.
  const [animations, setAnimations] = useState({ ...props.animations })

  // Add animation state.
  const addAnimState = (name, state) => {
    setAnimations(animations => {
      const newAnimations = { ...animations }
      newAnimations[name] = state
      return newAnimations
    })
  }

  // Toggle animation state.
  const toggleAnimState = name => {
    setAnimations(animations => {
      const newAnimations = { ...animations }
      newAnimations[name] = !newAnimations[name]
      return newAnimations
    })
  }

  return (
    <AnimationStateContext.Provider value={animations}>
      <AnimationStateContextUpdate.Provider value={{ addAnimState, toggleAnimState }}>
        {props.children}
      </AnimationStateContextUpdate.Provider>
    </AnimationStateContext.Provider>
  )
}

AnimationStateProvider.propTypes = {
  children: PropTypes.node,
  animations: PropTypes.object
}
