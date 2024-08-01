import React from 'react'
import { BsStarFill, BsStarHalf } from 'react-icons/bs';

export default function ReviewRating({rating, textOn} : {rating : number, textOn : boolean}) {

  const getStars  = (rating : number) : number[] => {

    let arr = [];
  
      const convertedRating : number = Math.floor(rating);
      for(let i = 0; i < convertedRating; i++){
            arr.push(1);
      }
      if(rating % convertedRating === 0){
        return arr 
      }else{
        const lastNum = rating % convertedRating;
        arr.push(0.5);
        return arr
      }
      
  }

  return (
    <div className='flex gap-2 items-center'>
       <div className="flex gap-1"> {getStars(rating).map((item, i)=>{
          if(item === 1){
            return <BsStarFill key={i} size={10} className='text-violet-600'/>
          }else{
            return <BsStarHalf key={i} size={10} className='text-violet-600'/>
          }
          })}</div>
        {textOn && <h4 className='text-p4 text-neutral-400'>{rating} (67 reviews)</h4>}
    </div>
  )
}
