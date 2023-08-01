//"use client"

//ReactAuth
import { signOut } from 'next-auth/react'
//React
import React from 'react'
//Interface
import iAccountMenu from '@/interface/accountmenu'
//Hooks
import useCurrentUser from '@/hooks/useCurrentUser'
//Nextjs
import Link from 'next/link'

export default function AccountMenu({visible}:iAccountMenu) {
  //Hooks
  const { data: user } = useCurrentUser()

  return (
    <>
      { visible ? 
        (<div className='bg-gray-800 bg-opacity-80 w-48 absolute top-14 -right-1 flex-col flex'>
          <div className='flex flex-col gap-3 py-3 text-sm border'>

            <Link href='/profiles' className='group/item flex flex-row gap-3 w-full justify-center items-center'>
              <img className='rounded-md w-7' src="images/default.jpg" alt="" />
              <p className='text-white group-hover/item:underline'>
                { user?.name }
              </p>
            </Link>

            <div onClick={ () => signOut({ redirect: true, callbackUrl: '/login' }) } className='text-center text-white hover:underline py-1'>
              Sign Out
            </div>

          </div>
        </div>) : <></>
      }
    </>
  )
}

