// Constants
import logo from '/assets/images/logo.png'
import managerIcon from '/assets/images/manager-icon.png'
import generatorIcon from '/assets/images/generator-icon.png'
import settingsIcon from '/assets/images/settings-icon.png'
import clipboardIcon from '/assets/images/clipboard-icon.png'
import showPasswordIcon from '/assets/images/show-password-icon.png'
import hidePasswordIcon from '/assets/images/hide-password-icon.png'

// Misc.
export const HOSTNAME_REGEX = /^(?:https?:\/\/)?(?:[^@\/\n]+@)?(?:www\.)?([^:\/?\n]+)/
export const IMAGES = {
    LOGO: logo,
    MANAGER_ICON: managerIcon,
    GENERATOR_ICON: generatorIcon,
    SETTINGS_ICON: settingsIcon,
    CLIPBOARD_ICON: clipboardIcon,
    SHOW_PASSWORD: showPasswordIcon,
    HIDE_PASSWORD: hidePasswordIcon
}

// Clipboard Context
export const COPY_CLIPBOARD = "Copy to clipboard."
export const COPY_PASSWORD = "Copy Password."
export const COPIED = "Copied!"
export const TITLE = "title"
export const USERNAME = "username"
export const PASSWORD = "password"

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

// Collapsible menu.
export const EDIT_LABEL = "Edit Account"
export const CANCEL_LABEL = "Cancel Changes"