'use client'

//Components
import Input from '@/components/Input'
import ServerResponse from '@/components/ServerResponse'
//Axios
import axios from 'axios'
//React
import React, { useState, useCallback } from 'react'
//NextAuth
import { signIn } from 'next-auth/react'
//Types
type tVariant = 'login' | 'register'
//ReactIcons
import { FcGoogle } from 'react-icons/fc'
import { FaGithub } from 'react-icons/fa'
//Nextjs
import { useRouter } from 'next/navigation'

//Page
export default function LoginPage() {

  //Hooks
  const [name, setName] = useState<string>("")
  const [email, setEmail] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [variant, setVariant] = useState<tVariant>("login")
  const [serverMessage, setServerMessage] = useState<string>("Null")
  const [isSMVisible, setIsSMVisible] = useState<boolean>(false)

  const router = useRouter()

  const submit = (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSMVisible(false)
    setServerMessage("Null")

    variant === 'login' ? login() : register()
  }

  const login = useCallback( async () => {
    
    try {

      await signIn('credentials', {
        redirect:false,
        email,
        password
      }).then((res) => {

        if(res?.error) {
          router.push('/login')
          setServerMessage(res.error)
          setIsSMVisible(true)
          
        } else {
          router.push('/profiles')
        }

      }).catch((error) => {
        console.error(error)
      })

    } catch(error) {
      console.log(error)
    }
  }, [email, password])

  const register = useCallback(async () => {

    try {

      await axios.post('/api/register', {
        email,
        name,
        password,
      }).then((res) => {
        
        if(res.data?.error) {
          setServerMessage('Email already exists')
          setIsSMVisible(true)
        } else {
          login()
        }

      }).catch((error) =>
        console.error(error)
      )

    } catch (error) {
      console.log(error)
    }
  }, [email, name, password, login])

  const toggleVariant = useCallback(() => 
    setVariant((currentVariant) => currentVariant === 'login' ? 'register' : 'login')
  , [])

  return (
    <div className="h-screen flex flex-col items-center justify-center">
      <div className="bg-opacity-50 p-10 mt-2 max-w-sm rounded-md w-full flex flex-col justify-self-center items-center gap-4 bg-black">

        <h1 className="text-4xl text-white font-extrabold">{variant === 'login' ? 'Login' : 'Register'}</h1>

        <form onSubmit={(e) => submit(e) } className="flex flex-col gap-2">

          { variant === 'register' ?
              <Input 
                label="Username"
                onChange={(ev:React.ChangeEvent<HTMLInputElement>) => setName(ev.target.value)}
                id="name"
                type="text"
                value={name}
              />
              : null
          }

          <Input 
            label="Email"
            onChange={(ev:React.ChangeEvent<HTMLInputElement>) => setEmail(ev.target.value)}
            id="email"
            type="email"
            value={email}
          />

          <Input 
            label="Password"
            onChange={(ev:React.ChangeEvent<HTMLInputElement>) => setPassword(ev.target.value)}
            id="password"
            type="password"
            value={password}
          />

          <ServerResponse message={ serverMessage} isVisible={ isSMVisible} />

          <button 
            type="submit"
            className="py-3 bg-blue-400 text-white rounded-md w-full mt-1 hover:bg-blue-500 transition">
              Submit
          </button>
        </form>

        <div className="flex flex-row items-center gap-4 mt-2 justify-center">
          <div
            onClick={ () => signIn('google', { callbackUrl: '/profiles' }) }
            className="
              w-10
              h-10
              bg-white
              rounded-full
              flex
              items-center
              justify-center
              cursor-pointer
              hover:opacity-80
              transition"
          >
            <FcGoogle size={30} />
          </div>

          <div
            onClick={ () => signIn('github', { callbackUrl: '/profiles' }) }
            className="
              w-10
              h-10
              bg-white
              rounded-full
              flex
              items-center
              justify-center
              cursor-pointer
              hover:opacity-80
              transition"
          >
            <FaGithub size={30} />
          </div>
        </div>

        <div className="text-center">
          <p className=" text-white">
            { variant === "register" ? 'Already have an account?' : 'First time using Movie Cloud?' }
          </p>
          <p onClick={toggleVariant} className="text-[#9fd7ff] ml-1 hover:underline cursor-pointer">
            { variant === "register" ? "Login" : "Register" }
          </p>
        </div>

      </div>
    </div>
  )
}