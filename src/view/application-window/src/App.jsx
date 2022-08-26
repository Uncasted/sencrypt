import { Sidebar } from './pages/sidebar/Sidebar'
import LoginScreen from './pages/login/LoginScreen'
import { useEffect, useState } from 'react'
import AccountSection from './pages/accounts/AccountSection'
import GeneratorSection from './pages/generator/GeneratorSection'
import SettingsSection from './pages/settings/SettingsSection'
import SettingsProvider from './context/settings/SettingsContext'
import TitleBar from './pages/titlebar/TitleBar'
import SidebarProvider from './context/SidebarContext'
import WeakPassProvider from './context/WeakPassContext'
import Notification from './components/Notification'
import { useNotificationContext } from './context/NotificationContext'
import AnimationStateProvider from './context/AnimationStateContext'
import { Globals } from 'react-spring'

export default function App () {
  // We need to run this here, and not on useEffect
  // Otherwise the login form will still animate.
  Globals.assign({
    skipAnimation: JSON.parse(localStorage.getItem('enableAnimations')) ?? false
  })

  useEffect(() => {
    // Settings the initial value for enableAnimations.
    localStorage.setItem('enableAnimations', JSON.stringify(false))
  }, [])

  // State
  const [selected, setSelected] = useState(<AccountSection />)

  // Context
  const [title, icon] = useNotificationContext()

  const changeSelected = menu => {
    switch (menu) {
      case 'Accounts':
        setSelected(() => <AccountSection />)
        break
      case 'Generator':
        setSelected(() => <GeneratorSection />)
        break
      case 'Settings':
        setSelected(() => <SettingsSection />)
    }
  }

  return (
    <div className='app-container'>
      <SettingsProvider>
        <AnimationStateProvider animations={{ loginForm: true, appSection: true, sidebar: true }}>
          <WeakPassProvider>
            <SidebarProvider>
              <TitleBar />
              <LoginScreen>
                <div className='app-content'>
                  <Sidebar changeSelected={changeSelected} />
                  {selected}
                  <Notification
                    title={title}
                    icon={icon}
                  />
                </div>
              </LoginScreen>
            </SidebarProvider>
          </WeakPassProvider>
        </AnimationStateProvider>
      </SettingsProvider>
    </div>
  )
}
