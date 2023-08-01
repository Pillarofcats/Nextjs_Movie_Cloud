'use client'

//React
import React from 'react'
//Nextjs
import { redirect } from 'next/navigation'
//NextAuth
import { useSession } from "next-auth/react"
//Components
import Navbar from '@/components/Navbar'
import HomePage from '@/components/HomePage'

const App = () => {

  //NextAuth local session - redirect if no session
  const { data: uSession, status } = useSession({
    required: true,
    onUnauthenticated() {
      redirect('/login')
    },
  })

  if(status === 'loading') return null

  return (
    <> 
      <Navbar />
      <HomePage />
    </>
  )
}

export default React.memo(App)