import PrimaryButton from '../../../components/buttons/PrimaryButton'
import Option from '../../../components/Option'
import { useNotificationContextUpdate } from '../../../context/NotificationContext'
import { IMAGES } from '../../../data/constants'

export default function LoadBackup () {
  // Context
  const { handleTitle, handleIcon, handleShow } = useNotificationContextUpdate()

  const loadBackup = async () => {
    // Load the backup.
    const isLoaded = await window.database.loadBackup()
    // Show the notification
    if (isLoaded) {
      handleTitle('Backup Loaded')
      handleIcon(IMAGES.SUCCESS_ICON)
    } else {
      handleTitle('Invalid Backup')
      handleIcon(IMAGES.CLOSE_ICON)
    }
    handleShow()
  }

  return (
    <Option label='Load Database Backup'>
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
