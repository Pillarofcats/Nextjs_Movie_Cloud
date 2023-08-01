"use client"

//React
import React, {useState, useCallback} from 'react'
//Components
import MobNavMenu from '@/components/MobNavMenu'
import Title from '@/components/Title'
//ReactIcons
import { GoTriangleDown } from 'react-icons/go'


export default function MobNavLinks() {
  //Hooks
  const [visibleMobileMenu, setVisibleMobileMenu] = useState<boolean>(false)

  const toggleMobileMenu = useCallback(() => {
    setVisibleMobileMenu(current => !current)
  }, [])

  return (
    <div className='flex align-middle justify-between items-center h-14 px-2'>

      <Title />

      <div className='top-0'>
        <div onClick={ toggleMobileMenu } className='text-white select-none flex flex-row items-center gap-2 cursor-pointer relative'>
          <p className='self-center cursor-pointer hover:underline transition'>Menu</p>
          <GoTriangleDown className={ `transition duration-200 ${visibleMobileMenu ? 'rotate-180' : 'rotate-0'}` }/>
        
      </div>
        <MobNavMenu visible={ visibleMobileMenu }/>
      </div>
    
    </div>
  )
}