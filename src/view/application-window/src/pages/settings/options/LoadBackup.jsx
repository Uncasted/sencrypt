import PrimaryButton from '../../../components/buttons/PrimaryButton'
import Option from '../../../components/Option'

export default function LoadBackup () {
  const loadBackup = async () => {
    // Load the backup.
    await window.database.loadBackup()
  }

  return (
    <Option label='Load Database Backup:'>
      <PrimaryButton
        hoverColor='[#003D5C]'
        activeColor='[#00293d]'
        offsetColor='[#00111a]'
        width={40}
        onClick={loadBackup}
      >
        Load Backup
      </PrimaryButton>
    </Option>
  )
}
