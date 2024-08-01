import React, { ReactNode, useState } from 'react'
import BottomNavBar from './BottomNavBar'
import MobileMenuDrawer from './MobileMenuDrawer'

export default function Layout({children} : {children ?: ReactNode}) {

  const [menuOpen, setMenuOpen] = useState(false)



  return (
    <div className='min-w-[360px] overflow-x-hidden relative'>
     {menuOpen && <MobileMenuDrawer setMenuOpen={setMenuOpen}/>}
        {children}
        {/* <BottomNavBar/> */}
        
    </div>
  )
}
