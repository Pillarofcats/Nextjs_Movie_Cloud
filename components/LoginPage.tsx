'use client'

//Components
import Input from '@/components/Input'
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

//Page
export default function LoginPage() {

  //Hooks
  const [name, setName] = useState<string>("")
  const [email, setEmail] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [variant, setVariant] = useState<tVariant>('login')

  const login = useCallback( async () => {
    
    try {
      await signIn('credentials', {
        email,
        password,
        callbackUrl: '/profiles'
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
      })

      login()

    } catch (error) {
      console.log(error)
    }
  }, [email, name, password, login])

  const toggleVariant = useCallback(() => 
    setVariant((currentVariant) => currentVariant === 'login' ? 'register' : 'login')
  , [])

  return (
    <div className="h-screen flex flex-col items-center justify-center">
      <div className="bg-opacity-50 p-10 mt-2 max-w-sm lg:max-w-md lg:w-2/5 rounded-md w-full flex flex-col justify-self-center items-center gap-4 bg-black">

        <h1 className="text-4xl text-white font-extrabold">{variant === 'login' ? 'Login' : 'Register'}</h1>

        { variant === 'register' ?
            <Input 
              label="Username"
              onChange={(ev:React.ChangeEvent<HTMLInputElement>) => setName(ev.target.value)}
              id="name"
              type="name"
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

        <button 
          onClick={variant === 'login' ? login : register}
          className="py-3 bg-blue-400 text-white rounded-md w-full mt-4 hover:bg-blue-500 transition">
            Submit
          </button>

          <div className="flex flex-row items-center gap-4 mt-8 justify-center">
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
          <p className="mt-4 text-white">
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