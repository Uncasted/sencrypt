import PrimaryButton from '../../../components/buttons/PrimaryButton'
import Option from '../../../components/Option'

export default function CreateBackup () {
  const createBackup = async () => {
    // Create a backup of the database.
    await window.database.createBackup()
  }

  return (
    <Option label='Create Database Backup:'>
      <PrimaryButton
        hoverColor='blue-1'
        activeColor='blue-2'
        width={40}
        onClick={createBackup}
      >
        Create Backup
      </PrimaryButton>
    </Option>
  )
}
