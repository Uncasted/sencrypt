import Checkbox from "../../../components/Checkbox"
import InputNumberBox from "../../../components/InputNumberBox"
import Option from "../../../components/Option"

export default function AskForReLogin() {
    return (
        <Option label="Require Login After Some Time (mins):">
            <div className="flex space-x-4">
                <Checkbox/>
                <div className="bg-dark-blue-2">
                    <InputNumberBox min={1}
                                    max={60}
                                    value="30"
                    />
                </div>
            </div>
        </Option>
    )
}