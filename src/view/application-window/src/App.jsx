import { Navbar } from './pages/navbar/Navbar'
import LoginScreen from './pages/login/LoginScreen'
import { useState } from 'react'
import AccountSection from './pages/accounts/AccountSection'
import GeneratorSection from './pages/generator/GeneratorSection'
import SettingsSection from './pages/settings/SettingsSection'
import SettingsProvider from './context/settings/SettingsContext'

export default function App () {
  const [selected, setSelected] = useState(<AccountSection />)

  const changeSelected = menu => {
    switch (menu) {
      case 'Accounts':
        setSelected(<AccountSection />)
        break
      case 'Generator':
        setSelected(<GeneratorSection />)
        break
      case 'Settings':
        setSelected(<SettingsSection />)
    }
  }

  return (
    <>
      <SettingsProvider>
        <LoginScreen>
          <Navbar changeSelected={changeSelected} />
          {selected}
        </LoginScreen>
      </SettingsProvider>
    </>
  )
}
