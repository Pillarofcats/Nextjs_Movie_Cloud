'use client'

//Interfaces
import iServerResponse from "@/interface/serverresponse"

export default function ServerResponse({ message, isVisible }:iServerResponse) {
  
  return (
    <div className={ `w-fit flex self-center px-2 text-center text-red-300 font-semibold ${ isVisible ? 'visible' : 'invisible' }` }>
      <p>{ message }</p>
    </div>
  )
}