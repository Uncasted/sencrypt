export default function Slider(props) {
    return (
        <>
            {props.title &&
                <span className="text-sm no-select">
                    {props.title}
                </span>
            }
            {props.enableInput &&
                <input type="number"
                       min={props.min || null}
                       max={props.max || null}
                       value={props.defaultLength || null}
                       onChange={props.inputOnChange || null}
                       onKeyDown={props.inputOnKeyDown || null}
                       className="bg-dark-blue-4 ml-2 w-10 text-center rounded-sm focus:outline-gray-200"
                />
            }
            <input type="range"
                   min={props.min || null}
                   max={props.max || null}
                   value={props.defaultLength || null}
                   onChange={props.onChange || null}
                   className="custom-slider slider-progress w-full cursor-pointer focus:outline-gray-200"
            />
        </>
    )
}