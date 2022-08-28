import SectionHeader from '../../components/headers/SectionHeader'
import { IMAGES } from '../../data/constants'
import AskForReLogin from './options/AskForReLogin'
import DeleteAfterAttempts from './options/DeleteAfterAttempts'
import CreateBackup from './options/CreateBackup'
import LoadBackup from './options/LoadBackup'
import ResetMasterPassword from './options/ResetMasterPassword'
import { ResetPasswordModal } from './modal/ResetPasswordModal'
import MinimizeToTray from './options/MinimizeToTray'
import OpenAtStartup from './options/OpenAtStartup'
import ToggleTrayProvider from '../../context/settings/ToggleTrayContext'
import { easings, useSpring, animated } from 'react-spring'
import EnableAnimations from './options/EnableAnimations'

export default function Settings () {
  // Only show the "open at start up" option in windows.
  const platform = window.utility.getPlatform()
  const isWindows = platform === 'win32'

  // Animations
  const sectionAnimation = useSpring({
    from: { opacity: 0, left: '50px' },
    to: { opacity: 1, left: '0' },
    config: {
      duration: 400,
      easing: easings.easeInOutQuad
    }
  })
  return (
    <>
      <ResetPasswordModal />
      <div>
        <SectionHeader icon={IMAGES.SETTINGS_ICON}>
          Settings
        </SectionHeader>
      </div>
      <animated.div style={sectionAnimation} className='pt-36 text-white mx-20 text-white space-y-12 pb-8 relative'>
        <div>
          <h1 className='text-lg mb-2'>General</h1>
          <div className='border-t-2 border-b-2 border-[#002133]'>
            <EnableAnimations />
            <ToggleTrayProvider>
              <MinimizeToTray />
              {isWindows && <OpenAtStartup />}
            </ToggleTrayProvider>
          </div>
        </div>
        <div>
          <h1 className='text-lg mb-2'>Login</h1>
          <div className='border-t-2 border-b-2 border-[#002133]'>
            <AskForReLogin />
            <DeleteAfterAttempts />
          </div>
        </div>
        <div>
          <h1 className='text-lg mb-2'>Accounts</h1>
          <div className='border-t-2 border-b-2 border-[#002133]'>
            <CreateBackup />
            <LoadBackup />
            <ResetMasterPassword />
          </div>
        </div>
        <div className='flex items-center text-gray-200 text-sm space-x-1'>
          <span>
            Icons provided by:
          </span>
          <span>
            <a
              href='#'
              onClick={() => {
                // Open the anchor link in an external browser.
                window.utility.openURL('https://icons8.com')
              }}
              className='hover:underline hover:underline-offset-1 text-[#006599] active:text-[#003d5c] transition'
            >
              Icons8
            </a>
          </span>
        </div>
      </animated.div>
    </>
  )
}
