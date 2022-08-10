import PrimaryButton from '../../../components/buttons/PrimaryButton'
import Option from '../../../components/Option'
import { useNotificationContextUpdate } from '../../../context/NotificationContext'
import { IMAGES } from '../../../data/constants'

export default function CreateBackup () {
  // Context
  const { handleTitle, handleIcon, handleShow } = useNotificationContextUpdate()

  const createBackup = async () => {
    // Create a backup of the database.
    const isCreated = await window.database.createBackup()
    // Show the notification
    if (isCreated) {
      handleTitle('Backup Created')
      handleIcon(IMAGES.SUCCESS_ICON)
    } else {
      handleTitle('Invalid Backup Path')
      handleIcon(IMAGES.CLOSE_ICON)
    }
    handleShow()
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
