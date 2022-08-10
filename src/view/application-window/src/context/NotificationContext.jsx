import { createContext, useState, useContext } from 'react'
import PropTypes from 'prop-types'

const NotificationContext = createContext()
const NotificationContextUpdate = createContext()

export function useNotificationContext () {
  return useContext(NotificationContext)
}

export function useNotificationContextUpdate () {
  return useContext(NotificationContextUpdate)
}

export default function NotificationProvider (props) {
  const [title, setTitle] = useState('This is a test')
  const [icon, setIcon] = useState('')

  const handleTitle = (title) => {
    setTitle(() => title)
  }

  const handleIcon = (icon) => {
    setIcon(() => icon)
  }

  const handleShow = () => {
    const notification = document.getElementById('app-notification')
    // Show the element.
    notification.animate(
      [{
        bottom: '3rem',
        maxHeight: '40px',
        overflow: 'clip'
      }],
      {
        duration: 500,
        easing: 'ease-in-out',
        fill: 'forwards'
      })
    // Hide back the element.
    notification.animate(
      [{
        bottom: '-20rem',
        maxHeight: '0px',
        overflow: 'hidden'
      }], {
        duration: 500,
        delay: 2500,
        easing: 'ease-in-out',
        fill: 'forwards'
      }
    )
  }

  return (
    <NotificationContext.Provider value={[title, icon]}>
      <NotificationContextUpdate.Provider value={{ handleTitle, handleIcon, handleShow }}>
        {props.children}
      </NotificationContextUpdate.Provider>
    </NotificationContext.Provider>
  )
}

NotificationContext.propTypes = {
  children: PropTypes.node
}
