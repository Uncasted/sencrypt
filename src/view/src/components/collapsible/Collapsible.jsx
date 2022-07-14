import {useState} from "react"
import CollapsibleTitle from "./CollapsibleTitle"
import CollapsibleMenu from "./CollapsibleMenu"

export default function Collapsible() {
    // State.
    const [open, setOpen] = useState(false)
    const [showContent, setShowContent] = useState(false)

    const toggleCollapsible = () => {
        setOpen(!open)
        setShowContent(!showContent)
    }

    return (
        <>
            <div onClick={toggleCollapsible}
                 className="title cursor-pointer"
            >
                <CollapsibleTitle isOpen={open}
                                  toggleCollapsible={toggleCollapsible}
                />
            </div>
            <div className={showContent ? "content show" : "content"}>
                <CollapsibleMenu showContent={showContent}/>
            </div>
        </>
    )
}