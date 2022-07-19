import PrimaryButton from "../../../components/buttons/PrimaryButton"
import Option from "../../../components/Option"

export default function LoadBackup() {
    const loadBackup = async () => {
        // Load the backup.
        await window.database.loadBackup()
    }

    return (
        <Option label="Load Database Backup:">
            <PrimaryButton hoverColor="green-500"
                           activeColor="green-600"
                           width={40}
                           onClick={loadBackup}
            >
                Load Backup
            </PrimaryButton>
        </Option>
    )
}