import {usePasswordContext} from "../../context/generator/PasswordContext"

export default function PasswordGenerator() {
    // Context
    const password = usePasswordContext()

    const selectToClipboard = () => {
        // Copy to clipboard.
        navigator.clipboard.writeText(password).then()
        // Show the tooltip.
        const tooltip = document.getElementById("gen-pass-tooltip")
        tooltip.classList.add("tooltip", "tooltip-open")
        setTimeout(() => {
            tooltip.classList.remove("tooltip", "tooltip-open")
        }, 2000)
    }

    return (
        <div className="flex space-x-2 items-center">
            <div data-tip="Copied!"
                 id="gen-pass-tooltip"
                 className="tooltip-bg">
                <input readOnly
                       type="text"
                       value={password}
                       onClick={selectToClipboard}
                       onKeyDown={(event) => {
                           if (event.key === "Enter") {
                               selectToClipboard()
                           }
                       }}
                       className="text-black pl-2 w-[36rem] xl:w-[48rem] py-1.5 text-lg focus:outline-none focus:ring
                       focus:ring-blue-1 transition"/>
            </div>
        </div>
    )
}
