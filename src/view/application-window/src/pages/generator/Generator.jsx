import ParameterProvider from '../../context/generator/ParameterContext'
import PasswordProvider from '../../context/generator/PasswordContext'
import PasswordGenerator from './PasswordGenerator'
import GeneratorParameters from './GeneratorParameters'
import SectionHeader from '../../components/headers/SectionHeader'
import GeneratorHistory from './GeneratorHistory'
import { IMAGES } from '../../data/constants'
import PasswordListProvider from '../../context/generator/PasswordListContext'

export function Generator () {
  return (
    <>
      <div>
        <SectionHeader icon={IMAGES.GENERATOR_ICON}>
          Generator
        </SectionHeader>
      </div>
      <div className='ml-6 pt-32 flex flex-col text-white justify-center h-full'>
        <div className='mt-6 mx-auto'>
          <PasswordListProvider>
            <ParameterProvider>
              <PasswordProvider>
                <PasswordGenerator />
                <div
                  className='relative mt-4 w-[36rem] xl:w-[48rem] shadow-md'
                >
                  <GeneratorParameters />
                  <GeneratorHistory />
                </div>
              </PasswordProvider>
            </ParameterProvider>
          </PasswordListProvider>
        </div>
      </div>
    </>
  )
}
