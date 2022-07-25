import PrimaryButton from "../../../components/buttons/PrimaryButton"
import Option from "../../../components/Option"

export default function ResetMasterPassword() {
  const openResetModal = () => {
    // Open the modal to reset the master password.
    const resetModal = document.getElementById("reset-modal")
    resetModal.click()
    // Focus on the first field.
    const newMasterPass = document.getElementById("newMasterPass")
    newMasterPass.focus()
  }

  return (
    <Option label="Reset Master Password:">
      <PrimaryButton
        hoverColor="red-500"
        activeColor="red-600"
        width={40}
        onClick={openResetModal}
      >
        Reset Password
      </PrimaryButton>
    </Option>
  )
}
