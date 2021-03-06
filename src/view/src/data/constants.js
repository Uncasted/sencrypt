// Constants
import logo from "/assets/images/logo.png"
import managerIcon from "/assets/images/manager-icon.png"
import generatorIcon from "/assets/images/generator-icon.png"
import settingsIcon from "/assets/images/settings-icon.png"
import clipboardIcon from "/assets/images/clipboard-icon.png"
import showPasswordIcon from "/assets/images/show-password-icon.png"
import hidePasswordIcon from "/assets/images/hide-password-icon.png"

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
  SHOW_PASSWORD: showPasswordIcon,
  HIDE_PASSWORD: hidePasswordIcon,
}

// Clipboard text.
export const COPY_CLIPBOARD = "Copy to clipboard."
export const COPY_PASSWORD = "Copy Password."
export const COPIED = "Copied!"

// Parameter Context
export const LOWERCASE = "LOWERCASE"
export const UPPERCASE = "UPPERCASE"
export const NUMBERS = "NUMBERS"
export const SYMBOLS = "SYMBOLS"
export const GENERATOR_KEY = "generator"
export const DEFAULT_PARAMETERS = [LOWERCASE, UPPERCASE, NUMBERS]
export const DEFAULT_LENGTH = "16"

// Password Context
export const LAST_GEN_PASS_KEY = "lastGenPass"

// collapsible menu.
export const EDIT_LABEL = "Edit Account"
export const CANCEL_LABEL = "Cancel Changes"

// Outline.
export const RED_OUTLINE = [
  "outline",
  "focus:outline",
  "focus:outline-2",
  "focus:outline-red-500",
]
export const BLUE_OUTLINE = ["focus:ring", "focus:ring-blue-1"]

// Password generator
export const SHOW_TOOLTIP = ["tooltip", "tooltip-open"]

export const GENERATOR_INPUTS = [
  {
    id: 0,
    label: "Lowercase",
    type: "useLower",
    value: LOWERCASE,
  },
  {
    id: 1,
    label: "Uppercase",
    type: "useUpper",
    value: UPPERCASE,
  },
  {
    id: 2,
    label: "Numbers",
    type: "useNumbers",
    value: NUMBERS,
  },
  {
    id: 3,
    label: "Symbols",
    type: "useSymbols",
    value: SYMBOLS,
  },
]

// Add Account Modal.
export const ADD_MODAL_FIELDS = [
  {
    type: "text",
    name: "new-website",
    id: "new-website",
    title: "Website/Service:",
    tabIndex: 10,
    value: "website",
  },
  {
    type: "text",
    name: "new-username",
    id: "new-username",
    title: "Username:",
    tabIndex: 11,
    value: "username",
  },
  {
    type: "password",
    name: "new-password",
    id: "new-password",
    title: "Password:",
    tabIndex: 12,
    value: "password",
  },
]

// Account info
export const ACCOUNT_FIELDS = [
  {
    type: "text",
    name: "website",
    id: "websiteId",
    title: "Website/Service:",
    tabIndex: 23,
    value: "website",
    hasToggleVisibility: false,
    hasClipboard: false,
    clipboardTooltip: "",
    tooltipDirection: "",
  },
  {
    type: "text",
    name: "username",
    id: "usernameId",
    title: "Username:",
    tabIndex: 24,
    secondaryTabIndex: 26,
    value: "username",
    hasToggleVisibility: false,
    hasClipboard: true,
    clipboardTooltip: COPY_CLIPBOARD,
    tooltipDirection: "right",
  },
  {
    type: "password",
    name: "password",
    id: "passwordId",
    title: "Password:",
    tabIndex: 25,
    secondaryTabIndex: 27,
    value: "password",
    hasToggleVisibility: true,
    hasClipboard: true,
    clipboardTooltip: COPY_CLIPBOARD,
    tooltipDirection: "right",
  },
]

// New user form.
export const LOGIN_FIELDS = [
  {
    autofocus: true,
    title: "Create your Master Password:",
    type: "password",
    fieldId: "masterPassword",
    name: "masterPassword",
    dataOutline: "new-user",
    minLength: 1,
    maxLength: 32,
    value: "pass",
  },
  {
    autofocus: false,
    title: "Confirm your Master Password:",
    type: "password",
    fieldId: "confirmPassword",
    name: "confirmPassword",
    dataOutline: "new-user",
    minLength: 1,
    maxLength: 32,
    value: "confirmPass",
  },
]

// Navbar buttons
export const NAVBAR_BUTTONS = [
  {
    title: "Accounts",
    section: "Accounts",
    icon: IMAGES.MANAGER_ICON,
    defaultSelected: true,
  },
  {
    title: "Generator",
    section: "Generator",
    icon: IMAGES.GENERATOR_ICON,
    defaultSelected: false,
  },
  {
    title: "Settings",
    section: "Settings",
    icon: IMAGES.SETTINGS_ICON,
    defaultSelected: false,
  },
]

// Reset master password fields.
export const RESET_PASS_FIELDS = [
  {
    autofocus: true,
    type: "password",
    name: "newMasterPass",
    id: "newMasterPass",
    title: "New Master Password:",
    tabIndex: 10,
    value: "newMasterPass",
  },
  {
    autofocus: true,
    type: "password",
    name: "confirmNewMasterPass",
    id: "confirmNewMasterPass",
    title: "Confirm New Password:",
    tabIndex: 11,
    value: "confirmNewMasterPass",
  },
]
