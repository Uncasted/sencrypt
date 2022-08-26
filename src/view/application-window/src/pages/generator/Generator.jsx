import ParameterProvider from '../../context/generator/ParameterContext'
import PasswordProvider from '../../context/generator/PasswordContext'
import PasswordGenerator from './PasswordGenerator'
import GeneratorParameters from './GeneratorParameters'
import SectionHeader from '../../components/headers/SectionHeader'
import GeneratorHistory from './GeneratorHistory'
import { IMAGES } from '../../data/constants'
import PasswordListProvider from '../../context/generator/PasswordListContext'
import { useSpring, animated, easings } from 'react-spring'

export function Generator () {
  // Animations
  const sectionAnimation = useSpring({
    from: { opacity: 0, left: '50px' },
    to: { opacity: 1, left: '0' },
    config: {
      duration: 400,
      easing: easings.easeInOutQuad
    }
  })

  return (
    <>
      <div>
        <SectionHeader icon={IMAGES.GENERATOR_ICON}>
          Generator
        </SectionHeader>
      </div>
      <animated.div
        style={sectionAnimation}
        className='ml-6 pt-32 flex flex-col text-white justify-center h-full relative'
      >
        <div className='mt-6 mx-auto'>
          <PasswordListProvider>
            <ParameterProvider>
              <PasswordProvider>
                <PasswordGenerator />
                <div
                  className='relative mt-4 w-[36rem] xl:w-[48rem]'
                >
                  <GeneratorParameters />
                  <GeneratorHistory />
                </div>
              </PasswordProvider>
            </ParameterProvider>
          </PasswordListProvider>
        </div>
      </animated.div>
    </>
  )
}
