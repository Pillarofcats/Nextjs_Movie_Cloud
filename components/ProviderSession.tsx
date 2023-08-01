'use client'

//NextAuth
import { SessionProvider } from 'next-auth/react'
//Interfaces
import iChildren from '@/interface/children'

const ProviderSession = ({children}:iChildren) => {

  return (
    <SessionProvider>{ children }</SessionProvider>
  )
}

export default ProviderSession