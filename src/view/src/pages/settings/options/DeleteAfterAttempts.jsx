import Checkbox from "../../../components/Checkbox"
import InputNumberBox from "../../../components/InputNumberBox"
import Option from "../../../components/Option"

export default function DeleteAfterAttempts() {
    return (
        <Option label="Delete Accounts After Failing To Log In (tries):">
            <div className="flex space-x-4">
                <Checkbox/>
                <div className="bg-dark-blue-2">
                    <InputNumberBox min={1}
                                    max={99}
                                    value={10}
                    />
                </div>
            </div>
        </Option>
    )
}