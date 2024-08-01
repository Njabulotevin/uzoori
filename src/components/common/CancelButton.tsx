import React from 'react'
import { BsXLg } from 'react-icons/bs'

export default function CancelButton({onClick} : {onClick : React.MouseEventHandler}) {
  return (
    <div onClick={onClick} className='text-violet-600 w-[38px] h-[38px] bg-violet-50 p-3 rounded-full cursor-pointer'>
        <BsXLg/>
    </div>
  )
}
