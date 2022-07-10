// Sketching
import {images} from "../../App"
import {useState} from "react"

export function Generator() {
    return (
        <div className="ml-6 mt-6 flex flex-col text-white">
            <GeneratorHeader/>
            <PasswordGenerator/>
            <div className="mt-8 pl-4 pb-4 bg-dark-blue-2 w-[32rem] shadow-md">
                <GeneratorParameters/>
            </div>
        </div>
    )
}

function GeneratorHeader() {
    return (
        <div className="mb-8 no-select">
            <h1 tabIndex="-1"
                className="text-3xl font-semibold pb-2 flex items-center">
                <img src={images.generatorIcon}
                     alt="Generator icon"
                     className="mr-1"/>
                Generator
            </h1>
            <div className="shadow-md ml-[-1.5rem] h-4"></div>
        </div>
    )
}

function PasswordGenerator() {
    return (
        <div className="flex space-x-4">
            <div>
                <input readOnly
                       type="text"
                       value="Placeholder"
                       onClick={(event) => {
                           // Copy to clipboard.
                           navigator.clipboard.writeText(event.target.value).then()
                       }}
                       className="text-black pl-2 w-[32rem] py-1.5 text-lg focus:outline-gray-200"/>
            </div>
            <div>
                <button className="bg-dark-blue-1 px-8 py-2 shadow-md hover:bg-blue-1 transition active:bg-blue-2
                focus:outline-gray-200">
                    Generate
                </button>
            </div>
        </div>
    )
}

function GeneratorParameters() {
    const [length, setLength] = useState("4")

    return (
        <div>
            <div className="my-4 pr-4">
                <p className="text-sm no-select">
                    Length ({length})
                </p>
                <input type="range"
                       min="4"
                       max="48"
                       value={length}
                       onChange={(e) => {
                           setLength(e.target.value)
                       }}
                       className="custom-slider slider-progress w-full cursor-pointer focus:outline-gray-200"/>
            </div>
            <div className="flex flex-col space-y-4">
                <div className="space-x-2 flex items-center">
                    <input type="checkbox"
                           className="checkbox checkbox-sm checkbox-primary rounded-none border-2"/>
                    <span className="no-select">
                        Lowercase
                    </span>
                </div>
                <div className="space-x-2 flex items-center">
                    <input type="checkbox"
                           className="checkbox checkbox-sm checkbox-primary rounded-none border-2"/>
                    <span className="no-select">
                        Uppercase
                    </span>
                </div>
                <div className="space-x-2 flex items-center">
                    <input type="checkbox"
                           className="checkbox checkbox-sm checkbox-primary rounded-none border-2"/>
                    <span className="no-select">
                        Numbers
                    </span>
                </div>
                <div className="space-x-2 flex items-center">
                    <input type="checkbox"
                           className="checkbox checkbox-sm checkbox-primary rounded-none border-2"/>
                    <span className="no-select">
                        Symbols
                    </span>
                </div>
            </div>
        </div>
    )
}