import { useState } from 'react'
import { IMAGES } from '../../data/constants'
import DropdownButton from './DropdownButton'

export default function Dropdown (props) {
  const [open, setOpen] = useState('dropdown')

  const handleOpen = () => {
    console.log('This function gets called.')
    const dropdown = document.getElementById('dropdown-icon')
    dropdown.animate([{
      transform: open === 'dropdown' ? 'rotate(180deg)' : 'rotate(0deg)'
    }], {
      duration: 250,
      easing: 'ease-in-out',
      fill: 'forwards'
    })
    setOpen(prevOpen => prevOpen === 'dropdown' ? 'dropdown show' : 'dropdown')
  }

  return (
    <div
      onClick={handleOpen}
      onBlur={() => {
        // We need to do this, otherwise the buttons will cause the dropdown menu to never close.
        const dropdown = document.getElementById('dropdown-icon')
        dropdown.animate([{
          transform: 'rotate(0deg)'
        }], {
          duration: 250,
          easing: 'ease-in-out',
          fill: 'forwards'
        })
        setOpen('dropdown')
      }}
      tabIndex={0}
      className='w-[125px] h-[25px] bg-[#00293d] rounded-sm flex justify-between items-center relative text-white
    shadow-sm text-sm mr-4 cursor-pointer'
    >
      <h1 className='ml-2 no-select'>Minimized</h1>
      <img
        id='dropdown-icon'
        src={IMAGES.OPEN_DROPDOWN}
        alt='open dropdown'
        className='w-3 h-3 mr-2 no-select'
      />
      <div
        className={`${open} absolute w-full py-1 px-2 space-y-1 bg-[#00293d] rounded-sm mt-24 flex flex-col 
        items-center pointer-events-none`}
      >
        {props.list.map(option => (
          <DropdownButton
            key={option.key}
            bgColor={option.bgColor}
            hoverColor={option.hoverColor}
          >
            {option.title}
          </DropdownButton>
        ))}
      </div>
    </div>
  )
}
