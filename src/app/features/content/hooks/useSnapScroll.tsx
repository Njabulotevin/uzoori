import React, { useEffect, useRef } from 'react'

export default function useSnapScroll() {
    const containerRef = useRef<HTMLDivElement>(null);
    const itemWidth = useRef<number>(0);
    const touchStartX = useRef<number>(0);
    const touchEndX = useRef<number>(0);
    const scrollAmount = useRef<number>(0);
    const threshold = 10; // Change this to adjust the swipe threshold
    useEffect(() => {
        const container = containerRef.current;
        const items = container?.children;
    
        // Get the width of each item
        itemWidth.current = items?.[0]?.clientWidth || 0;
    
        const handleTouchStart = (e: TouchEvent) => {
          // Reset the scroll amount
          scrollAmount.current = 0;
          touchStartX.current = e.touches[0].clientX;
        };
    
        const handleTouchMove = (e: TouchEvent) => {
          const touchMoveX = e.touches[0].clientX;
          const swipeDistance = touchMoveX - touchStartX.current;
    
          // Calculate the scroll amount based on the swipe distance
          scrollAmount.current = Math.abs(swipeDistance) > threshold ? Math.sign(swipeDistance) * itemWidth.current : 0;

          console.log(swipeDistance);
        };
    
        const handleTouchEnd = () => {
          // Scroll the container by one item's width
          container?.scrollBy({ left: scrollAmount.current, behavior: 'smooth' });
        };
    
        container?.addEventListener('touchstart', handleTouchStart);
        container?.addEventListener('touchmove', handleTouchMove);
        container?.addEventListener('touchend', handleTouchEnd);
    
        return () => {
          container?.removeEventListener('touchstart', handleTouchStart);
          container?.removeEventListener('touchmove', handleTouchMove);
          container?.removeEventListener('touchend', handleTouchEnd);
        };
    }, []);

    return {containerRef};
    
}
