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
    altIcon: 'Accounts'
  },
  {
    title: 'Generator',
    icon: IMAGES.GENERATOR,
    altIcon: 'Generator'
  },
  {
    title: 'Settings',
    icon: IMAGES.SETTINGS,
    altIcon: 'Settings'
  },
  {
    title: 'Exit',
    icon: IMAGES.CLOSE,
    altIcon: 'Exit'
  }
]
