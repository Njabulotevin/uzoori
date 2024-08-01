import React from 'react'

export default function ProductImage({imageList}: {imageList: string[]}) {
  return (
    <div className='flex gap-4'>
      {imageList.map((image, i)=>{
        return <img className='w-[100px] h-[100px] object-cover' src={image} key={i} alt={`product image ${i}`}/>
      })}
    </div>
  )
}
