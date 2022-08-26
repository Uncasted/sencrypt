import AccountsProvider from '../../context/accounts/AccountsContext'
import { Accounts } from './Accounts'
import { useSidebarContext } from '../../context/SidebarContext'

export default function AccountSection () {
  // Context
  const { margin } = useSidebarContext()

  return (
    <div className={`${margin} transition-all duration-[250ms] ease-[cubic-bezier(0.25,0.1,0.25,1)] z-0`}>
      <AccountsProvider>
        <Accounts />
      </AccountsProvider>
    </div>
  )
}
