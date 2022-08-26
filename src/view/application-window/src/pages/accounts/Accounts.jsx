import { AddAccountModal } from './modal/AddAccountModal'
import { Account } from './Account'
import IndexProvider from '../../context/accounts/IndexContext'
import { useAccountsContext } from '../../context/accounts/AccountsContext'
import EmptyPlaceholder from '../../components/EmptyPlaceholder'
import { AddAccountButton } from './buttons/AddAccountButton'
import SectionHeader from '../../components/headers/SectionHeader'
import { IMAGES } from '../../data/constants'
import { useSpring, animated, easings } from 'react-spring'
import { useAnimationStateContext } from '../../context/AnimationStateContext'
import { useState } from 'react'

export function Accounts () {
  // Context
  const accounts = useAccountsContext()
  const animations = useAnimationStateContext()

  // State
  const [isMounted, setIsMounted] = useState(false)

  // Animation.
  const sectionAnimation = useSpring({
    from: { opacity: 0, left: '50px' },
    to: { opacity: 1, left: '0' },
    cancel: animations.appSection,
    onRest: () => {
      // When the animation finished, it's mounted.
      setIsMounted(isMounted => !isMounted)
    },
    config: {
      duration: 400,
      easing: easings.easeInOutQuad
    }
  })

  return (
    <>
      <SectionHeader icon={IMAGES.MANAGER_ICON}>
        Accounts
      </SectionHeader>
      <animated.div style={sectionAnimation} className='pt-36 relative'>
        {accounts.length > 0 &&
          <AddAccountButton />}
        <AddAccountModal />
        <div id='account-list' className='mt-10 space-y-1 mx-2'>
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
        <EmptyPlaceholder
          accsLength={accounts.length}
          isMounted={isMounted}
        />
      </animated.div>
    </>
  )
}
