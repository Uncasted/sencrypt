// Sketching

export function Generator() {
    return (
        <div className="ml-4 mt-4 flex flex-col text-white">
            <GeneratorHeader/>
            <PasswordGenerator/>
            <GeneratorParameters/>
        </div>
    )
}

function GeneratorHeader() {
    return (
        <div className="mb-10">
            <h1 className="text-3xl font-semibold">
                Password Generator
            </h1>
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
                       className="text-black pl-2 w-72 py-2"/>
            </div>
            <div>
                <button className="bg-dark-blue-1 px-4 py-2">
                    Generate
                </button>
            </div>
        </div>
    )
}

function GeneratorParameters() {
    return (
        <div>
            <div className="w-72 my-4">
                <input type="range"
                       min="0"
                       max="48"
                       defaultValue="0"/>
            </div>
            <div className="flex flex-col space-y-4">
                <div className="space-x-2 flex items-center">
                    <input type="checkbox"/>
                    <span>Lowercase Letters</span>
                </div>
                <div className="space-x-2 flex items-center">
                    <input type="checkbox"/>
                    <span>Uppercase Letters</span>
                </div>
                <div className="space-x-2 flex items-center">
                    <input type="checkbox"/>
                    <span>Numbers</span>
                </div>
                <div className="space-x-2 flex items-center">
                    <input type="checkbox"/>
                    <span>Special Symbols</span>
                </div>
            </div>
        </div>
    )
}