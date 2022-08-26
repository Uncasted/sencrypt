import { useIndexContext } from '../../context/accounts/IndexContext'
import { useAccountsContext } from '../../context/accounts/AccountsContext'
import PropTypes from 'prop-types'

export default function AccountTitle (props) {
  // Context
  const index = useIndexContext()
  const account = useAccountsContext()[index]

  return (
    <>
      <div className='ml-2 w-12 h-full flex items-center justify-center my-2'>
        {/* Get a different icon depending on the website. */}
        <img
          src={`https://icon.horse/icon/${account.website}`}
          alt='Account icon'
          className='w-7 h-7 no-select rounded-sm'
        />
      </div>
      <div className='ml-2'>
        <h1 className='text-md'>{account.website}</h1>
        <h2 className='text-xs text-[#006599]'>{account.username}</h2>
      </div>
      <div className='absolute right-6'>
        <span>{props.isOpen ? '-' : '+'}</span>
      </div>
    </>
  )
}

AccountTitle.propTypes = {
  isOpen: PropTypes.bool
}
