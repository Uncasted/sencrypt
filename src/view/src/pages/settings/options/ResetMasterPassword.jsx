import PrimaryButton from "../../../components/buttons/PrimaryButton"
import Option from "../../../components/Option"

export default function ResetMasterPassword() {
    return (
        <Option label="Reset Master Password:">
            <PrimaryButton hoverColor="red-500"
                           activeColor="red-600"
                           width={40}
            >
                Reset Password
            </PrimaryButton>
        </Option>
    )
}