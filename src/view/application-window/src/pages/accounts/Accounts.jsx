import { AddAccountModal } from './modal/AddAccountModal'
import { Account } from './Account'
import IndexProvider from '../../context/accounts/IndexContext'
import { useAccountsContext } from '../../context/accounts/AccountsContext'
import EmptyPlaceholder from '../../components/EmptyPlaceholder'
import { AddAccountButton } from './buttons/AddAccountButton'
import SectionHeader from '../../components/headers/SectionHeader'
import { IMAGES } from '../../data/constants'

export function Accounts () {
  // Context
  const accounts = useAccountsContext()

  return (
    <>
      <div>
        <SectionHeader icon={IMAGES.MANAGER_ICON}>
          Accounts
        </SectionHeader>
      </div>
      <div className='pt-36'>
        {accounts.length > 0 && <AddAccountButton />}
        <AddAccountModal />
        <div id='account-list' className='mt-10 space-y-1 px-2 mx-2'>
          {!accounts.length && <EmptyPlaceholder />}
          {accounts.map((account, index) => {
            return (
              <IndexProvider
                index={index}
                key={`${account.username}-${account.website}`}
              >
                <Account account={account} />
              </IndexProvider>
            )
          })}
        </div>
      </div>
    </>
  )
}
