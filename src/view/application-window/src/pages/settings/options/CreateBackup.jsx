import PrimaryButton from '../../../components/buttons/PrimaryButton'
import Option from '../../../components/Option'

export default function CreateBackup () {
  const createBackup = async () => {
    // Create a backup of the database.
    await window.database.createBackup()
  }

  return (
    <Option label='Create Database Backup'>
      <PrimaryButton
        hoverColor='[#003D5C]'
        activeColor='[#00293d]'
        offsetColor='[#00111a]'
        width={40}
        onClick={createBackup}
      >
        Create Backup
      </PrimaryButton>
    </Option>
  )
}
