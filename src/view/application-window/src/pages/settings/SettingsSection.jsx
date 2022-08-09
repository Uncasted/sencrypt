import Settings from './Settings'
import { useSidebarContext } from '../../context/SidebarContext'

export default function SettingsSection () {
  // Context
  const { margin } = useSidebarContext()

  return (
    <div className={`${margin} mt-10 transition-all duration-[250ms] ease-[cubic-bezier(0.25,0.1,0.25,1)] z-0`}>
      <Settings />
    </div>
  )
}
