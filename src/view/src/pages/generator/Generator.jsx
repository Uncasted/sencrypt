import ParameterProvider from "../../context/generator/ParameterContext"
import PasswordProvider from "../../context/generator/PasswordContext"
import GeneratorHeader from "../../components/headers/GeneratorHeader"
import PasswordGenerator from "../../components/generator/PasswordGenerator"
import GeneratorParameters from "../../components/generator/GeneratorParameters"

export function Generator() {
    return (
        <>
            <div className="pl-6 pt-6 bg-dark-blue-2 text-white">
                <GeneratorHeader/>
            </div>
            <div className="ml-6 mt-6 flex flex-col text-white justify-center h-[60vh]">
                <div className="mt-6 mx-auto">
                    <ParameterProvider>
                        <PasswordProvider>
                            <PasswordGenerator/>
                            <div className="relative mt-8 px-6 py-6 bg-dark-blue-0 w-[36rem] xl:w-[48rem] xl:py-12
                            shadow-md">
                                <GeneratorParameters/>
                            </div>
                        </PasswordProvider>
                    </ParameterProvider>
                </div>
            </div>
        </>
    )
}




