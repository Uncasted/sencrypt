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

export default function Settings () {
  // Only show the "open at start up" option in windows.
  const platform = window.utility.getPlatform()
  const isWindows = platform === 'win32'

  return (
    <>
      <ResetPasswordModal />
      <div>
        <SectionHeader icon={IMAGES.SETTINGS_ICON}>
          Settings
        </SectionHeader>
      </div>
      <div className='pt-36 text-white mx-20 text-white space-y-12 pb-8'>
        <div>
          <h1 className='text-lg mb-2'>General</h1>
          <div className='border-t-2 border-b-2 border-[#002133]'>
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
      </div>
    </>
  )
}
