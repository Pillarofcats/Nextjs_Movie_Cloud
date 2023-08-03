//React
import React from 'react'
//Interface
import iInput from '@/interface/input'

export default function Input({
  id, 
  onChange, 
  value,
  label,
  type
}: iInput) {

  return (
    <div className='relative z-10 w-full'>
      
      <input
        aria-required
        required
        onChange={onChange}
        type={type}
        value={value}
        placeholder=" "
        id={id}
        className="
          block
          rounded-md
          px-4
          py-6
          pb-1
          w-full
          text-md
          text-[#9fd7ff]
          bg-neutral-700
          appearance-none
          focus:outline-none
          focus:ring-2
          peer"
      />

        <label htmlFor={id} 
          className="
            absolute
            text-md 
            text-white
            duration-150
            transform
            -translate-y-3
            scale-75
            top-1/4
            origin-[0]
            left-3
            peer-placeholder-shown:scale-100
            peer-placeholder-shown:translate-y-0
            peer-focus:scale-75
            peer-focus:-translate-y-3"
        >{label}</label>
    </div>
  )
}