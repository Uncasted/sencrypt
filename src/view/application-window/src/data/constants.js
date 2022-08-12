// Constants
import logo from '/assets/images/logo.png'
import managerIcon from '/assets/images/manager-icon.png'
import generatorIcon from '/assets/images/generator-icon.png'
import settingsIcon from '/assets/images/settings-icon.png'
import clipboardIcon from '/assets/images/clipboard-icon.png'
import showPasswordDark from '/assets/images/show-password-dark.png'
import hidePasswordDark from '/assets/images/hide-password-dark.png'
import showPasswordLight from '/assets/images/show-password-light.png'
import hidePasswordLight from '/assets/images/hide-password-light.png'
import closeIcon from '/assets/images/close-icon.png'
import maximizeIcon from '/assets/images/maximize-icon.png'
import minimizeIcon from '/assets/images/minimize-icon.png'
import sideBarIcon from '/assets/images/sidebar-icon.png'
import unmaximizeIcon from '/assets/images/unmaximize-icon.png'
import logoutIcon from '/assets/images/logout-icon.png'
import successIcon from '/assets/images/success-icon.png'
import clearIcon from '/assets/images/clear-icon.png'
import openDropdown from '/assets/images/open-dropdown.png'

// Regex to get the hostname from the URL.
export const HOSTNAME_REGEX =
  /^(?:https?:\/\/)?(?:[^@\n]+@)?(?:www\.)?([^:?\n]+)/

// Path for the icons.
export const IMAGES = {
  LOGO: logo,
  MANAGER_ICON: managerIcon,
  GENERATOR_ICON: generatorIcon,
  SETTINGS_ICON: settingsIcon,
  CLIPBOARD_ICON: clipboardIcon,
  SHOW_PASSWORD_DARK: showPasswordDark,
  HIDE_PASSWORD_DARK: hidePasswordDark,
  SHOW_PASSWORD_LIGHT: showPasswordLight,
  HIDE_PASSWORD_LIGHT: hidePasswordLight,
  CLOSE_ICON: closeIcon,
  MAXIMIZE_ICON: maximizeIcon,
  UNMAXIMIZE_ICON: unmaximizeIcon,
  MINIMIZE_ICON: minimizeIcon,
  SIDEBAR_ICON: sideBarIcon,
  LOGOUT_ICON: logoutIcon,
  SUCCESS_ICON: successIcon,
  CLEAR_ICON: clearIcon,
  OPEN_DROPDOWN: openDropdown
}

// Clipboard text.
export const COPY_CLIPBOARD = 'Copy to clipboard.'
export const COPY_PASSWORD = 'Copy Password.'
export const COPIED = 'Copied!'

// Parameter Context
export const LOWERCASE = 'LOWERCASE'
export const UPPERCASE = 'UPPERCASE'
export const NUMBERS = 'NUMBERS'
export const SYMBOLS = 'SYMBOLS'
export const GENERATOR_KEY = 'generator'
export const DEFAULT_PARAMETERS = [LOWERCASE, UPPERCASE, NUMBERS]
export const DEFAULT_LENGTH = '16'

// Password Context
export const LAST_GEN_PASS_KEY = 'lastGenPass'

// collapsible menu.
export const EDIT_LABEL = 'Edit Account'
export const CANCEL_LABEL = 'Cancel Changes'

// Outline.
export const RED_OUTLINE = [
  'outline',
  'focus:outline',
  'focus:outline-2',
  'focus:outline-red-500'
]
export const BLUE_OUTLINE = ['focus:ring', 'focus:ring-[#003D5C]']

// Password generator
export const SHOW_TOOLTIP = ['tooltip', 'tooltip-open']

export const GENERATOR_INPUTS = [
  {
    key: 0,
    id: 'checkbox-0',
    label: 'Lowercase',
    type: 'useLower',
    value: LOWERCASE
  },
  {
    key: 1,
    id: 'checkbox-1',
    label: 'Uppercase',
    type: 'useUpper',
    value: UPPERCASE
  },
  {
    key: 2,
    id: 'checkbox-2',
    label: 'Numbers',
    type: 'useNumbers',
    value: NUMBERS
  },
  {
    key: 3,
    id: 'checkbox-3',
    label: 'Symbols',
    type: 'useSymbols',
    value: SYMBOLS
  }
]

// Add Account Modal.
export const ADD_MODAL_FIELDS = [
  {
    type: 'text',
    name: 'new-website',
    id: 'new-website',
    title: 'Website/Service',
    placeholder: 'Website...',
    tabIndex: 10,
    value: 'website'
  },
  {
    type: 'text',
    name: 'new-username',
    id: 'new-username',
    title: 'Username',
    placeholder: 'Username...',
    tabIndex: 11,
    value: 'username'
  },
  {
    type: 'password',
    name: 'new-password',
    id: 'new-password',
    title: 'Password:',
    placeholder: 'Password...',
    tabIndex: 12,
    value: 'password'
  }
]

// Account info
export const ACCOUNT_FIELDS = [
  {
    type: 'text',
    name: 'website',
    id: 'websiteId',
    title: 'Website/Service',
    placeholder: 'Website/Service...',
    tabIndex: 23,
    value: 'website',
    hasToggleVisibility: false,
    hasClipboard: false,
    clipboardTooltip: '',
    tooltipDirection: ''
  },
  {
    type: 'text',
    name: 'username',
    id: 'usernameId',
    title: 'Username',
    placeholder: 'Username...',
    tabIndex: 24,
    secondaryTabIndex: 27,
    value: 'username',
    hasToggleVisibility: false,
    hasClipboard: true,
    clipboardTooltip: COPY_CLIPBOARD,
    tooltipDirection: 'right'
  },
  {
    type: 'password',
    name: 'password',
    id: 'passwordId',
    title: 'Password',
    placeholder: 'Password...',
    tabIndex: 25,
    secondaryTabIndex: 28,
    value: 'password',
    hasToggleVisibility: true,
    hasClipboard: true,
    clipboardTooltip: COPY_CLIPBOARD,
    tooltipDirection: 'right'
  }
]

// New user form.
export const LOGIN_FIELDS = [
  {
    autofocus: true,
    title: 'Create your Master Password',
    type: 'password',
    fieldId: 'masterPassword',
    name: 'masterPassword',
    dataOutline: 'new-user',
    minLength: 1,
    maxLength: 32,
    value: 'pass',
    tabIndex: 1,
    secondaryTabIndex: 4
  },
  {
    autofocus: false,
    title: 'Confirm your Master Password',
    type: 'password',
    fieldId: 'confirmPassword',
    name: 'confirmPassword',
    dataOutline: 'new-user',
    minLength: 1,
    maxLength: 32,
    value: 'confirmPass',
    tabIndex: 2,
    secondaryTabIndex: 5
  }
]

// Sidebar buttons
export const SIDEBAR_BUTTONS = [
  {
    tabIndex: 1,
    title: 'Accounts',
    section: 'Accounts',
    icon: IMAGES.MANAGER_ICON,
    defaultSelected: true
  },
  {
    tabIndex: 2,
    title: 'Generator',
    section: 'Generator',
    icon: IMAGES.GENERATOR_ICON,
    defaultSelected: false
  },
  {
    tabIndex: 3,
    title: 'Settings',
    section: 'Settings',
    icon: IMAGES.SETTINGS_ICON,
    defaultSelected: false
  }
]

// Reset master password fields.
export const RESET_PASS_FIELDS = [
  {
    autofocus: true,
    type: 'password',
    name: 'oldMasterPass',
    id: 'oldMasterPass',
    title: 'Old Master Password',
    tabIndex: 10,
    value: 'oldMasterPass'
  },
  {
    autofocus: false,
    type: 'password',
    name: 'newMasterPass',
    id: 'newMasterPass',
    title: 'New Master Password:',
    tabIndex: 11,
    value: 'newMasterPass'
  },
  {
    autofocus: false,
    type: 'password',
    name: 'confirmNewMasterPass',
    id: 'confirmNewMasterPass',
    title: 'Confirm New Password:',
    tabIndex: 12,
    value: 'confirmNewMasterPass'
  }
]

// Colors for the password strength bar.
export const BAR_COLORS = ['#00293d', '#fff', '#fff', '#fff', '#fff', '#fff']

// Options for the dropdown menu.
export const OPTIONS_LIST = [
  {
    key: 0,
    id: 'option-0',
    title: 'Minimized',
    bgColor: '[#003d5c]',
    hoverColor: '[#003d5c]'
  },
  {
    key: 1,
    id: 'option-1',
    title: 'Full',
    bgColor: '[#00293d]',
    hoverColor: '[#003d5c]'
  }
]
