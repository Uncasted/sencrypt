import PrimaryButton from "../../../components/buttons/PrimaryButton"
import Option from "../../../components/Option"

export default function LoadBackup() {
    return (
        <Option label="Load Backup:">
            <PrimaryButton hoverColor="green-500"
                           activeColor="green-600"
                           width={40}
            >
                Load Backup
            </PrimaryButton>
        </Option>
    )
}