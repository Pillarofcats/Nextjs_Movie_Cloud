//React
import React, { useState, useCallback } from 'react'
//ReactIcons
import { GoTriangleDown } from 'react-icons/go'
//Comoponents
import Title from '@/components/Title'
import NavLinkItem from '@/components/NavLinkItem'
import AccountMenu from '@/components/AccountMenu'
import Search from '@/components/Search'

export default function NavLinks() {
  //Hooks
  const [visibleAccountMenu, setVisibleAccountMenu] = useState<boolean>(false)

  const toggleAccountMenu = useCallback(() => {
    setVisibleAccountMenu(current => !current)
  }, [])

  return (
    <div className="flex flex-row text-white font-medium text-lg justify-between h-14 px-2">

      <div className="flex flex-row justify-center self-center gap-5 mr-5">
        <Title />
        <NavLinkItem label="Home" />
        <NavLinkItem label="Latest"/>
        <NavLinkItem label="Favorites"/>
      </div>

      <div className='flex gap-5'>
        <div className="self-center w-52">
          <Search />
        </div>

        <div onClick={ toggleAccountMenu } className='select-none flex flex-row items-center gap-2 cursor-pointer relative'>
          <div className='w-6 h-6 rounded-md overflow-hidden'>
            <img src="/images/default.jpg" alt="Default user image"/> 
          </div>
          <GoTriangleDown className={ `transition duration-200 ${visibleAccountMenu ? 'rotate-180' : 'rotate-0'}` }/>
          <AccountMenu visible={ visibleAccountMenu } />
        </div>
      </div>

    </div>
  )
}