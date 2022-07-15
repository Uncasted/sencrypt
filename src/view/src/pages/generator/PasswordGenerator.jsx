import {usePasswordContext} from "../../context/generator/PasswordContext"
import {SHOW_TOOLTIP} from "../../data/constants"
import {useRef} from "react"

export default function PasswordGenerator() {
    // Ref
    const tooltipRef = useRef(null)

    // Context
    const password = usePasswordContext()

    const selectToClipboard = () => {
        // Copy to clipboard.
        navigator.clipboard.writeText(password).then()
        // Show the tooltip.
        const tooltip = tooltipRef.current
        tooltip.classList.add(...SHOW_TOOLTIP)
        setTimeout(() => {
            tooltip.classList.remove(...SHOW_TOOLTIP)
        }, 2000)
    }

    return (
        <div className="flex space-x-2 items-center">
            <div data-tip="Copied!"
                 ref={tooltipRef}
                 className="tooltip-bg"
            >
                <input readOnly
                       type="text"
                       value={password}
                       onClick={selectToClipboard}
                       onKeyDown={(event) => {
                           if (event.key === "Enter") {
                               selectToClipboard()
                           }
                       }}
                       className="text-dark-blue-0 pl-2 w-[36rem] xl:w-[48rem] py-1.5 text-lg focus:outline-none
                       focus:ring focus:ring-blue-1 transition"
                />
            </div>
        </div>
    )
}
