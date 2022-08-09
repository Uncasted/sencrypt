import GeneratedPassword from '../../components/GeneratedPassword'
import { usePasswordListContext } from '../../context/generator/PasswordListContext'

export default function GeneratorHistory () {
  // Context
  const passwords = usePasswordListContext()
  console.log(typeof passwords)
  console.log(passwords)

  return (
    <div
      className='bg-[#00293d] flex flex-col items-center text-white w-full h-[300px] rounded-sm my-12 px-4'
    >
      <div>
        <h1 className='mt-4 text-lg'>
          Generator History
        </h1>
      </div>
      <div className='w-full mt-6 border-t-4 border-[#003a57] rounded-sm overflow-scroll'>
        {passwords.map((password, index) =>
          <GeneratedPassword
            key={index}
            value={password}
            clipboardTooltip='Copy to clipboard.'
            tooltipDirection='right'
            tabIndex={30 + index}
            toggleIndex={31 + index}
            clipboardIndex={32 + index}
          />
        )}
      </div>
    </div>
  )
}
