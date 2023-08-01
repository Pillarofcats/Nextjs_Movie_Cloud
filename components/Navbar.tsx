// 'use client'

//Components
import NavLinks from '@/components/NavLinks'
import MobNavLinks from './MobNavLinks'
//React
import React, { useState, useEffect } from 'react'
//Constants
const TOP_OFFSET = 66 

const Navbar = () => {
  //Hooks
  const [showBackground, setShowBackground] = useState<boolean>(false)

  useEffect(() => {
    const handleScroll = () => {
      if(window.scrollY >= TOP_OFFSET) setShowBackground(true)
      else setShowBackground(false)
    }

    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [showBackground])

  return (
    <div className={ `z-20 flex flex-row justify-between h-14 sticky top-0 ${showBackground ? 'bg-gray-800 bg-opacity-100' : ''}` }>
      <div className="md:hidden w-full">
        <MobNavLinks />
      </div>
      <div className="max-md:hidden w-full">
        <NavLinks />
      </div>
    </div>
  )
}

export default React.memo(Navbar)