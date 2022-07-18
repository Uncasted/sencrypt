import PrimaryButton from "../../../components/buttons/PrimaryButton"
import Option from "../../../components/Option"

export default function CreateBackup() {
    return (
        <Option label="Create Backup:">
            <PrimaryButton hoverColor="blue-1"
                           activeColor="blue-2"
                           width={40}

            >
                Create Backup
            </PrimaryButton>
        </Option>
    )
}

