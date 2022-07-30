// Constants
import accountsIcon from '/assets/images/accounts-icon.png'
import generatorIcon from '/assets/images/generator-icon.png'
import settingsIcon from '/assets/images/settings-icon.png'
import closeIcon from '/assets/images/close-icon.png'

export const IMAGES = {
  ACCOUNTS: accountsIcon,
  GENERATOR: generatorIcon,
  SETTINGS: settingsIcon,
  CLOSE: closeIcon
}

export const TRAY_BUTTONS = [
  {
    title: 'Accounts',
    icon: IMAGES.ACCOUNTS,
    altIcon: 'Accounts',
    handleClick: () => {
      window.controller.openSection('Accounts')
    }
  },
  {
    title: 'Generator',
    icon: IMAGES.GENERATOR,
    altIcon: 'Generator',
    handleClick: () => {
      window.controller.openSection('Generator')
    }
  },
  {
    title: 'Settings',
    icon: IMAGES.SETTINGS,
    altIcon: 'Settings',
    handleClick: () => {
      window.controller.openSection('Settings')
    }
  },
  {
    title: 'Exit',
    icon: IMAGES.CLOSE,
    altIcon: 'Exit',
    handleClick: () => {
      window.controller.quitApplication()
    }
  }
]
