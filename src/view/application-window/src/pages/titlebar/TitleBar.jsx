import ToggleSideBarButton from '../../components/buttons/ToggleSideBarButton'
import MinimizeButton from '../../components/buttons/MinimizeButton'
import MaximizeButton from '../../components/buttons/MaximizeButton'
import CloseButton from '../../components/buttons/CloseButton'

export default function TitleBar () {
  return (
    <div className='bg-[#000E14] h-[40px] w-full flex justify-between titlebar z-[70]'>
      <div className='flex pl-4 items-center no-drag'>
        <ToggleSideBarButton />
      </div>
      <div className='flex no-drag'>
        <MinimizeButton />
        <MaximizeButton />
        <CloseButton />
      </div>
    </div>
  )
}
