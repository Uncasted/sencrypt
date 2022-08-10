import { Sidebar } from './pages/sidebar/Sidebar'
import LoginScreen from './pages/login/LoginScreen'
import { useState } from 'react'
import AccountSection from './pages/accounts/AccountSection'
import GeneratorSection from './pages/generator/GeneratorSection'
import SettingsSection from './pages/settings/SettingsSection'
import SettingsProvider from './context/settings/SettingsContext'
import TitleBar from './pages/titlebar/TitleBar'
import SidebarProvider from './context/SidebarContext'
import WeakPassProvider from './context/WeakPassContext'
import Notification from './components/Notification'
import { useNotificationContext } from './context/NotificationContext'

export default function App () {
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
    <>
      <SettingsProvider>
        <WeakPassProvider>
          <SidebarProvider>
            <TitleBar />
            <LoginScreen>
              <Sidebar changeSelected={changeSelected} />
              {selected}
              <Notification
                title={title}
                icon={icon}
              />
            </LoginScreen>
          </SidebarProvider>
        </WeakPassProvider>
      </SettingsProvider>
    </>
  )
}
