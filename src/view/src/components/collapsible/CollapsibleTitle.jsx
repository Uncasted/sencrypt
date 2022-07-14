export default function CollapsibleTitle(props) {
    return (
        <div tabIndex={props.tabIndex || -1}
             onKeyDown={(event) => {
                 if (event.key === "Enter") {
                     props.toggleCollapsible()
                 }
             }}
             className="flex py-0 px-0 items-center shadow-md pb-1 focus:outline-gray-200"
        >
            {props.children}
        </div>
    )
}