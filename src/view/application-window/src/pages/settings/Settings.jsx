import SectionHeader from '../../components/headers/SectionHeader'
import { IMAGES } from '../../data/constants'
import AskForReLogin from './options/AskForReLogin'
import DeleteAfterAttempts from './options/DeleteAfterAttempts'
import CreateBackup from './options/CreateBackup'
import LoadBackup from './options/LoadBackup'
import ResetMasterPassword from './options/ResetMasterPassword'
import { ResetPasswordModal } from './modal/ResetPasswordModal'
import MinimizeToTray from './options/MinimizeToTray'

export default function Settings () {
  return (
    <>
      <ResetPasswordModal />
      <div>
        <SectionHeader icon={IMAGES.SETTINGS_ICON}>
          Settings
        </SectionHeader>
      </div>
      <div className='pt-36 text-white mx-20 text-white space-y-12'>
        <div>
          <h1 className='text-lg mb-1'>General</h1>
          <div className='border-t-2 border-b-2 border-[#002133]'>
            <MinimizeToTray />
          </div>
        </div>
        <div>
          <h1 className='text-lg mb-1'>Login</h1>
          <div className='border-t-2 border-b-2 border-[#002133]'>
            <AskForReLogin />
            <DeleteAfterAttempts />
          </div>
        </div>
        <div>
          <h1 className='text-lg mb-1'>Accounts</h1>
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
