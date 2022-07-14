import React from "react"
import {useState} from "react"
import CollapsibleTitle from "./CollapsibleTitle"

export default function Collapsible(props) {
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
                >
                    {props.title}
                </CollapsibleTitle>
            </div>
            <div className={showContent ? "content show" : "content"}>
                {props.children}
            </div>
        </>
    )
}