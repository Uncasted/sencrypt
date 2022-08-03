import { createContext, useState, useContext } from 'react'
import PropTypes from 'prop-types'

const WeakPassContext = createContext()
const WeakPassContextUpdate = createContext()

export function useWeakPassContext () {
  return useContext(WeakPassContext)
}

export function useWeakPassContextUpdate () {
  return useContext(WeakPassContextUpdate)
}

export default function WeakPassProvider ({ children }) {
  const [isWeak, setIsWeak] = useState(true)

  const handleWeakUpdate = (score) => {
    // If the password score is less than 2, then it's weak.
    setIsWeak(score < 2)
  }

  return (
    <WeakPassContext.Provider value={isWeak}>
      <WeakPassContextUpdate.Provider value={handleWeakUpdate}>
        {children}
      </WeakPassContextUpdate.Provider>
    </WeakPassContext.Provider>
  )
}

WeakPassProvider.propTypes = {
  children: PropTypes.node
}
