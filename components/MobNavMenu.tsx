//Interface
import iMobileMenu from '@/interface/mobilemenu'
//ReactIcons
import NavLinkItem from './NavLinkItem'
//NextAuth
import { signOut } from 'next-auth/react'
//Hooks
import useCurrentUser from '@/hooks/useCurrentUser'
//Nextjs
import Link from 'next/link'
//Components
import Search from '@/components/Search'

export default function MobNavMenu ({visible}:iMobileMenu) {
  //Hooks
  const { data: user } = useCurrentUser()
  //Check
  if(!visible) return null

  return (
    <div className='bg-gray-800 bg-opacity-80 w-40 absolute top-10 right-1 flex-col flex border'>
      <div className='flex flex-col gap-4 py-3 text-sm'>

        <Link 
          href='/profiles'
          className='flex-1 group/item flex flex-row gap-3 w-full justify-center items-center'>
            <img className='rounded-md w-7' src="/images/default.jpg" alt="" />
            <p className='text-white group-hover/item:underline'>
              { user?.name }
            </p>
        </Link>
        
        <div 
          onClick={ () => signOut({ redirect: true, callbackUrl: 'nextjsmoviecloud-production.up.railway.app/login' }) } className='flex-1 text-center text-white cursor-pointer hover:underline py-1'>
          Sign Out
        </div>

        <hr className='bg-white border-1 '/>

        <NavLinkItem label="Home" />
        <NavLinkItem label="Latest" />
        <NavLinkItem label="Favorites" />

        <hr className='bg-white border-1 '/>

        <div className='text-white px-2'>
          <Search />
        </div>
        

      </div>
    </div>
  )
}