import GeneratedPassword from '../../components/GeneratedPassword'
import { usePasswordListContext, usePasswordListContextUpdate } from '../../context/generator/PasswordListContext'
import { IMAGES } from '../../data/constants'
import { useNotificationContextUpdate } from '../../context/NotificationContext'

export default function GeneratorHistory () {
  // Context
  const passwords = usePasswordListContext()
  const { clearHistory } = usePasswordListContextUpdate()
  const { handleTitle, handleIcon, handleShow } = useNotificationContextUpdate()

  const handleClear = () => {
    // Clear the history.
    clearHistory()
    // Show a notification to the user.
    handleTitle('Cleared History')
    handleIcon(IMAGES.SUCCESS_ICON)
    handleShow()
  }

  return (
    <div
      className="bg-[#00293d] flex flex-col items-center text-white w-full h-[300px] rounded-sm my-12 relative"
    >
      <div className="absolute right-4 top-4">
        <button onClick={handleClear}
                tabIndex={18}
                className="focus:outline-none focus:ring focus:ring-[#003D5C] transition rounded-sm"
        >
          <img
            src={IMAGES.CLEAR_ICON}
            alt="Clear History"
            className="w-7 h-7"
          />
        </button>
      </div>
      <div>
        <h1 className="mt-4 text-lg">
          Generator History
        </h1>
      </div>
      <div className="w-full mt-6 border-[#003a57] rounded-sm overflow-y-scroll overflow-x-hidden
      generator-scrollbar px-2 pb-4"
      >
        {passwords.map((password, index) =>
          <GeneratedPassword
            key={index}
            index={index}
            value={password}
            clipboardTooltip="Copy to clipboard"
            tooltipDirection="left"
            tabIndex={20 + index}
            toggleIndex={21 + index}
            clipboardIndex={21 + index}
          />
        )}
      </div>
    </div>
  )
}
