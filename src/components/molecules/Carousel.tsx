import React, { useEffect, useRef, useState } from 'react'
import { BsChevronLeft, BsChevronRight } from 'react-icons/bs';

export default function Carousel({size, images, imageClass, controlsOn} : {controlsOn : boolean, imageClass : string, size : {w: number, h: number}, images : Array<{img: string, name: string}>}) {

  const carouselSize = {
    width: `${size.w ?? 800}px`,
    height: `${size.h ?? 480}px`
  }

  
    
      const containerRef = useRef<HTMLDivElement>(null!);
      const innerContainerRef = useRef<HTMLDivElement>(null!);
    
      const [pos, setPos] = useState(0);
      const [engaging, setEngaging] = useState(false);
    
      const [grabbed, setGrabbed] = useState(false);
    
      const [points, setPoints] = useState({ startX: 0, x: 0 });
      const [countMove, setCountMove] = useState(0);
    
      const slideShow = {
        transform: `translate3d(${pos}px, 0px, 0px)`,
        ...carouselSize
      };
    
      useEffect(() => {
        const slide = setInterval(() => {
          if (pos === (images.length-1)*size.w *-1) {
  
            setPos(0);
          } else {
            setPos(pos - size.w);
         
          }
        }, 3000);
    
        return () => clearInterval(slide);
      });
    
      const handleNextPrev = (direction: string) => {
        if (direction === "next") {
          setEngaging(true);
          if (pos === (images.length-1)*size.w *-1) {
            console.log("manual: ", pos - size.w);
            setPos(0);
          } else {
            console.log("automated: ", pos - size.w);
            setPos(pos - 800);
          }
        } else {
          setEngaging(true);
          if (pos === 0) {
            setPos((images.length-1)*size.w *-1);
          } else {
            setPos(pos + size.w);
          }
        }
      };
    
      useEffect(() => {
        let startX = 0;
        let x = 0;
    
        const move = (e: MouseEvent) => {
          if (!grabbed) return null;
          e.preventDefault();
          x = e.offsetX;
          setPos(x - startX);
          console.log(x);
        };
        const container = containerRef.current;
    
        const mousedown = (e: MouseEvent) => {
          startX = e.offsetX - innerContainerRef.current.offsetLeft;
          console.log(startX);
          setGrabbed(true);
        };
    
        const grabbOff = () => {
          setGrabbed(false);
        };
    
        container.addEventListener("mousedown", mousedown);
    
        container.addEventListener("mouseup", grabbOff);
        // container.addEventListener("mouseleave", () => {
        //   setGrabbed(false);
        // });
    
        container.addEventListener("mousemove", move);
        // containerRef.current.removeEventListener("mousemove", move)
    
        return () => {
          container.removeEventListener("mousemove", move);
          container.removeEventListener("mousedown", mousedown);
          container.removeEventListener("mouseup", grabbOff);
        };
      });
    
      const calcActivePos = (i : number) : number =>{
        const sizeA = size.w
        if(i === 0){
     
          return 0
        }else{
     
          return i * sizeA * -1
        }
    
    
    
      }


   
  return (
    <div>
    <div
      ref={containerRef}
      className=" lg:overflow-hidden overflow-scroll  mx-auto"
      style={carouselSize}
    >
      <div className="flex" ref={innerContainerRef}>
        {images.map((item, i) => {
          return (
            <div
              key={i}
              style={slideShow}
              className={` shrink-0 transition-all duration-700 ${
                grabbed ? "cursor-grabbing" : "cursor-pointer"
              }`}
            >
              <img alt="product image" className={`w-full h-full object-cover ${imageClass}`} src={item.img} />
              {/* <div
                style={{ backgroundColor: item.color }}
                className={`w-full h-full flex justify-center items-center text-white text-lg`}
              >
                <span>{i}</span>
              </div> */}
            </div>
          );
        })}
      </div>
    </div>

    <div className="flex gap-4 items-center justify-center my-2"> {images.map((item, i)=>{
        return <div key={i} className={`w-[10px] h-[10px] border-2 ${pos === calcActivePos(i)? "border-slate-300 bg-slate-600": " bg-slate-200"}  rounded-full`}>

        </div>
      })}
    </div>

 {controlsOn && <div className="flex justify-between">
  <button
      onMouseLeave={() => setEngaging(false)}
      onClick={() => handleNextPrev("prev")}
    >
      <BsChevronLeft/>
    </button>
    <button
      onMouseLeave={() => setEngaging(false)}
      onClick={() => handleNextPrev("next")}
    >
      <BsChevronRight/>
    </button>
  </div>}
  </div>
  )
}
