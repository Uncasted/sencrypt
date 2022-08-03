import { createContext, useState, useContext } from 'react'
import PropTypes from 'prop-types'

const SidebarContext = createContext()
const SidebarContextUpdate = createContext()

export function useSidebarContext () {
  return useContext(SidebarContext)
}

export function useSidebarContextUpdate () {
  return useContext(SidebarContextUpdate)
}

export default function SidebarProvider (props) {
  const [isCollapsed, setIsCollapsed] = useState('show-sidebar')
  const [margin, setMargin] = useState('ml-[200px]')

  const handleCollapse = () => {
    setIsCollapsed(prevCollapsed => {
      return prevCollapsed === 'collapse-sidebar' ? 'show-sidebar' : 'collapse-sidebar'
    })
  }

  const handleMargin = () => {
    setMargin(prevMargin => {
      return prevMargin === 'ml-[200px]' ? 'ml-[50px]' : 'ml-[200px]'
    })
  }

  return (
    <SidebarContext.Provider value={{ isCollapsed, margin }}>
      <SidebarContextUpdate.Provider value={{ handleCollapse, handleMargin }}>
        {props.children}
      </SidebarContextUpdate.Provider>
    </SidebarContext.Provider>
  )
}

SidebarProvider.propTypes = {
  children: PropTypes.node
}
