import SectionHeader from "../../components/headers/SectionHeader"
import { IMAGES } from "../../data/constants"
import AskForReLogin from "./options/AskForReLogin"
import DeleteAfterAttempts from "./options/DeleteAfterAttempts"
import CreateBackup from "./options/CreateBackup"
import LoadBackup from "./options/LoadBackup"
import ResetMasterPassword from "./options/ResetMasterPassword"
import { ResetPasswordModal } from "./modal/ResetPasswordModal"

export default function Settings() {
  return (
    <>
      <ResetPasswordModal />
      <div>
        <SectionHeader icon={IMAGES.SETTINGS_ICON}>Settings</SectionHeader>
      </div>
      <div className="mt-12">
        <AskForReLogin />
        <DeleteAfterAttempts />
        <CreateBackup />
        <LoadBackup />
        <ResetMasterPassword />
        <div className="mx-20 border-b-2 border-blue-3" />
      </div>
    </>
  )
}
