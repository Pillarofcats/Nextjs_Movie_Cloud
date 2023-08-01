'use client'

//Nextjs
import { redirect } from 'next/navigation'
import Link from 'next/link'
//Next-Auth
import { useSession } from "next-auth/react"
//Hooks
import useCurrentUser from '@/hooks/useCurrentUser'
//Components
import Loading from '@/components/Loading'

const ProfilePage = () => {
  //Hooks
  const { data: user, isLoading } = useCurrentUser()

    //NextAuth local session - redirect if no session
  const { data: uSession, status } = useSession({
    required: true,
    onUnauthenticated() {
      redirect('/login')
    },
  })
  //Check
  if(isLoading) return (<Loading />)

  return (
    <div className="h-screen flex flex-col items-center justify-center">
      <div className="flex flex-col text-white gap-5">
        <h1 className="text-3xl md:text-6xl text-center">Who is watching</h1>
        <div className="flex items-center justify-center">
          <Link href='/'>
            <div className="py-8 px-14 bg-gray-700 bg-opacity-80 rounded-md pt-10">

              <div className='group flex flex-col gap-4'>
                <div className="
                  w-44
                  h-44
                  rounded-md
                  flex
                  item-center
                  justify-center
                  border-2
                  border-white
                  group-hover:cursor-pointer
                  group-hover:animate-wiggle
                  overflow-hidden
                ">
                  <img src="/images/default.jpg" alt="Default profile image" />
                </div>

                <div className="
                  text-2xl
                  text-center
                  group-hover:cursor-pointer
                ">{user?.name}
                </div>
              </div>

            </div>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default ProfilePage