import { useState } from 'react'
import { IMAGES } from '../../data/constants'
import DropdownButton from './DropdownButton'
import PropTypes from 'prop-types'

export default function Dropdown (props) {
  const [open, setOpen] = useState('dropdown')

  const handleOpen = () => {
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
    <button
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
      disabled={props.disabled}
      className='w-[125px] h-[25px] bg-[#00293d] rounded-sm flex justify-between items-center relative text-white
    shadow-sm text-sm mr-4 cursor-pointer disabled:bg-[#001824] disabled:cursor-not-allowed'
    >
      <h1 className='ml-2 no-select'>{props.selected}</h1>
      <img
        id='dropdown-icon'
        src={IMAGES.OPEN_DROPDOWN}
        alt='open dropdown'
        className='w-3 h-3 mr-2 no-select'
      />
      <div
        className={`${open} absolute w-full py-1 px-2 space-y-1 bg-[#00293d] rounded-sm mt-24 flex flex-col 
        items-center pointer-events-none transition`}
      >
        {props.options.map(option => (
          <DropdownButton
            key={option.key}
            index={option.key}
            id={option.id}
            bgColor={option.bgColor}
            hoverColor={option.hoverColor}
            onHandleSelected={props.handleSelected}
          >
            {option.title}
          </DropdownButton>
        ))}
      </div>
    </button>
  )
}

Dropdown.propTypes = {
  options: PropTypes.array,
  selected: PropTypes.string,
  handleSelected: PropTypes.func,
  handleMinimized: PropTypes.func,
  disabled: PropTypes.bool
}
